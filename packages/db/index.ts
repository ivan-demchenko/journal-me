import type { z } from "zod";
import type {
  insertEmploymentSchema,
  insertRecordSchema,
  selectEmploymentSchema,
  selectRecordSchema,
} from "./src/types";
export { Repository } from "./src/repository";

export type InsertRecordType = z.infer<typeof insertRecordSchema>;
export type SelectRecordType = z.infer<typeof selectRecordSchema>;
export type InsertEmploymentType = z.infer<typeof insertEmploymentSchema>;
export type SelectEmploymentType = z.infer<typeof selectEmploymentSchema>;

export type ConnectionCredentials = {
  host: string;
  user: string;
  password: string;
  database: string;
};
