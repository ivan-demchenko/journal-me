import type { z } from "zod";
import type {
  addNewEmploymentSchema,
  addNewRecordSchema,
  generateNewCVSchema,
} from "../routes/input.validation";
import type {
  selectEmploymentSchema,
  selectRecordSchema,
} from "../routes/output.validation";

export type { ApiRoutes } from "../app";

export type NewRecordPayload = z.infer<typeof addNewRecordSchema>;
export type RecordResponse = z.infer<typeof selectRecordSchema>;

export type NewEmploymentPayload = z.infer<typeof addNewEmploymentSchema>;
export type EmploymentResponse = z.infer<typeof selectEmploymentSchema>;

export type GenerateCVPayload = z.infer<typeof generateNewCVSchema>;

export type EmploymentStoryResponse = EmploymentResponse & {
  records: RecordResponse[];
};
