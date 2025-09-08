import type { Simplify } from 'type-fest'
import { z } from 'zod'

import {
  envSchema as baseEnvSchema,
  parseEnv as parseBaseEnv
} from './base-env'
import { parseZodSchema } from './utils'

export const envSchema = baseEnvSchema
  .extend({
    DATABASE_URL: z.url(),

    AGENTIC_STORAGE_BASE_URL: z
      .url()
      .optional()
      .default('https://storage.agentic.so'),

    PORT: z.coerce.number().default(3001),

    STRIPE_SECRET_KEY: z.string().nonempty(),
    STRIPE_WEBHOOK_SECRET: z.string().nonempty(),

    KERNEL_API_KEY: z.string().nonempty(),
    OPENROUTER_API_KEY: z.string().nonempty(),

    S3_BUCKET: z.string().nonempty().optional().default('agentic'),
    S3_REGION: z.string().nonempty().optional().default('auto'),
    S3_ENDPOINT: z.url(),
    S3_ACCESS_KEY_ID: z.string().nonempty(),
    S3_ACCESS_KEY_SECRET: z.string().nonempty(),

    GITHUB_CLIENT_ID: z.string().nonempty(),
    GITHUB_CLIENT_SECRET: z.string().nonempty()
  })
  .strip()
export type RawEnv = z.infer<typeof envSchema>

export function parseEnv(inputEnv: Record<string, unknown>) {
  const baseEnv = parseBaseEnv({
    ...inputEnv
  })

  const env = parseZodSchema(
    envSchema,
    { ...inputEnv, ...baseEnv },
    {
      error: 'Invalid environment variables'
    }
  )

  const isStripeLive = env.STRIPE_SECRET_KEY.startsWith('sk_live_')
  const apiBaseUrl = baseEnv.isProd
    ? 'https://api.agentic.so'
    : 'http://localhost:3001'

  return {
    ...baseEnv,
    ...env,
    isStripeLive,
    apiBaseUrl
  }
}

export type Env = Simplify<ReturnType<typeof parseEnv>>

// eslint-disable-next-line no-process-env
export const env = parseEnv(process.env)
