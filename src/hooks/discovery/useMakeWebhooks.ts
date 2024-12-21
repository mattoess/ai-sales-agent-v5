import { useCallback } from 'react';
import { DiscoveryState } from '../../types/discovery';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { useDiscoveryErrors } from './useDiscoveryErrors';

export function useMakeWebhooks() {
  const { updateAISummary, setSessionId } = useDiscoveryStore();
  const { handleError } = useDiscoveryErrors();

  const processDiscovery = useCallback(async (discoveryData: DiscoveryState) => {
    try {
      const response = await sendDiscoveryData(discoveryData);
      
      updateAISummary({
        currentState: {
          barrierThemes: response.current_state.barrier_themes,
          emotionalThemes: response.current_state.emotional_impact,
          urgencyStatement: response.current_state.financial_risk
        },
        futureState: {
          outcomeThemes: response.future_state.desired_outcomes,
          emotionalImpactThemes: response.future_state.emotional_relief,
          financialImpactStatement: response.future_state.financial_impact
        }
      });

      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, [updateAISummary, handleError]);

  const processSolution = useCallback(async (discoveryData: DiscoveryState) => {
    try {
      const response = await generateSolution(discoveryData);
      
      setSessionId(response.sessionId);
      updateAISummary({
        solution: {
          description: response.solution_description,
          testimonials: response.testimonials
        }
      });

      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, [setSessionId, updateAISummary, handleError]);

  return {
    processDiscovery,
    processSolution
  };
}