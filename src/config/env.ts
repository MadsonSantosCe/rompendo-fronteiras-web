import { z } from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production']),
  VITE_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env= _env.data;

