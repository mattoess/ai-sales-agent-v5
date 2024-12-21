import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from './types';
import { validateDiscoveryResponse } from './validation';
import { makeApiRequest } from './api';
import { ValidationError } from './errors';
import { discoveryCache, getCacheKey } from './cache';

export async function sendDiscoveryData(discoveryData: DiscoveryState): Promise<DiscoveryResponse> {
  const cacheKey = getCacheKey(discoveryData);
  const cached = discoveryCache.get(cacheKey);
  if (cached) return cached;

  const payload = {
    Barriers: discoveryData.currentState.barriers.join('\r\n'),
    'Barriers Financial Impact': discoveryData.currentState.financialImpact,
    'Barriers Personal Impact': discoveryData.currentState.emotionalImpact,
    'Outcome Financial Impact': discoveryData.futureState.financialImpact,
    Outcomes: discoveryData.futureState.desiredOutcomes.join('\r\n'),
    'Outcomes Personal Impact': discoveryData.futureState.emotionalRelief,
    'Prospect Email Address': discoveryData.prospectInfo.email,
    'Prospect First Name': discoveryData.prospectInfo.firstName,
    'Prospect Last Name': discoveryData.prospectInfo.lastName,
    Urgency: discoveryData.currentState.targetDate
  };

  const data = await makeApiRequest<unknown>('discovery', payload);
  
  if (!validateDiscoveryResponse(data)) {
    throw new ValidationError('Invalid response format from Make.com discovery webhook');
  }

  discoveryCache.set(cacheKey, data);
  return data;
}