import type { InsertRecordType, InsertEmploymentType } from "@jm/db";
import type { NewEmploymentPayload, NewRecordPayload } from "../shared";

export function makeRecordDBPayload(
  userId: string,
  payload: NewRecordPayload,
): InsertRecordType {
  return {
    ...payload,
    userId,
  };
}

export function makeEmploymentDBRecord(
  userId: string,
  payload: NewEmploymentPayload,
): InsertEmploymentType {
  return {
    ...payload,
    userId,
  };
}
