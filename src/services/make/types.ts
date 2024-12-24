// types.ts
export interface DiscoveryResponse {
  current_state: {
    barrier_themes: string[];
    emotions: string[];
    financial_risk: string;
  };
  future_state: {
    outcome_themes: string[];
    emotions: string[];
    financial_impact: string;
  };
}

export interface SolutionResponse {
  solution_description: string;
  testimonials: string[];
  sessionId: string;
}