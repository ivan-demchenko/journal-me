import { makeApp } from "./src/app";
import { Config } from "./src/config";
import {
  ansiColorFormatter,
  configure,
  getConsoleSink,
  getLogger,
} from "@logtape/logtape";
import { Repository } from "@jm/db/repository";

export const dataRepository = new Repository({
  database: Config.DB_DATABASE,
  host: Config.DB_HOST,
  password: Config.DB_PASSWORD,
  user: Config.DB_USER,
});

await configure({
  sinks: {
    console: getConsoleSink({
      formatter: ansiColorFormatter,
    }),
  },
  loggers: [
    { category: ["logtape", "meta"], sinks: [] },
    { category: "jm-api", lowestLevel: "debug", sinks: ["console"] },
  ],
});

const app = makeApp(dataRepository, getLogger("jm-api"));

const server = Bun.serve({
  port: Config.PORT,
  fetch: app.fetch,
});

console.log(`Server is running on ${server.port}`);
