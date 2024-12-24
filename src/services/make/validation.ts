// validation.ts
import { DiscoveryResponse, SolutionResponse } from './types';

export function validateDiscoveryResponse(data: unknown): data is DiscoveryResponse {
  if (!data || typeof data !== 'object') return false;
  
  const response = data as DiscoveryResponse;
  
  // Check current_state
  if (!response.current_state || typeof response.current_state !== 'object') return false;
  
  if (!Array.isArray(response.current_state.barrier_themes)) return false;
  if (!Array.isArray(response.current_state.emotions)) return false;        // Changed from emotional_impact
  if (typeof response.current_state.financial_risk !== 'string') return false;
  
  // Check future_state
  if (!response.future_state || typeof response.future_state !== 'object') return false;
  
  if (!Array.isArray(response.future_state.outcome_themes)) return false;   // Changed from desired_outcomes
  if (!Array.isArray(response.future_state.emotions)) return false;         // Changed from emotional_relief
  if (typeof response.future_state.financial_impact !== 'string') return false;
  
  return true;
}

export function validateSolutionResponse(data: unknown): data is SolutionResponse {
  if (!data || typeof data !== 'object') return false;
  
  const response = data as SolutionResponse;
  
  return (
    typeof response.solution_description === 'string' &&
    Array.isArray(response.testimonials) &&
    typeof response.sessionId === 'string'
  );
}