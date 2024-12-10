import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const dbConnectionUrl = process.env.DATABASE_URL;

if (!dbConnectionUrl) {
  throw new Error("Missing DB Url");
}

const db = drizzle(dbConnectionUrl);
await migrate(db, {
  migrationsFolder: "./drizzle",
});

console.log("Migration is done");
