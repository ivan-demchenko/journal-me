import { drizzle } from "drizzle-orm/node-postgres";
import {
  recordsTable,
  type NewRecordType,
  type SelectRecordType,
  employmentTable,
  type NewEmploymentType,
  type SelectEmploymentType,
} from "./schema";
import { eq } from "drizzle-orm";
import { Config } from "../config";
import { Result } from "typescript-result";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(["jm-api", "db"]);

export const db = drizzle(Config.DATABASE_URL);

export const getUserRecords = async (
  userId: string,
): Promise<Result<SelectRecordType[], string>> => {
  logger.info("get user records");
  try {
    const res = await db
      .select()
      .from(recordsTable)
      .where(eq(recordsTable.userId, userId));
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
      .insert(recordsTable)
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
    const data = await db
      .select()
      .from(employmentTable)
      .where(eq(employmentTable.userId, userId));
    return Result.ok(data);
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
      .insert(employmentTable)
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
