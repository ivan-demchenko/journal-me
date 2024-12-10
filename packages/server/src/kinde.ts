import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { Config } from "./config";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(["jm-api", "mw", "auth"]);

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: Config.KINDE_ISSUER_URL,
    clientId: Config.KINDE_CLIENT_ID,
    clientSecret: Config.KINDE_CLIENT_SECRET,
    redirectURL: Config.KINDE_REDIRECT_URI,
    logoutRedirectURL: Config.KINDE_POST_LOGOUT_REDIRECT_URL,
  },
);

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    for (const key of ["id_token", "access_token", "user", "refresh_token"]) {
      deleteCookie(c, key);
    }
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  logger.info("check user");
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    if (!isAuthenticated) {
      logger.info("Unauthorized");
      return c.json({ error: "Unauthorized" }, 401);
    }
    const user = await kindeClient.getUserProfile(manager);
    c.set("user", user);
    logger.debug("got user {val}", { val: user.id });
    await next();
  } catch (e) {
    logger.debug("error {err}", { err: e });
    return c.json({ error: "Unauthorized" }, 401);
  }
});
