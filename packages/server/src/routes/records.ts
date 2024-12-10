import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { getLogger } from "@logtape/logtape";
import { dataRepository } from "../db";
import { insertRecordSchema } from "@jm/db/src/types";

const logger = getLogger(["jm-api", "route", "records"]);

export const newRecordSchema = insertRecordSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});

export const recordsRoutes = new Hono()
  .get("/", getUser, async (c) => {
    logger.info("get {userId}", { userId: c.var.user.id });

    const userId = c.var.user.id;
    const queryRes = await dataRepository.getUserRecords(userId);

    if (queryRes.isOk()) {
      logger.debug("get OK {value}", { value: queryRes.value });
      return c.json({ records: queryRes.value });
    }

    logger.error("get FAIL {err}", { err: queryRes.value });
    return c.json({ error: queryRes.value }, 500);
  })
  .post("/new", getUser, zValidator("json", newRecordSchema), async (c) => {
    logger.info("/new POST {userId} ", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const input = c.req.valid("json");
    logger.debug("payload: {input}", { input, userId });
    const result = await dataRepository.addUserRecord(userId, input);
    return c.json(result);
  });
