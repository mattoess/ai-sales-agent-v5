export interface DiscoveryResponse {
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
}

export interface SolutionResponse {
  solution_description: string;
  testimonials: string[];
  sessionId: string;
}