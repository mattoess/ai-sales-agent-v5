import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from '../../types/discovery';  // Ensure this is exported in discovery.ts

// No transformation needed for discovery payload
export function transformToApiFormatForDiscovery(state: DiscoveryState): DiscoveryState {
  return state;
}

export function transformFromApiFormat(response: DiscoveryResponse): Partial<DiscoveryState['aiSummary']> {
  return {
    currentState: {
      barrierThemes: response.current_state.barrier_themes || [],
      emotionalThemes: response.current_state.emotions,
      urgencyStatement: response.current_state.financial_risk || '',
    },
    futureState: {
      outcomeThemes: response.future_state.outcome_themes || [],
      emotionalImpactThemes: response.future_state.emotions,
      financialImpactStatement: response.future_state.financial_impact || '',
    }
  };
}

// Transformation for solution payload
export function transformToApiFormatForSolution(discoveryData: DiscoveryState): any {
  return {
    barriers: discoveryData.currentState.barriers,
      financialImpact: discoveryData.currentState.financialImpact,
      targetDate: discoveryData.currentState.targetDate,
      emotionalImpact: discoveryData.currentState.emotionalImpact,
      desiredOutcomes: discoveryData.futureState.desiredOutcomes,
      finacialImpact: discoveryData.futureState.financialImpact,
      emotionalRelief: discoveryData.futureState.emotionalRelief,
      barrier_themes: discoveryData.aiSummary.currentState.barrierThemes,
      emotional_impact: discoveryData.aiSummary.currentState.emotionalThemes,
      financial_risk: discoveryData.aiSummary.currentState.urgencyStatement,
      desired_outcomes: discoveryData.aiSummary.futureState.outcomeThemes,
      emotional_relief: discoveryData.aiSummary.futureState.emotionalImpactThemes,
      financial_impact: discoveryData.aiSummary.futureState.financialImpactStatement,
      firstName: discoveryData.prospectInfo.firstName,
      lastName: discoveryData.prospectInfo.lastName,
      email: discoveryData.prospectInfo.email,
      companyName: discoveryData.prospectInfo.companyName,
      clientId: discoveryData.prospectInfo.clientId,
      userId: discoveryData.prospectInfo.userId,
      industryType: discoveryData.prospectInfo.industryType,
      companySize: discoveryData.prospectInfo.companySize,
      urgencyLevel: discoveryData.prospectInfo.urgencyLevel,
      sessionName: discoveryData.sessionName,
      solution: discoveryData.solution,
      sessionId: discoveryData.sessionId
  };
}