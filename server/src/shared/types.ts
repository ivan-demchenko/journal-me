import type { z } from "zod";
import type {
  insertRecordSchema,
  newRecordSchema,
  selectRecordSchema,
} from "../db/schema";

export type InsertRecordType = z.infer<typeof insertRecordSchema>;
export type NewRecordType = z.infer<typeof newRecordSchema>;
export type SelectRecordType = z.infer<typeof selectRecordSchema>;
