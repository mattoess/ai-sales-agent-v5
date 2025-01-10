// src/services/errors.ts
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  CONTENT = 'CONTENT',
  NETWORK = 'NETWORK',
  API = 'API',
  SYSTEM = 'SYSTEM'
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public context: {
      details?: any;
      originalError?: any;
    } = {}
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    // Handle other error types
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return new AppError(ErrorType.SYSTEM, message, { originalError: error });
  }
}