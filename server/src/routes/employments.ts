import { Hono } from "hono";
import {
  getUserEmployments,
  addUserEmployment,
  getEmploymentStories,
} from "../db/repository";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { getLogger } from "@logtape/logtape";
import { newEmploymentSchema } from "../db/types";

const logger = getLogger(["jm-api", "route", "employments"]);

export const employmentRoutes = new Hono()
  .get("/", getUser, async (c) => {
    logger.info("get employments {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const queryRes = await getUserEmployments(userId);
    if (queryRes.isOk()) {
      logger.debug("success {data}", { data: queryRes.value });
      return c.json({ employments: queryRes.value });
    }
    logger.error("failed to fetch data {err}", { err: queryRes.value });
    return c.json({ error: queryRes.value }, 500);
  })
  .get("/with-stories", getUser, async (c) => {
    logger.info("get employments {userId}", { userId: c.var.user.id });
    const dbRes = await getEmploymentStories(c.var.user.id);
    logger.debug("stories {res}", { res: dbRes });
    return c.json({ employments: dbRes });
  })
  .post("/new", getUser, zValidator("json", newEmploymentSchema), async (c) => {
    logger.info("new employment {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const input = c.req.valid("json");
    const result = await addUserEmployment(userId, input);
    return c.json(result);
  });
