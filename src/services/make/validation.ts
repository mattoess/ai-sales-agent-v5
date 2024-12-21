import { DiscoveryResponse, SolutionResponse } from './types';

export function validateDiscoveryResponse(data: any): data is DiscoveryResponse {
  return (
    data &&
    data.current_state?.barrier_themes &&
    Array.isArray(data.current_state.barrier_themes) &&
    data.current_state?.emotional_impact &&
    Array.isArray(data.current_state.emotional_impact) &&
    typeof data.current_state?.financial_risk === 'string' &&
    data.future_state?.desired_outcomes &&
    Array.isArray(data.future_state.desired_outcomes) &&
    data.future_state?.emotional_relief &&
    Array.isArray(data.future_state.emotional_relief) &&
    typeof data.future_state?.financial_impact === 'string'
  );
}

export function validateSolutionResponse(data: any): data is SolutionResponse {
  return (
    data &&
    typeof data.solution_description === 'string' &&
    Array.isArray(data.testimonials) &&
    typeof data.sessionId === 'string'
  );
}