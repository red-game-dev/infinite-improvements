export type ErrorDetails = Record<string, string | number | boolean | null | undefined>;

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  title?: string;
  description?: string;
  details?: ErrorDetails;
  retry?: boolean;
  recoverable?: boolean;
}

export class CustomError extends Error implements AppError {
  code?: string;
  statusCode?: number;
  title?: string;
  description?: string;
  details?: ErrorDetails;
  retry?: boolean;
  recoverable?: boolean;

  constructor(
    message: string,
    options?: {
      code?: string;
      statusCode?: number;
      title?: string;
      description?: string;
      details?: ErrorDetails;
      retry?: boolean;
      recoverable?: boolean;
    }
  ) {
    super(message);
    this.name = 'CustomError';

    if (options) {
      this.code = options.code;
      this.statusCode = options.statusCode;
      this.title = options.title;
      this.description = options.description;
      this.details = options.details;
      this.retry = options.retry;
      this.recoverable = options.recoverable;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  SERVER: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
} as const;

export type ErrorType = typeof ErrorTypes[keyof typeof ErrorTypes];

export function createError(
  type: ErrorType,
  message: string,
  options?: Omit<AppError, 'name' | 'message'>
): CustomError {
  return new CustomError(message, {
    code: type,
    retry: type === ErrorTypes.NETWORK || type === ErrorTypes.TIMEOUT || type === ErrorTypes.SERVER,
    recoverable: type !== ErrorTypes.AUTHENTICATION && type !== ErrorTypes.AUTHORIZATION,
    ...options
  });
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof Error && 'code' in error;
}