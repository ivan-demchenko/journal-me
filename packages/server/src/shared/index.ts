import type { z } from "zod";
import type { newRecordSchema } from "../routes/records";
import type { newEmploymentSchema } from "../routes/employments";
// TODO: fix this!
import type {
  selectEmploymentSchema,
  selectRecordSchema,
} from "@jm/db/src/types";

export type { ApiRoutes } from "../app";

export type NewRecordPayload = z.infer<typeof newRecordSchema>;
export type RecordResponse = z.infer<typeof selectRecordSchema>;

export type NewEmploymentPayload = z.infer<typeof newEmploymentSchema>;
export type EmploymentResponse = z.infer<typeof selectEmploymentSchema>;

export type EmploymentStoryResponse = EmploymentResponse & {
  records: RecordResponse[];
};
