import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { employments, records } from "./schema";

// Schema for validating API requests
export const insertRecordSchema = createInsertSchema(records);
export type InsertRecordType = z.infer<typeof insertRecordSchema>;

// Schema for validating API responses
export const selectRecordSchema = createSelectSchema(records);
export type SelectRecordType = z.infer<typeof selectRecordSchema>;

// ---
export const newRecordSchema = insertRecordSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});
export type NewRecordType = z.infer<typeof newRecordSchema>;

// API -> DB level
export const insertEmploymentSchema = createInsertSchema(employments);
export const selectEmploymentSchema = createSelectSchema(employments);

export type InsertEmploymentType = z.infer<typeof insertEmploymentSchema>;
export type SelectEmploymentType = z.infer<typeof selectEmploymentSchema>;

// Client -> API level
export const newEmploymentSchema = insertEmploymentSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});
export type NewEmploymentType = z.infer<typeof newEmploymentSchema>;
