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
  }