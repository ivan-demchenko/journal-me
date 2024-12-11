import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import type { Logger } from "@logtape/logtape";
import type { Repository } from "@jm/db/repository";
import { addNewEmploymentSchema } from "./input.validation";
import { makeEmploymentDBRecord } from "./data.mapping";

export function makeEmploymentRoutes(repository: Repository, logger: Logger) {
  return (
    new Hono()
      /**
       * GET /api/employments
       */
      .get("/", getUser, async (c) => {
        logger.info("get user employments {userId}", { userId: c.var.user.id });

        const queryRes = await repository.getUserEmployments(c.var.user.id);

        if (queryRes.isOk()) {
          logger.debug("got user employments {data}", { data: queryRes.value });
          return c.json({ employments: queryRes.value });
        }

        logger.error("failed to fetch data {err}", { err: queryRes.value });
        return c.json({ error: queryRes.value }, 500);
      })
      /**
       * GET /api/employments/with-stories
       */
      .get("/with-stories", getUser, async (c) => {
        logger.info("get employments {userId}", { userId: c.var.user.id });
        const dbRes = await repository.getEmploymentStories(c.var.user.id);
        logger.debug("stories {res}", { res: dbRes });
        return c.json({ employments: dbRes });
      })
      /**
       * POST /api/employments/new
       */
      .post(
        "/new",
        getUser,
        zValidator("json", addNewEmploymentSchema),
        async (c) => {
          logger.info("create new user employment {userId}", {
            userId: c.var.user.id,
          });

          const input = c.req.valid("json");
          const result = await repository.addUserEmployment(
            makeEmploymentDBRecord(c.var.user.id, input),
          );

          if (result.isOk()) {
            logger.info("a new user employment has been created");
            return c.json(result);
          }

          logger.error("Failed to create a new user employment");
          return c.json({ error: result }, 500);
        },
      )
  );
}
