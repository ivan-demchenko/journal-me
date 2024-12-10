import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    host: process.env.DB_HOST!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    database: process.env.DB_DATABASE!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    user: process.env.DB_USER!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    password: process.env.DB_PASSWORD!,
  },
});
