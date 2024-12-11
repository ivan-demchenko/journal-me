import { resolve } from "node:path";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger as honoLogger } from "hono/logger";
import { authRoute } from "./auth";
import { Config } from "./config";
import { makeRecordsRoutes } from "./routes/records";
import { makeEmploymentRoutes } from "./routes/employments";
import type { Logger } from "@logtape/logtape";
import type { Repository } from "@jm/db/repository";
import { makeGenerateRoutes } from "./routes/generate";

function makeApiRoutes(app: Hono, repository: Repository, logger: Logger) {
  return app
    .basePath("/api")
    .route(
      "/records",
      makeRecordsRoutes(repository, logger.getChild("records")),
    )
    .route(
      "/employments",
      makeEmploymentRoutes(repository, logger.getChild("employments")),
    )
    .route(
      "/generate",
      makeGenerateRoutes(repository, logger.getChild("generate")),
    )
    .route("/", authRoute);
}

export function makeApp(repository: Repository, logger: Logger) {
  const app = new Hono();
  app.use("*", honoLogger());
  app.get("/health", (c) => c.text("ok"));

  makeApiRoutes(app, repository, logger);

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
  return app;
}

export type ApiRoutes = ReturnType<typeof makeApiRoutes>;
