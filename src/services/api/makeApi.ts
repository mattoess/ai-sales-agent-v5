import { DiscoveryState } from '../../types/discovery';
import { cacheService } from '../cacheService';
import { parseMakeResponse } from './makeResponseParser';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/qx0twe651e9jiwlbpri5tjzo3dx3bov2';

interface MakeResponse {
  current_state: {
    barrier_themes: string[];
    emotional_impact: string[];
    financial_risk: string;
  };
  future_state: {
    desired_outcomes: string[];
    emotional_relief: string[];
    financial_impact: string;
  };
  bridge_the_gap: {
    solution_summary: string;
  };
  similar_use_cases: Array<{
    story: string;
    impact: string;
  }>;
}

export async function sendDiscoveryData(discoveryData: DiscoveryState): Promise<MakeResponse> {
  const cacheKey = cacheService.generateKey(discoveryData);
  const cachedData = cacheService.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const payload = {
    Barriers: discoveryData.currentState.barriers.join('\r\n'),
    'Barriers Financial Impact': discoveryData.currentState.financialImpact,
    'Barriers Personal Impact': discoveryData.currentState.emotionalImpact,
    ClientId: discoveryData.prospectInfo.clientId,
    'Outcome Financial Impact': discoveryData.futureState.financialImpact,
    Outcomes: discoveryData.futureState.desiredOutcomes.join('\r\n'),
    'Outcomes Personal Impact': discoveryData.futureState.emotionalRelief,
    'Prospect Email Address': discoveryData.prospectInfo.email,
    'Prospect First Name': discoveryData.prospectInfo.firstName,
    'Prospect Last Name': discoveryData.prospectInfo.lastName,
    Solution: discoveryData.solution,
    Urgency: discoveryData.currentState.targetDate
  };

  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const result = parseMakeResponse(data);
  
  cacheService.set(cacheKey, result);
  return result;
}