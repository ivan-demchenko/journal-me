import { z } from "zod";

const EnvSchema = z.object({
  DB_DATABASE: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  KINDE_ISSUER_URL: z.string(),
  KINDE_CLIENT_ID: z.string(),
  KINDE_CLIENT_SECRET: z.string(),
  KINDE_REDIRECT_URI: z.string(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string(),
  WEB_CLIENT_ASSETS: z.string(),
  PORT: z
    .string()
    .default(process.env.PORT || "8080")
    .transform((val) => Number.parseInt(val)),
});

const parseResult = EnvSchema.safeParse(process.env);

if (parseResult.error) {
  console.log(parseResult.error.issues);
  process.exit(1);
}

export type EnvConfig = z.infer<typeof EnvSchema>;
export const Config = parseResult.data;
