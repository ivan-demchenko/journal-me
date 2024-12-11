import { insertRecordSchema, insertEmploymentSchema } from "@jm/db/io-schemas";

export const addNewRecordSchema = insertRecordSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});

export const addNewEmploymentSchema = insertEmploymentSchema.omit({
  id: true,
  userId: true,
  created_at: true,
  updated_at: true,
});
