// validation.ts
import { DiscoveryResponse, SolutionResponse } from './types';

export function validateDiscoveryResponse(data: unknown): data is DiscoveryResponse {
  if (!data || typeof data !== 'object') return false;
  
  const response = data as DiscoveryResponse;
  
  // Check current_state
  if (!response.current_state || typeof response.current_state !== 'object') return false;
  
  if (!Array.isArray(response.current_state.barrier_themes)) return false;
  if (!Array.isArray(response.current_state.emotions)) return false;
  if (typeof response.current_state.financial_risk !== 'string') return false;
  
  // Check future_state
  if (!response.future_state || typeof response.future_state !== 'object') return false;
  
  if (!Array.isArray(response.future_state.outcome_themes)) return false;
  if (!Array.isArray(response.future_state.emotions)) return false;
  if (typeof response.future_state.financial_impact !== 'string') return false;
  
  return true;
}

export function validateSolutionResponse(data: unknown): data is SolutionResponse {
  if (!data || typeof data !== 'object') return false;
  
  const response = data as any;
  
  try {
    // Check base structure
    if (!response.solution_description || !response.testimonials || !response.sessionId) {
      return false;
    }

    // Check solution_description sections exist
    const sd = response.solution_description;
    if (!sd.transformation_journey || !sd.solution_recommendation || 
        !sd.value_proposition || !sd.investment_summary) {
      return false;
    }

    // Check all required string fields
    const requiredStrings = [
      sd.transformation_journey.current_situation,
      sd.transformation_journey.challenges,
      sd.transformation_journey.vision,
      sd.solution_recommendation.overview,
      sd.solution_recommendation.key_components,
      sd.solution_recommendation.approach,
      sd.value_proposition.business_outcomes,
      sd.value_proposition.personal_benefits,
      sd.value_proposition.risk_mitigation,
      sd.investment_summary.pricing_model,
      sd.investment_summary.roi_analysis,
      sd.investment_summary.timeline,
      response.testimonials.caseSituation1,
      response.testimonials.caseSolution1,
      response.testimonials.caseValue1,
      response.testimonials.caseSituation2,
      response.testimonials.caseSolution2,
      response.testimonials.caseValue2,
      response.sessionId
    ];

    return requiredStrings.every(field => typeof field === 'string');
    
  } catch (error) {
    // If any access to properties fails, validation fails
    return false;
  }
}
