// src/services/errors/index.ts (NEW FILE)
export enum ErrorType {
    VALIDATION = 'VALIDATION',
    API = 'API',
    NETWORK = 'NETWORK',
    DISCOVERY = 'DISCOVERY',
    CONTENT = 'CONTENT',
    SYSTEM = 'SYSTEM'
}
  
  export interface ErrorContext {
    code?: string;
    statusCode?: number;
    originalError?: unknown;
    details?: Record<string, unknown>;
  }
  
  export class AppError extends Error {
    constructor(
      public type: ErrorType,
      message: string,
      public context: ErrorContext = {}
    ) {
      super(message);
      this.name = `${type.toUpperCase()}_ERROR`;
    }
  
    static fromError(error: unknown, type: ErrorType = ErrorType.SYSTEM): AppError {
      if (error instanceof AppError) return error;
      
      if (error instanceof Error) {
        return new AppError(type, error.message, {
          originalError: error
        });
      }
  
      return new AppError(type, 'An unknown error occurred', {
        originalError: error
      });
    }
  }
  
  // Error factories
  export const createApiError = (message: string, statusCode?: number) =>
    new AppError(ErrorType.API, message, { statusCode });
  
  export const createValidationError = (message: string, code?: string) =>
    new AppError(ErrorType.VALIDATION, message, { code });
  
  export const createContentError = (message: string, details?: Record<string, unknown>) =>
    new AppError(ErrorType.CONTENT, message, { details });