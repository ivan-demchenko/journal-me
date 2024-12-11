export type {
  InsertEmploymentType,
  InsertRecordType,
  SelectEmploymentType,
  SelectRecordType,
} from "./src/validation.schemas";

export type ConnectionCredentials = {
  host: string;
  user: string;
  password: string;
  database: string;
};
