import 'dotenv/config'

import type { Simplify } from 'type-fest'
import { z } from 'zod'

import { parseZodSchema } from './utils'

export const envSchema = z
  .object({
    ENVIRONMENT: z
      .enum(['development', 'test', 'production'])
      .default('development')
  })
  .strip()

export function parseEnv(inputEnv: unknown) {
  const env = parseZodSchema(envSchema, inputEnv, {
    error: 'Invalid environment variables'
  })

  const isDev = env.ENVIRONMENT === 'development'
  const isTest = env.ENVIRONMENT === 'test'
  const isProd = env.ENVIRONMENT === 'production'
  const isBrowser = (globalThis as any).window !== undefined

  return {
    ...env,
    isDev,
    isTest,
    isProd,
    isBrowser
  }
}

export type Env = Simplify<ReturnType<typeof parseEnv>>
