import { z } from "zod";

const EnvSchema = z.object({
  KINDE_ISSUER_URL: z.string(),
  KINDE_CLIENT_ID: z.string(),
  KINDE_CLIENT_SECRET: z.string(),
  KINDE_SITE_URL: z.string(),
  KINDE_REDIRECT_URI: z.string(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string(),
  DATABASE_URL: z.string(),
  WEB_CLIENT_ASSETS: z.string(),
  PORT: z
    .string()
    .default(process.env.PORT || "8080")
    .transform((val) => Number.parseInt(val)),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

const parseResult = EnvSchema.safeParse(process.env);

if (parseResult.error) {
  console.log(parseResult.error.issues);
  process.exit(1);
}

export const Config = parseResult.data;
