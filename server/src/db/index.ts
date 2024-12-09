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
    if (e instanceof Error) {
      return Result.error(`DB query (get user records) failed: ${e.message}`);
    }
    return Result.error(
      "DB query (get user records) failed for an unknown reason",
    );
  }
};

export const addUserRecord = async (
  userId: string,
  record: NewRecordType,
): Promise<SelectRecordType> => {
  logger.info("add a record");
  return db
    .insert(recordsTable)
    .values({
      ...record,
      userId: userId,
    })
    .returning()
    .then((res) => res[0]);
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
    if (e instanceof Error) {
      return Result.error(
        `DB query (get user employments) failed: ${e.message}`,
      );
    }
    return Result.error(
      "DB query (get user employments) failed for an unknown reason",
    );
  }
};

export const addUserEmployment = async (
  userId: string,
  newEmployment: NewEmploymentType,
): Promise<SelectEmploymentType> => {
  logger.info("add employment");
  return db
    .insert(employmentTable)
    .values({
      ...newEmployment,
      userId: userId,
    })
    .returning()
    .then((res) => res[0]);
};
