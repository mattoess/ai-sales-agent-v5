// src/types/discovery.ts

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
  companySize?: string;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

export interface SolutionResponse {
  solution_description: {
    transformation_journey: {
      current_situation: string;  // HTML string with section-title and section-text classes
      challenges: string;         // HTML string with section-title and component-list/item classes
      vision: string;            // HTML string with section-title and section-text classes
    };
    solution_recommendation: {    // Changed from solution_architecture
      overview: string;          // HTML string with section-title and section-text classes
      key_components: string;    // HTML string with section-title and component-list/item classes
      approach: string;          // HTML string with section-title and approach-steps/step-text classes
    };
    value_proposition: {
      business_outcomes: string;  // HTML string with section-title and section-text classes
      personal_benefits: string;  // HTML string with section-title and benefits-list/item classes
      risk_mitigation: string;   // HTML string with section-title and risk-list/item classes
    };
    investment_summary: {
      pricing_model: string;     // HTML string with section-title and section-text classes
      roi_analysis: string;      // HTML string with section-title and section-text classes
      timeline: string;          // HTML string with section-title and flexible format
    };
  };
  testimonials: {
    caseSituation1: string;   // HTML: <div class='case-study'><h3 class='case-title'>Similar Situation</h3><p class='case-text'>[situation]</p></div>
    caseSolution1: string;    // HTML: <div class='case-study'><h3 class='case-title'>Solution Implementation</h3>
                             //       <p class='case-text'>[solution]</p><ul class='component-list'><li class='component-item'>[elements]</li></ul></div>
    caseValue1: string;       // HTML: <div class='case-study'><h3 class='case-title'>Results & Impact</h3>
                             //       <p class='case-text'>[results]</p><ul class='benefits-list'><li class='benefit-item'>[benefits]</li></ul></div>
    caseSituation2: string;   // HTML: Same structure as caseSituation1
    caseSolution2: string;    // HTML: Same structure as caseSolution1
    caseValue2: string;       // HTML: Same structure as caseValue1
  };
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