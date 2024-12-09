import type { z } from "zod";
import type { newRecordSchema, selectRecordSchema } from "../db/schema";
import type {
  newEmploymentSchema,
  selectEmploymentSchema,
} from "../db/schema/employment";

export type NewRecordPayload = z.infer<typeof newRecordSchema>;
export type RecordApiResponse = z.infer<typeof selectRecordSchema>;

export type NewEmploymentPayload = z.infer<typeof newEmploymentSchema>;
export type EmploymentApiResponse = z.infer<typeof selectEmploymentSchema>;
