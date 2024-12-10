import { Config } from "./config";
import { Repository } from "@jm/db";

export const dataRepository = new Repository({
  database: Config.DB_DATABASE,
  host: Config.DB_HOST,
  password: Config.DB_PASSWORD,
  user: Config.DB_USER,
});
