import { resolve } from "node:path";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { authRoute } from "./auth";
import { recordsRoutes } from "./routes/records";
import { Config } from "./config";

const app = new Hono();

app.use("*", logger());
app.get("/health", (c) => c.text("ok"));

const apiRoutes = app
  .basePath("/api")
  .route("/records", recordsRoutes)
  .route("/", authRoute);

app.get(
  "*",
  serveStatic({
    root: Config.WEB_CLIENT_ASSETS,
  }),
);
app.get(
  "*",
  serveStatic({
    path: resolve(Config.WEB_CLIENT_ASSETS, "index.html"),
  }),
);

export { app };
export type ApiRoutes = typeof apiRoutes;
