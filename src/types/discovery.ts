export interface DiscoveryResponse {
  current_state: {
    barrier_themes?: string[];
    emotions: string[];
    financial_risk?: string;
  };
  future_state: {
    outcome_themes?: string[];
    emotions: string[];
    financial_impact?: string;
  };
}

export interface ProspectInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  clientId?: string;
  userId?: string;
  industryType?: string;
  companySize?: number;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

export interface SolutionResponse {
  solution_description: {
    transformation_journey: {
      current_state: string[];
      gap_analysis: string[];
      future_state: string[];
    };
    solution_architecture: {
      core_components: string[];
      implementation_approach: string[];
    };
    value_proposition: {
      business_impact: string[];
      emotional_impact: string[];
      risk_mitigation: string[];
    };
    investment_summary: {
      pricing_structure: string[];
      roi_projection: string[];
      timing_considerations: string[];
    };
  };
  testimonials: string[];
  sessionId: string;
}

export interface DiscoveryState {
  currentState: {
    barriers: string[];
    financialImpact: string;
    targetDate: string;
    emotionalImpact: string;
  };
  futureState: {
    desiredOutcomes: string[];
    financialImpact: string;
    emotionalRelief: string;
  };
  stage: number;
  prospectInfo: ProspectInfo;
  solution: string;
  sessionName: string;
  sessionId?: string;
  aiSummary: {
    currentState: {
      barrierThemes: string[];
      emotionalThemes: string[];
      urgencyStatement: string;
    };
    futureState: {
      outcomeThemes: string[];
      emotionalImpactThemes: string[];
      financialImpactStatement: string;
    };
    solution?: SolutionResponse['solution_description'];
  };
}

export interface DiscoverySession extends Omit<DiscoveryState, 'stage'> {
  id: string;
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  userId: string;
  companyId: string;
}