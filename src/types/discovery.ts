// src/types/discovery.ts

export interface DiscoveryResponse {
  current_state: {
    barrier_themes?: string[]; //These are insightful themes that the AI has identified from the prospect's current situation and barriers
    emotions: string[]; //These are the emotions that the AI has identified from the prospect's current situation
    financial_risk?: string; //This is the financial risk and urgency (based on date that barriers must be removed) that the AI has identified from the prospect's current situation
  };
  future_state: {
    outcome_themes?: string[]; //These are insightful themes that the AI has identified from the prospect's future desired outcomes
    emotions: string[]; //These are the emotions that the AI has identified from the prospect's future desired outcomes
    financial_impact?: string; //This is the financial impact that the AI has identified from the prospect's future desired outcomes once the barriers are removed
  };
}

export interface ProspectInfo {
  firstName: string; //Prospect's first name
  lastName: string; //Prospect's last name
  email: string; //Prospect's email address
  companyName: string; //Prospect's company name
  clientId?: string; // This is the solution provider company and not the prospect
  userId?: string; // This is the solution provider user and not the prospect
  industryType?: string; //Prospect's industry
  companySize?: string; //Prospect's company size
  urgencyLevel?: 'low' | 'medium' | 'high'; //Prospect's urgency level
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