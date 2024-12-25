import { DiscoveryState } from '../../types/discovery';
import { DiscoveryResponse } from '../../types/discovery';  // Ensure this is exported in discovery.ts

export function transformToApiFormat(state: DiscoveryState): DiscoveryResponse {
  return {
    current_state: {
      barrier_themes: state.aiSummary.currentState.barrierThemes,
      emotions: state.aiSummary.currentState.emotionalThemes,
      financial_risk: state.aiSummary.currentState.urgencyStatement,
    },
    future_state: {
      outcome_themes: state.aiSummary.futureState.outcomeThemes,
      emotions: state.aiSummary.futureState.emotionalImpactThemes,
      financial_impact: state.aiSummary.futureState.financialImpactStatement,
    }
  };
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
  
  