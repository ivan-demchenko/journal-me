import { app } from "./src/app";
import { Config } from "./src/config";

const server = Bun.serve({
  port: Config.PORT,
  fetch: app.fetch,
});

console.log(`Server is running on ${server.port}`);
