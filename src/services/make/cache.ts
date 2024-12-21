import { Cache } from '../../utils/cache';
import { DiscoveryResponse, SolutionResponse } from './types';

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export const discoveryCache = new Cache<DiscoveryResponse>(CACHE_DURATION);
export const solutionCache = new Cache<SolutionResponse>(CACHE_DURATION);

export function getCacheKey(data: unknown): string {
  return JSON.stringify(data);
}