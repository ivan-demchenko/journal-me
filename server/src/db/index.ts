import { drizzle } from "drizzle-orm/node-postgres";
import { recordsTable, type UserRecord, type NewUserRecord } from "./schema";
import { eq } from "drizzle-orm";
import { Config } from "../config";

export const db = drizzle(Config.DATABASE_URL);

export const getUserRecords = async (userId: string): Promise<UserRecord[]> => {
  return db.select().from(recordsTable).where(eq(recordsTable.userId, userId));
};

export const addUserRecord = async (
  userId: string,
  record: NewUserRecord,
): Promise<UserRecord> => {
  return db
    .insert(recordsTable)
    .values({
      ...record,
      userId: userId,
    })
    .returning()
    .then((res) => res[0]);
};
