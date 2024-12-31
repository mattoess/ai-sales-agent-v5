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

    // Validation for string fields
    const requiredStrings = [
      sd.transformation_journey.current_situation,
      sd.transformation_journey.vision,
      sd.solution_recommendation.overview,
      sd.value_proposition.business_outcomes,
      sd.investment_summary.pricing_model,
      sd.investment_summary.roi_analysis,
      response.testimonials.caseSituation1,
      response.testimonials.caseSituation2,
      response.sessionId
    ];

    // Validate string fields
    const stringValidation = requiredStrings.every((field: string) => typeof field === 'string');

    // Validate array fields
    const arrayValidation = (
      Array.isArray(sd.transformation_journey.challenges) &&
      Array.isArray(sd.solution_recommendation.key_components) &&
      Array.isArray(sd.solution_recommendation.approach) &&
      Array.isArray(sd.value_proposition.personal_benefits) &&
      Array.isArray(sd.value_proposition.risk_mitigation) &&
      Array.isArray(sd.investment_summary.timeline) &&
      Array.isArray(response.testimonials.caseSolution1) &&
      Array.isArray(response.testimonials.caseValue1) &&
      Array.isArray(response.testimonials.caseSolution2) &&
      Array.isArray(response.testimonials.caseValue2)
    );

    // Additional validation to ensure array elements are strings
    const arrayElementValidation = (
      sd.transformation_journey.challenges.every((item: unknown) => typeof item === 'string') &&
      sd.solution_recommendation.key_components.every((item: unknown) => typeof item === 'string') &&
      sd.solution_recommendation.approach.every((item: unknown) => typeof item === 'string') &&
      sd.value_proposition.personal_benefits.every((item: unknown) => typeof item === 'string') &&
      sd.value_proposition.risk_mitigation.every((item: unknown) => typeof item === 'string') &&
      sd.investment_summary.timeline.every((item: unknown) => typeof item === 'string') &&
      response.testimonials.caseSolution1.every((item: unknown) => typeof item === 'string') &&
      response.testimonials.caseValue1.every((item: unknown) => typeof item === 'string') &&
      response.testimonials.caseSolution2.every((item: unknown) => typeof item === 'string') &&
      response.testimonials.caseValue2.every((item: unknown) => typeof item === 'string')
    );

    return stringValidation && arrayValidation && arrayElementValidation;
    
  } catch (error) {
    // If any access to properties fails, validation fails
    return false;
  }
}
