import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Config } from "../config";
import { Result } from "typescript-result";
import { getLogger } from "@logtape/logtape";
import type {
  NewEmploymentType,
  NewRecordType,
  SelectEmploymentType,
  SelectRecordType,
} from "./types";

const logger = getLogger(["jm-api", "db"]);

const pool = new Pool({
  connectionString: Config.DATABASE_URL,
});
export const db = drizzle({
  client: pool,
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

export const getEmploymentStories = async (userId: string) => {
  logger.info("get employment stories");
  return db.query.employments.findMany({
    with: {
      records: {
        orderBy: (t, ops) => [ops.asc(t.created_at)],
      },
    },
    where: (t, ops) => ops.eq(t.userId, userId),
    orderBy: (t, ops) => ops.desc(t.started),
  });
};

export const getUserRecords = async (
  userId: string,
): Promise<Result<SelectRecordType[], string>> => {
  logger.info("get user records");
  try {
    const res = await db.query.records.findMany({
      where: (table, ops) => ops.eq(table.userId, userId),
    });
    return Result.ok(res);
  } catch (e) {
    logger.error("add user record query failed {e}", { e });
    return Result.error("DB query (get user records) failed");
  }
};

export const addUserRecord = async (
  userId: string,
  record: NewRecordType,
): Promise<Result<SelectRecordType, string>> => {
  logger.info("add a record");
  try {
    const data = await db
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
};

export const getUserEmployments = async (
  userId: string,
): Promise<Result<SelectEmploymentType[], string>> => {
  logger.info("get user employments");
  logger.debug("get user employments for user {userId}", { userId });
  try {
    const res = await db.query.employments.findMany({
      where: (t, ops) => ops.eq(t.userId, userId),
    });
    return Result.ok(res);
  } catch (e) {
    logger.error("get user employments query failed {err}", { err: e });
    return Result.error("DB query (get user employments) failed");
  }
};

export const addUserEmployment = async (
  userId: string,
  newEmployment: NewEmploymentType,
): Promise<Result<SelectEmploymentType, string>> => {
  logger.info("add employment");
  try {
    const data = await db
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
};
