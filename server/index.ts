import { app } from "./src/app";
import { Config } from "./src/config";
import {
  ansiColorFormatter,
  configure,
  getConsoleSink,
} from "@logtape/logtape";

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

const server = Bun.serve({
  port: Config.PORT,
  fetch: app.fetch,
});

console.log(`Server is running on ${server.port}`);
