import { Cache } from '../utils/cache';
import { DiscoveryState } from '../types/discovery';

const discoveryCache = new Cache<any>();

export const cacheService = {
  generateKey(discoveryData: DiscoveryState): string {
    return JSON.stringify({
      barriers: discoveryData.currentState.barriers,
      financialImpact: discoveryData.currentState.financialImpact,
      emotionalImpact: discoveryData.currentState.emotionalImpact,
      outcomes: discoveryData.futureState.desiredOutcomes,
      solution: discoveryData.solution,
    });
  },

  get(key: string): any | null {
    return discoveryCache.get(key);
  },

  set(key: string, data: any): void {
    discoveryCache.set(key, data);
  },

  clear(): void {
    discoveryCache.clear();
  },
};