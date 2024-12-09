import { Hono } from "hono";
import { getUserEmployments, addUserEmployment } from "../db";
import { newEmploymentSchema } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { getLogger } from "@logtape/logtape";

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
  .post("/new", getUser, zValidator("json", newEmploymentSchema), async (c) => {
    logger.info("new employment {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const input = c.req.valid("json");
    const result = await addUserEmployment(userId, input);
    return c.json(result);
  });
