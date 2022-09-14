import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  POSTCODE_URL: z.string(),
  POSTCODE_API: z.string(),
});
