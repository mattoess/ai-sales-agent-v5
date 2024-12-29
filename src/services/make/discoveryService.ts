// src/services/make/discoveryService.ts

import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from './types';
import { validateDiscoveryResponse } from './validation';
import { makeApiRequest } from './api';
import { MakeApiError, ValidationError, NetworkError } from './errors';
import { discoveryCache, getCacheKey } from './cache';
import { MAKE_CONFIG } from './config';
import { transformToApiFormatForDiscovery } from './transformers';

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
      MAKE_CONFIG.timeouts.request
    );
    
    if (!data) {
      throw new ValidationError('No data received from Make.com discovery endpoint');
    }

    discoveryCache.set(cacheKey, data);
    return data;

  } catch (error) {
    // More specific error handling
    if (error instanceof ValidationError) {
      console.error('Validation error in discovery service:', error.message);
      throw error;
    }

    if (error instanceof MakeApiError) {
      console.error('Make.com API error:', error.message, 'Status:', error.statusCode);
      throw error;
    }

    if (error instanceof NetworkError) {
      console.error('Network error in discovery service:', error.message);
      throw new MakeApiError('Failed to connect to Make.com discovery endpoint', undefined, error);
    }

    // Unknown errors
    console.error('Unexpected error in discovery service:', error);
    throw new MakeApiError('Failed to process discovery data', undefined, error);
  }
}