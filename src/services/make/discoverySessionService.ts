// src/services/make/discoverySessionService.ts
import { MAKE_CONFIG } from './config';
import { makeApiRequest } from './api';
import { DiscoveryState, SolutionResponse, DiscoverySession } from '../../types/discovery';
import { Session } from '../../types/session';
import { ValidationError } from './errors';

// Session webhook response types
interface SessionCreateResponse {
  success: boolean;
  data: {
    session: Session;
    id: string;
    status: 'created';
  };
}

interface SessionLoadResponse {
  success: boolean;
  data: {
    session: Session;
    discoveryState: DiscoveryState;
    solution: SolutionResponse;
  };
}

// Validation functions
const validateSolutionResponse = (data: unknown): data is {body: any, status: number, headers: any[]} => {
  return typeof data === 'object' && data !== null && 
         'body' in data && 'status' in data && 'headers' in data;
};

const validateSessionCreateResponse = (data: unknown): data is SessionCreateResponse => {
  return typeof data === 'object' && data !== null &&
    'success' in data &&
    'data' in data &&
    typeof (data as any).data === 'object' &&
    'session' in (data as any).data &&
    'id' in (data as any).data &&
    'status' in (data as any).data;
};

const validateSessionLoadResponse = (data: unknown): data is SessionLoadResponse => {
  return typeof data === 'object' && data !== null &&
    'success' in data &&
    'data' in data &&
    typeof (data as any).data === 'object' &&
    'session' in (data as any).data &&
    'discoveryState' in (data as any).data &&
    'solution' in (data as any).data;
};

// Helper functions
const calculateSessionDuration = (discoveryState: DiscoveryState): string => {
    try {
      if (!discoveryState.startTime) {
        return "0:05"; // Default 5 minutes
      }
      const startTime = new Date(discoveryState.startTime);
      if (isNaN(startTime.getTime())) {
        return "0:05";
      }
      const endTime = new Date();
      const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      
      // Format as h:mm
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error calculating session duration:', error);
      return "0:05";
    }
  };

function parseSolutionDescription(response: any): SolutionResponse {
  return {
    solution_description: {
      transformation_journey: {
        current_situation: response.transformation_journey?.current_situation || '',
        challenges: response.transformation_journey?.challenges || [],
        vision: response.transformation_journey?.vision || ''
      },
      solution_recommendation: {
        overview: response.solution_recommendation?.overview || '',
        key_components: response.solution_recommendation?.key_components || [],
        approach: response.solution_recommendation?.approach || []
      },
      value_proposition: {
        business_outcomes: response.value_proposition?.business_outcomes || '',
        personal_benefits: response.value_proposition?.personal_benefits || [],
        risk_mitigation: response.value_proposition?.risk_mitigation || []
      },
      investment_summary: {
        pricing_model: response.investment_summary?.pricing_model || '',
        roi_analysis: response.investment_summary?.roi_analysis || '',
        timeline: response.investment_summary?.timeline || []
      }
    },
    testimonials: {
      caseSituation1: '',
      caseSolution1: [''],
      caseValue1: [''],
      caseSituation2: '',
      caseSolution2: [''],
      caseValue2: ['']
    },
    sessionId: response.sessionId || Date.now().toString()
  };
}

