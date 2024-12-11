import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import type { Logger } from "@logtape/logtape";
import type { Repository } from "@jm/db/repository";
import { addNewRecordSchema } from "./input.validation";
import { makeRecordDBPayload } from "./data.mapping";

export function makeRecordsRoutes(repository: Repository, logger: Logger) {
  return (
    new Hono()
      /**
       * GET /api/records
       */
      .get("/", getUser, async (c) => {
        logger.info("get user record {userId}", { userId: c.var.user.id });

        const queryRes = await repository.getUserRecords(c.var.user.id);

        if (queryRes.isOk()) {
          logger.debug("got records {value}", { value: queryRes.value });
          return c.json({ records: queryRes.value });
        }

        logger.error("failed to get user records {err}", {
          err: queryRes.value,
        });
        return c.json({ error: queryRes.value }, 500);
      })
      /**
       * POST /api/records/new
       */
      .post(
        "/new",
        getUser,
        zValidator("json", addNewRecordSchema),
        async (c) => {
          logger.info("create new user record {userId} ", {
            userId: c.var.user.id,
          });

          const userId = c.var.user.id;
          const input = c.req.valid("json");
          logger.debug("payload: {input}", { input, userId });

          const result = await repository.addUserRecord(
            makeRecordDBPayload(userId, input),
          );

          if (result.isOk()) {
            logger.info("a new user record has been created ");
            return c.json(result.value);
          }

          logger.error("Failed to create a new user record {err}", {
            err: result.value,
          });
          return c.json({ error: result.value }, 500);
        },
      )
  );
}
