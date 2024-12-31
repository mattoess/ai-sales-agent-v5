// src/services/make/types.ts

// Import the SolutionResponse type from discovery.ts
import { SolutionResponse } from '../../types/discovery';

// Re-export it for any files currently importing from here
export type { SolutionResponse };

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

export interface DiscoveryState {
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
    };
}

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

export interface DiscoverySession extends Omit<DiscoveryState, 'stage'> {
    id: string;
    status: 'draft' | 'in_progress' | 'completed';
    createdAt: string;
    updatedAt: string;
    userId: string;
    companyId: string;
}