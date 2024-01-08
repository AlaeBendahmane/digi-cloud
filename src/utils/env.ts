import { z } from "zod";

const envSchema = z.object({
  VITE_AUTH_API: z.string().url().default("https://dev.api.auth.digieye.io"),
  VITE_BACK_API: z.string().url().default("https://dev.api.digieye.io"),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env);
