import { DiscoveryState } from '../../types/discovery';
import { SolutionResponse } from './types';
import { validateSolutionResponse } from './validation';
import { makeApiRequest } from './api';
import { ValidationError } from './errors';
import { solutionCache, getCacheKey } from './cache';

export async function generateSolution(discoveryData: DiscoveryState): Promise<SolutionResponse> {
  try {
    const cacheKey = getCacheKey(discoveryData);
    const cached = solutionCache.get(cacheKey);
    if (cached) return cached;

    const payload = {
      barrier_themes: discoveryData.aiSummary.currentState.barrierThemes,
      emotional_impact: discoveryData.aiSummary.currentState.emotionalThemes,
      financial_risk: discoveryData.aiSummary.currentState.urgencyStatement,
      desired_outcomes: discoveryData.aiSummary.futureState.outcomeThemes,
      emotional_relief: discoveryData.aiSummary.futureState.emotionalImpactThemes,
      financial_impact: discoveryData.aiSummary.futureState.financialImpactStatement,
      firstName: discoveryData.prospectInfo.firstName,
      lastName: discoveryData.prospectInfo.lastName,
      email: discoveryData.prospectInfo.email,
      companyName: discoveryData.prospectInfo.companyName,
      sessionName: discoveryData.sessionName,
      solution: discoveryData.solution,
      sessionId: discoveryData.sessionId
    };

    const data = await makeApiRequest<SolutionResponse>('solution', payload, validateSolutionResponse);
    
    if (!data) {
      throw new ValidationError('No data received from Make.com solution webhook');
    }

    solutionCache.set(cacheKey, data);
    return data;

  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error in generateSolution:', error.message);
      throw error;
    }
    
    console.error('Error in generateSolution:', error);
    throw new ValidationError('Failed to generate solution');
  }
}