import type * as z from 'zod'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { HttpError, ZodValidationError } from './errors'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assert(expr: unknown, message?: string): asserts expr
export function assert(
  expr: unknown,
  statusCode?: number,
  message?: string
): asserts expr
export function assert(
  expr: unknown,
  statusCodeOrMessage?: number | string,
  message = 'Internal assertion failed'
): asserts expr {
  if (expr) {
    return
  }

  if (typeof statusCodeOrMessage === 'number') {
    const error = new HttpError({ statusCode: statusCodeOrMessage, message })
    Error.captureStackTrace(error, assert)
    throw error
  } else {
    const error = new Error(statusCodeOrMessage ?? message)
    Error.captureStackTrace(error, assert)
    throw error
  }
}

/**
 * Parses the given input against the given Zod schema, throwing a
 * `ZodValidationError` if the input is invalid.
 */
export function parseZodSchema<TSchema extends z.ZodType<any, any, any>>(
  schema: TSchema,
  input: unknown,
  {
    error,
    statusCode = 500
  }: {
    error?: string
    statusCode?: number
  } = {}
): z.infer<TSchema> {
  try {
    return schema.parse(input)
  } catch (err) {
    throw new ZodValidationError({
      prefix: error,
      cause: err,
      statusCode
    })
  }
}

export async function sha256(
  input: string | ArrayBuffer | ArrayBufferView = crypto.randomUUID()
) {
  let dataBuffer: ArrayBuffer | ArrayBufferView

  if (typeof input === 'string') {
    dataBuffer = new TextEncoder().encode(input)
  } else {
    dataBuffer = input
  }

  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer as any)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('')
  return hashHex
}

export function getEnv(name: string): string | undefined {
  try {
    return typeof process !== 'undefined'
      ? // eslint-disable-next-line no-process-env
        process.env?.[name]
      : undefined
  } catch {
    return undefined
  }
}
