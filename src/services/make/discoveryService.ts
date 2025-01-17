// src/services/make/discoveryService.ts
import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from './types';
import { makeApiRequest } from './api';
import { AppError, ErrorType } from '../errors';
import { discoveryCache, getCacheKey } from './cache';
import { MAKE_CONFIG } from './config';
import { transformToApiFormatForDiscovery } from './transformers';

export function validateDiscoveryResponse(data: unknown): data is DiscoveryResponse {
  const response = data as DiscoveryResponse;
  
  if (!response || typeof response !== 'object') {
    throw new AppError(ErrorType.VALIDATION, 'Invalid discovery response structure');
  }

  if (!response.current_state || typeof response.current_state !== 'object') {
    throw new AppError(ErrorType.VALIDATION, 'Missing or invalid current state');
  }

  if (!response.future_state || typeof response.future_state !== 'object') {
    throw new AppError(ErrorType.VALIDATION, 'Missing or invalid future state');
  }

  // Validate required arrays exist
  if (!Array.isArray(response.current_state.emotions)) {
    throw new AppError(ErrorType.VALIDATION, 'Missing current state emotions');
  }

  if (!Array.isArray(response.future_state.emotions)) {
    throw new AppError(ErrorType.VALIDATION, 'Missing future state emotions');
  }

  return true;
}

export async function sendDiscoveryData(discoveryData: DiscoveryState): Promise<DiscoveryResponse> {
  try {
    // Cache check
    const cacheKey = getCacheKey(discoveryData);
    const cached = discoveryCache.get(cacheKey);
    if (cached) return cached;

    const apiData = transformToApiFormatForDiscovery(discoveryData);

    const data = await makeApiRequest<DiscoveryResponse>(
      MAKE_CONFIG.urls.discovery, 
      apiData, 
      validateDiscoveryResponse,
      MAKE_CONFIG.timeouts.discovery
    );

    discoveryCache.set(cacheKey, data);
    return data;

  } catch (error) {
    // Convert any error to an AppError with appropriate context
    if (error instanceof AppError) {
      // Add discovery-specific context to existing AppError
      error.context.details = {
        ...error.context.details,
        stage: discoveryData.stage,
        hasCurrentState: !!discoveryData.currentState,
        hasFutureState: !!discoveryData.futureState
      };
      throw error;
    }

    // Create new AppError for other error types
    throw new AppError(
      ErrorType.API, // Changed from DISCOVERY to API
      'Failed to process discovery data',
      {
        originalError: error,
        details: {
          stage: discoveryData.stage,
          hasCurrentState: !!discoveryData.currentState,
          hasFutureState: !!discoveryData.futureState,
          errorType: error instanceof Error ? error.name : typeof error
        }
      }
    );
  }
}

// Helper to determine if discovery data is valid for processing
export function validateDiscoveryData(data: DiscoveryState): void {
  const validationErrors: Record<string, boolean> = {};

  // Check prospect information
  if (!data.prospectInfo.industryType) {
    validationErrors.industryType = true;
  }
  if (!data.prospectInfo.companySize) {
    validationErrors.companySize = true;
  }

  if (Object.keys(validationErrors).length > 0) {
    throw new AppError(
      ErrorType.VALIDATION,
      'Missing required prospect information',
      {
        details: {
          missing: validationErrors,
          providedInfo: {
            ...data.prospectInfo,
            // Remove sensitive data
            email: undefined,
            phone: undefined
          }
        }
      }
    );
  }

  // Check current state
  if (!data.currentState.barriers || data.currentState.barriers.length === 0) {
    throw new AppError(
      ErrorType.VALIDATION,
      'Current state barriers are required',
      {
        details: {
          currentState: {
            hasBarriers: false,
            barriersCount: data.currentState.barriers?.length ?? 0,
            otherFieldsPresent: {
              hasFinancialImpact: !!data.currentState.financialImpact,
              hasEmotionalImpact: !!data.currentState.emotionalImpact,
              hasTargetDate: !!data.currentState.targetDate
            }
          }
        }
      }
    );
  }

  // Check future state
  if (!data.futureState.desiredOutcomes || data.futureState.desiredOutcomes.length === 0) {
    throw new AppError(
      ErrorType.VALIDATION,
      'Future state outcomes are required',
      {
        details: {
          futureState: {
            hasOutcomes: false,
            outcomesCount: data.futureState.desiredOutcomes?.length ?? 0,
            otherFieldsPresent: {
              hasFinancialImpact: !!data.futureState.financialImpact,
              hasEmotionalRelief: !!data.futureState.emotionalRelief
            }
          }
        }
      }
    );
  }
}