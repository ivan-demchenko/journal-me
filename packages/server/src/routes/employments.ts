import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { getLogger } from "@logtape/logtape";
import { dataRepository } from "../db";
import { insertEmploymentSchema } from "@jm/db/src/types";

const logger = getLogger(["jm-api", "route", "employments"]);

export const newEmploymentSchema = insertEmploymentSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});

export const employmentRoutes = new Hono()
  .get("/", getUser, async (c) => {
    logger.info("get employments {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const queryRes = await dataRepository.getUserEmployments(userId);
    if (queryRes.isOk()) {
      logger.debug("success {data}", { data: queryRes.value });
      return c.json({ employments: queryRes.value });
    }
    logger.error("failed to fetch data {err}", { err: queryRes.value });
    return c.json({ error: queryRes.value }, 500);
  })
  .get("/with-stories", getUser, async (c) => {
    logger.info("get employments {userId}", { userId: c.var.user.id });
    const dbRes = await dataRepository.getEmploymentStories(c.var.user.id);
    logger.debug("stories {res}", { res: dbRes });
    return c.json({ employments: dbRes });
  })
  .post("/new", getUser, zValidator("json", newEmploymentSchema), async (c) => {
    logger.info("new employment {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const input = c.req.valid("json");
    const result = await dataRepository.addUserEmployment(userId, input);
    return c.json(result);
  });
