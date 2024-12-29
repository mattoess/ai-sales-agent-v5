// src/services/make/solutionService.ts

import { DiscoveryState, SolutionResponse } from '../../types/discovery';
import { makeApiRequest } from './api';
import { ValidationError } from './errors';
import { validateSolutionResponse } from './validation';
import { solutionCache, getCacheKey } from './cache';
import { MAKE_CONFIG } from './config';
import { transformToApiFormatForSolution } from './transformers';

// Type for Make.com webhook response
type SolutionWebhookResponse = {
  solution_description: {
    transformation_journey: {
      current_situation: string;
      challenges: string;
      vision: string;
    };
    solution_recommendation: {
      overview: string;
      key_components: string;
      approach: string;
    };
    value_proposition: {
      business_outcomes: string;
      personal_benefits: string;
      risk_mitigation: string;
    };
    investment_summary: {
      pricing_model: string;
      roi_analysis: string;
      timeline: string;
    };
  };
  testimonials: {
    caseSituation1: string;
    caseSolution1: string;
    caseValue1: string;
    caseSituation2: string;
    caseSolution2: string;
    caseValue2: string;
  };
  sessionId: string;
};

function isSolutionWebhookResponse(data: unknown): data is SolutionWebhookResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'solution_description' in data &&
    'testimonials' in data &&
    'sessionId' in data
  );
}

function parseSolutionDescription(response: SolutionWebhookResponse): SolutionResponse {
  return {
    solution_description: {
      transformation_journey: {
        current_situation: response.solution_description?.transformation_journey?.current_situation || '',
        challenges: response.solution_description?.transformation_journey?.challenges || '',
        vision: response.solution_description?.transformation_journey?.vision || ''
      },
      solution_recommendation: {
        overview: response.solution_description?.solution_recommendation?.overview || '',
        key_components: response.solution_description?.solution_recommendation?.key_components || '',
        approach: response.solution_description?.solution_recommendation?.approach || ''
      },
      value_proposition: {
        business_outcomes: response.solution_description?.value_proposition?.business_outcomes || '',
        personal_benefits: response.solution_description?.value_proposition?.personal_benefits || '',
        risk_mitigation: response.solution_description?.value_proposition?.risk_mitigation || ''
      },
      investment_summary: {
        pricing_model: response.solution_description?.investment_summary?.pricing_model || '',
        roi_analysis: response.solution_description?.investment_summary?.roi_analysis || '',
        timeline: response.solution_description?.investment_summary?.timeline || ''
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

    const apiData = transformToApiFormatForSolution(discoveryData);

    const responseData = await makeApiRequest<SolutionWebhookResponse>(
      MAKE_CONFIG.urls.solution,
      apiData,
      isSolutionWebhookResponse,
      MAKE_CONFIG.timeouts.solution
    );
    
    if (!responseData) {
      throw new ValidationError('No response received from Make.com solution webhook');
    }

    if (!validateSolutionResponse(responseData)) {
      throw new ValidationError('Invalid solution data structure');
    }

    const parsedSolution = parseSolutionDescription(responseData);
    
    solutionCache.set(cacheKey, parsedSolution);
    return parsedSolution;

  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error in solution service:', error.message);
      throw error;
    }
    
    console.error('Error in solution service:', error);
    throw new ValidationError('Failed to generate solution');
  }
}