// src/services/make/solutionService.ts

import { DiscoveryState, SolutionResponse } from '../../types/discovery';
import { makeApiRequest } from './api';
import { ValidationError } from './errors';
import { solutionCache, getCacheKey } from './cache';

const validateSolutionResponse = (data: unknown): data is {body: any, status: number, headers: any[]} => {
  return typeof data === 'object' && data !== null && 
         'body' in data && 'status' in data && 'headers' in data;
};

function parseSolutionDescription(response: any): SolutionResponse {
  return {
    solution_description: {
      transformation_journey: {
        current_situation: response.transformation_journey?.current_situation || '',
        challenges: response.transformation_journey?.challenges || '',
        vision: response.transformation_journey?.vision || ''
      },
      solution_recommendation: {
        overview: response.solution_recommendation?.overview || '',
        key_components: response.solution_recommendation?.key_components || '',
        approach: response.solution_recommendation?.approach || ''
      },
      value_proposition: {
        business_outcomes: response.value_proposition?.business_outcomes || '',
        personal_benefits: response.value_proposition?.personal_benefits || '',
        risk_mitigation: response.value_proposition?.risk_mitigation || ''
      },
      investment_summary: {
        pricing_model: response.investment_summary?.pricing_model || '',
        roi_analysis: response.investment_summary?.roi_analysis || '',
        timeline: response.investment_summary?.timeline || ''
      }
    },
    testimonials: {
      caseSituation1: response.testimonials?.caseSituation1 || '',
      caseSolution1: response.testimonials?.caseSolution1 || '',
      caseValue1: response.testimonials?.caseValue1 || '',
      caseSituation2: response.testimonials?.caseSituation2 || '',
      caseSolution2: response.testimonials?.caseSolution2 || '',
      caseValue2: response.testimonials?.caseValue2 || ''
    },
    sessionId: response.sessionId || Date.now().toString()
  };
}

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
      clientId: discoveryData.prospectInfo.clientId,
      userId: discoveryData.prospectInfo.userId,
      industryType: discoveryData.prospectInfo.industryType,
      companySize: discoveryData.prospectInfo.companySize,
      urgencyLevel: discoveryData.prospectInfo.urgencyLevel,
      sessionName: discoveryData.sessionName,
      solution: discoveryData.solution,
      sessionId: discoveryData.sessionId
    };

    const apiResponse = await makeApiRequest('solution', payload, validateSolutionResponse);
    
    if (!apiResponse) {
      throw new ValidationError('No data received from Make.com solution webhook');
    }

    const parsedSolution = parseSolutionDescription(apiResponse.body);
    
    solutionCache.set(cacheKey, parsedSolution);
    return parsedSolution;

  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error in generateSolution:', error.message);
      throw error;
    }
    
    console.error('Error in generateSolution:', error);
    throw new ValidationError('Failed to generate solution');
  }
}