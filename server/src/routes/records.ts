import { Hono } from "hono";
import { getUserRecords, addUserRecord } from "../db";
import { newRecordSchema } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";

export const recordsRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const records = await getUserRecords(c.var.user.id);
    return c.json({ records });
  })
  .post("/new", getUser, zValidator("json", newRecordSchema), async (c) => {
    const input = c.req.valid("json");
    const result = await addUserRecord(c.var.user.id, input);
    return c.json(result);
  });
