export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION'
  | 'RATE_LIMIT'
  | 'INTERNAL';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode = 'INTERNAL',
    public readonly status = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request.') {
    super(message, 'BAD_REQUEST', 400);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION', 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'You must sign in.') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied.') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found.') {
    super(message, 'NOT_FOUND', 404);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded.') {
    super(message, 'RATE_LIMIT', 429);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}

export class InternalError extends AppError {
  constructor(message = 'Something went wrong. Please try again.') {
    super(message, 'INTERNAL', 500);
  }
}
