import { Hono } from "hono";
import { getUserRecords, addUserRecord } from "../db";
import { newRecordSchema } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(["jm-api", "route", "records"]);

export const recordsRoutes = new Hono()
  .get("/", getUser, async (c) => {
    logger.info("get records {userId}", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const queryRes = await getUserRecords(userId);
    if (queryRes.isOk()) {
      logger.debug("success {val}", { value: queryRes.value });
      return c.json({ records: queryRes.value });
    }
    logger.error("failed to fetch records {err}", { err: queryRes.value });
    return c.json({ error: queryRes.value }, 500);
  })
  .post("/new", getUser, zValidator("json", newRecordSchema), async (c) => {
    logger.info("new record {userId} ", { userId: c.var.user.id });
    const userId = c.var.user.id;
    const input = c.req.valid("json");
    logger.debug("payload: {input}", { input, userId });
    const result = await addUserRecord(userId, input);
    return c.json(result);
  });
