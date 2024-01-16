import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_API: z
    .string()
    .url()
    .default(`
    https://api.cloud.digieye.io/`),
});

export const env = envSchema.parse(import.meta.env);