import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employments, records } from "./schema";

export const insertRecordSchema = createInsertSchema(records);
export const selectRecordSchema = createSelectSchema(records);

export const insertEmploymentSchema = createInsertSchema(employments);
export const selectEmploymentSchema = createSelectSchema(employments);

export type InsertRecordType = z.infer<typeof insertRecordSchema>;
export type InsertEmploymentType = z.infer<typeof insertEmploymentSchema>;
export type SelectRecordType = z.infer<typeof selectRecordSchema>;
export type SelectEmploymentType = z.infer<typeof selectEmploymentSchema>;
