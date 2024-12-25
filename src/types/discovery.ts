

export interface ProspectInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  clientId?: string;      // Optional Airtable/system client identifier
  userId?: string;        // Optional Clerk user identifier
  industryType?: string;  // New optional field
  companySize?: number;   // New optional field
  urgencyLevel?: 'low' | 'medium' | 'high'; // New optional field
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
    solution?: {
      description: string;
      testimonials: string[];
    };
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