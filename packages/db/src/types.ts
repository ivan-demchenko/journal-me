import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employments, records } from "./schema";

export const insertRecordSchema = createInsertSchema(records);
export const selectRecordSchema = createSelectSchema(records);

export const insertEmploymentSchema = createInsertSchema(employments);
export const selectEmploymentSchema = createSelectSchema(employments);
