// src/services/make/index.ts
import { AppError, ErrorType } from '../errors';

// Core services exports
export { 
  createSession, 
  loadSession, 
  generateSolution 
} from './DiscoverySessionService';

export { sendDiscoveryData } from './discoveryService';
export { makeApiRequest } from './api';
export { MAKE_CONFIG } from './config';

// Types exports
export type { 
  DiscoveryResponse, 
  SolutionResponse 
} from './types';

// Content Processing Types
export interface ContentProcessingResponse {
  success: boolean;
  documentId: string;
  status: 'uploaded' | 'processing' | 'embedded' | 'failed';
  metadata?: {
    pageCount?: number;
    wordCount?: number;
    vectorCount?: number;
    extractedTags?: string[];
  };
  processingDetails?: {
    startTime: string;
    endTime?: string;
    duration?: number;
    steps: Array<{
      name: string;
      status: 'completed' | 'failed';
      duration?: number;
      error?: string;
    }>;
  };
}

// Constants
export const CONTENT_PROCESSING = {
  PRIORITIES: {
    HIGH: 'high',
    NORMAL: 'normal',
    LOW: 'low'
  },
  TYPES: {
    SOLUTION: 'solution',
    CASE_STUDY: 'case_study',
    TECHNICAL: 'technical',
    PRICING: 'pricing',
    METHODOLOGY: 'methodology'
  },
  AUDIENCES: {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    EXECUTIVE: 'executive'
  }
} as const;

// Type Guards and Validators
export function validateContentResponse(data: unknown): data is ContentProcessingResponse {
  const response = data as ContentProcessingResponse;
  
  if (!response || typeof response !== 'object') {
    throw new AppError(ErrorType.VALIDATION, 'Invalid response structure');
  }

  if (typeof response.success !== 'boolean') {
    throw new AppError(ErrorType.VALIDATION, 'Response missing success status');
  }

  if (typeof response.documentId !== 'string') {
    throw new AppError(ErrorType.VALIDATION, 'Response missing document ID');
  }

  if (!['uploaded', 'processing', 'embedded', 'failed'].includes(response.status)) {
    throw new AppError(ErrorType.VALIDATION, 'Invalid processing status');
  }

  return true;
}

// Error Helpers
export function handleMakeError(error: unknown, context?: string): never {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof Error) {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      throw new AppError(
        ErrorType.NETWORK, 
        `Make.com network error${context ? ` during ${context}` : ''}`, 
        { originalError: error }
      );
    }
    
    throw new AppError(
      ErrorType.API, 
      `Make.com error${context ? ` during ${context}` : ''}: ${error.message}`, 
      { originalError: error }
    );
  }

  throw new AppError(
    ErrorType.SYSTEM,
    `Unknown error${context ? ` during ${context}` : ''} while processing Make.com request`,
    { originalError: error }
  );
}