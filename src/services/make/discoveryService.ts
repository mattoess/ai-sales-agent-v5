// src/services/make/discoveryService.ts
import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from './types';
import { validateDiscoveryResponse } from './validation';
import { makeApiRequest } from './api';
import { ValidationError } from './errors';
import { discoveryCache, getCacheKey } from './cache';
// import { transformToApiFormat } from './transformers';

export async function sendDiscoveryData(discoveryData: DiscoveryState): Promise<DiscoveryResponse> {
  try {
    const cacheKey = getCacheKey(discoveryData);
    const cached = discoveryCache.get(cacheKey);
    if (cached) return cached;

    // const apiData = transformToApiFormat(discoveryData);

    const data = await makeApiRequest<DiscoveryResponse>('discovery', discoveryData, validateDiscoveryResponse); // Try discoveryData prior to transformation
    
    if (!data) {
      throw new ValidationError('No data received from Make.com discovery webhook');
    }

    discoveryCache.set(cacheKey, data);
    return data;

  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error in sendDiscoveryData:', error.message);
      throw error;
    }
    
    console.error('Error in sendDiscoveryData:', error);
    throw new ValidationError('Failed to process discovery data');
  }
}