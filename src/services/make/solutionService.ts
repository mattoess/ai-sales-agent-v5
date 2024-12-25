import { DiscoveryState, SolutionResponse } from '../../types/discovery';
import { makeApiRequest } from './api';  // Ensure this path is correct
import { ValidationError } from './errors';
import { solutionCache, getCacheKey } from './cache';

// Placeholder validation function
const validateSolutionResponse = (data: unknown): data is {body: string, status: number, headers: any[]} => {
  return typeof data === 'object' && data !== null && 
         'body' in data && 'status' in data && 'headers' in data;
};

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

    const apiResponse = await makeApiRequest<{body: string, status: number, headers: any[]}>('solution', payload, validateSolutionResponse);
    
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

function parseSolutionDescription(xmlString: string): SolutionResponse {
  const parseSection = (sectionName: string): string[] => {
    const regex = new RegExp(`<${sectionName}>(.*?)<\/${sectionName}>`, 'gs');
    const match = xmlString.match(regex);
    if (!match) return [];
    
    return match[0]
      .replace(`<${sectionName}>`, '')
      .replace(`</${sectionName}>`, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('<'));
  };

  return {
    solution_description: {
      transformation_journey: {
        current_state: parseSection('current_state'),
        gap_analysis: parseSection('gap_analysis'),
        future_state: parseSection('future_state')
      },
      solution_architecture: {
        core_components: parseSection('core_components'),
        implementation_approach: parseSection('implementation_approach')
      },
      value_proposition: {
        business_impact: parseSection('business_impact'),
        emotional_impact: parseSection('emotional_impact'),
        risk_mitigation: parseSection('risk_mitigation')
      },
      investment_summary: {
        pricing_structure: parseSection('pricing_structure'),
        roi_projection: parseSection('roi_projection'),
        timing_considerations: parseSection('timing_considerations')
      }
    },
    testimonials: [], 
    sessionId: Date.now().toString()
  };
}