// Main exported functions
export const generateSolution = async (
  discoveryState: DiscoveryState
): Promise<SolutionResponse> => {
  try {
    const payload = {
      barrier_themes: discoveryState.aiSummary.currentState.barrierThemes,
      emotional_impact: discoveryState.aiSummary.currentState.emotionalThemes,
      financial_risk: discoveryState.aiSummary.currentState.urgencyStatement,
      desired_outcomes: discoveryState.aiSummary.futureState.outcomeThemes,
      emotional_relief: discoveryState.aiSummary.futureState.emotionalImpactThemes,
      financial_impact: discoveryState.aiSummary.futureState.financialImpactStatement,
      
      current_state: {
        barrier_themes: discoveryState.currentState.barriers,
        emotions: [discoveryState.currentState.emotionalImpact],
        financial_risk: discoveryState.currentState.financialImpact
      },
      future_state: {
        outcome_themes: discoveryState.futureState.desiredOutcomes,
        emotions: [discoveryState.futureState.emotionalRelief],
        financial_impact: discoveryState.futureState.financialImpact
      },

      firstName: discoveryState.prospectInfo.firstName,
      lastName: discoveryState.prospectInfo.lastName,
      email: discoveryState.prospectInfo.email,
      companyName: discoveryState.prospectInfo.companyName,
      clientId: discoveryState.prospectInfo.clientId,
      userId: discoveryState.prospectInfo.userId,
      industryType: discoveryState.prospectInfo.industryType,
      companySize: discoveryState.prospectInfo.companySize?.toString(),
      urgencyLevel: discoveryState.prospectInfo.urgencyLevel,
      
      sessionName: discoveryState.sessionName,
      solution: discoveryState.solution,
      sessionId: discoveryState.sessionId
    };

    const response = await makeApiRequest(
      MAKE_CONFIG.urls.solution,
      payload,
      validateSolutionResponse,
      MAKE_CONFIG.timeouts.solution,
      MAKE_CONFIG.retry.maxAttempts
    );

    if (!response) {
      throw new ValidationError('No response received from solution endpoint');
    }

    return parseSolutionDescription(response.body);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new Error('Failed to generate solution');
  }
};

export const createSession = async (
    discoveryState: DiscoveryState,
    solution: SolutionResponse
  ): Promise<Session> => {
    console.log('🚀 Creating session - Starting process');
    console.log('📝 Discovery State:', discoveryState);
    console.log('💡 Solution:', solution);
  
    const session: Session = {
      id: crypto.randomUUID(),
      prospectName: `${discoveryState.prospectInfo?.firstName || ''} ${discoveryState.prospectInfo?.lastName || ''}`.trim() || 'Unknown',
      companyName: discoveryState.prospectInfo?.companyName || 'Unknown',
      status: 'completed',
      date: new Date().toISOString(),
      duration: calculateSessionDuration(discoveryState),
      assignedUser: discoveryState.prospectInfo?.userId || 'Unknown',
    };
  
    console.log('📋 Created session object:', session);
    console.log('🌐 Preparing to send to webhook:', MAKE_CONFIG.urls.createSession);
  
    try {
      const response = await makeApiRequest(
        MAKE_CONFIG.urls.createSession,
        { session, discoveryState, solution },
        validateSessionCreateResponse,
        MAKE_CONFIG.timeouts.createSession,
        MAKE_CONFIG.retry.maxAttempts
      );
  
      console.log('📨 Webhook response:', response);
  
      if (!response || !response.success) {
        console.error('❌ Failed to create session:', response);
        throw new Error('Failed to create session');
      }
  
      console.log('✅ Session created successfully');
      return session;
    } catch (error) {
      console.error('💥 Error in createSession:', error);
      throw error;
    }
  };
  
  export const loadSession = async (sessionId: string): Promise<DiscoverySession> => {
    console.log('🔍 Loading session:', sessionId);
    
    const response = await makeApiRequest(
      MAKE_CONFIG.urls.loadSession,
      { sessionId },
      validateSessionLoadResponse,
      MAKE_CONFIG.timeouts.loadSession,
      MAKE_CONFIG.retry.maxAttempts
    );
  
    if (!response || !response.success) {
      console.error('❌ Failed to load session:', response);
      throw new Error('Failed to load session');
    }
  
    console.log('✅ Session loaded successfully');
    
    return {
      ...response.data.discoveryState,
      id: sessionId,
      status: 'completed',
      createdAt: response.data.session.date,
      updatedAt: new Date().toISOString(),
      userId: response.data.session.assignedUser,
      companyId: response.data.session.companyName
    };
  };