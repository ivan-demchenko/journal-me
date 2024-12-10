import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Result } from "typescript-result";
import { getLogger } from "@logtape/logtape";
import type {
  NewEmploymentType,
  NewRecordType,
  SelectEmploymentType,
  SelectRecordType,
} from "./types";
import type { ConnectionCredentials } from "..";

const logger = getLogger(["jm-api", "db"]);

export class Repository {
  #db: NodePgDatabase<typeof schema> & {
    $client: Pool;
  };
  constructor(connectionConfig: ConnectionCredentials) {
    this.#db = drizzle({
      client: new Pool(connectionConfig),
      schema,
      logger: {
        logQuery: (queryStr, params: unknown[]) => {
          logger.debug("Exec query {queryStr} with params {params}", {
            queryStr,
            params,
          });
        },
      },
    });
  }

  async getEmploymentStories(userId: string) {
    logger.info("get employment stories");
    return this.#db.query.employments.findMany({
      with: {
        records: {
          orderBy: (t, ops) => [ops.asc(t.created_at)],
        },
      },
      where: (t, ops) => ops.eq(t.userId, userId),
      orderBy: (t, ops) => ops.desc(t.started),
    });
  }

  async getUserRecords(
    userId: string,
  ): Promise<Result<SelectRecordType[], string>> {
    logger.info("get user records");
    try {
      const res = await this.#db.query.records.findMany({
        where: (table, ops) => ops.eq(table.userId, userId),
      });
      return Result.ok(res);
    } catch (e) {
      logger.error("add user record query failed {e}", { e });
      return Result.error("DB query (get user records) failed");
    }
  }

  async addUserRecord(
    userId: string,
    record: NewRecordType,
  ): Promise<Result<SelectRecordType, string>> {
    logger.info("add a record");
    try {
      const data = await this.#db
        .insert(schema.records)
        .values({
          ...record,
          userId: userId,
        })
        .returning()
        .then((res) => res[0]);

      logger.debug("insert result {data}", { data });

      return Result.ok(data);
    } catch (e) {
      logger.error("add user record query failed {e}", { e });
      return Result.error("DB query (add user record) failed");
    }
  }

  async getUserEmployments(
    userId: string,
  ): Promise<Result<SelectEmploymentType[], string>> {
    logger.info("get user employments");
    logger.debug("get user employments for user {userId}", { userId });
    try {
      const res = await this.#db.query.employments.findMany({
        where: (t, ops) => ops.eq(t.userId, userId),
      });
      return Result.ok(res);
    } catch (e) {
      logger.error("get user employments query failed {err}", { err: e });
      return Result.error("DB query (get user employments) failed");
    }
  }

  async addUserEmployment(
    userId: string,
    newEmployment: NewEmploymentType,
  ): Promise<Result<SelectEmploymentType, string>> {
    logger.info("add employment");
    try {
      const data = await this.#db
        .insert(schema.employments)
        .values({
          ...newEmployment,
          userId: userId,
        })
        .returning()
        .then((res) => res[0]);

      logger.debug("insert employment returned {data}", { data });

      return Result.ok(data);
    } catch (e) {
      logger.error("add user employment query failed {e}", { e });
      return Result.error("DB query (add user employment) failed");
    }
  }
}
