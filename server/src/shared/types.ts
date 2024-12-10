import type { z } from "zod";
import type {
  newRecordSchema,
  selectRecordSchema,
  newEmploymentSchema,
  selectEmploymentSchema,
} from "../db/types";

export type NewRecordPayload = z.infer<typeof newRecordSchema>;
export type RecordApiResponse = z.infer<typeof selectRecordSchema>;

export type NewEmploymentPayload = z.infer<typeof newEmploymentSchema>;
export type EmploymentApiResponse = z.infer<typeof selectEmploymentSchema>;

export type EmploymentStoryResponse = EmploymentApiResponse & {
  records: RecordApiResponse[];
};
