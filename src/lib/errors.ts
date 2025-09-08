import { fromError } from 'zod-validation-error'

export class BaseError extends Error {
  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super(message, { cause })

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name

    // Set stack trace to caller
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class HttpError extends BaseError {
  readonly statusCode: number
  readonly headers?: Record<string, string>

  constructor({
    message,
    statusCode = 500,
    headers,
    cause
  }: {
    message: string
    statusCode?: number
    headers?: Record<string, string>
    cause?: unknown
  }) {
    super({ message, cause })

    this.statusCode = statusCode
    this.headers = headers
  }
}

export class ZodValidationError extends HttpError {
  constructor({
    statusCode,
    prefix,
    cause
  }: {
    statusCode?: number
    prefix?: string
    cause: unknown
  }) {
    const error = fromError(cause, { prefix })
    super({ message: error.message, cause, statusCode })
  }
}
