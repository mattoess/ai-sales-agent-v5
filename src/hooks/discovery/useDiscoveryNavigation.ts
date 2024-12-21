import { useState } from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { useStageValidation } from './useStageValidation';
import { useUser } from '@clerk/clerk-react';

export function useDiscoveryNavigation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  
  const { stage, setStage, discovery, updateAISummary, setSessionId } = useDiscoveryStore();
  const validation = useStageValidation();

  const handleNext = async () => {
    setError(null);
    
    try {
      switch (stage) {
        case 1:
          validation.validateProspectInfo(discovery.prospectInfo);
          setStage(2);
          break;

        case 2:
          validation.validateCurrentState(discovery.currentState.barriers);
          setStage(3);
          break;

        case 3:
          validation.validateFutureState(discovery.futureState.desiredOutcomes);
          setIsLoading(true);
          
          const discoveryResponse = await sendDiscoveryData(discovery);
          updateAISummary({
            currentState: {
              barrierThemes: discoveryResponse.current_state.barrier_themes,
              emotionalThemes: discoveryResponse.current_state.emotional_impact,
              urgencyStatement: discoveryResponse.current_state.financial_risk
            },
            futureState: {
              outcomeThemes: discoveryResponse.future_state.desired_outcomes,
              emotionalImpactThemes: discoveryResponse.future_state.emotional_relief,
              financialImpactStatement: discoveryResponse.future_state.financial_impact
            }
          });
          
          setStage(4);
          break;

        case 4:
          validation.validateSessionName(discovery.sessionName);
          setIsLoading(true);
          
          const solutionResponse = await generateSolution(discovery);
          setSessionId(solutionResponse.sessionId);
          updateAISummary({
            solution: {
              description: solutionResponse.solution_description,
              testimonials: solutionResponse.testimonials
            }
          });
          
          setStage(5);
          break;

        case 5:
          setStage(6);
          break;
      }
    } catch (error) {
      console.error('Navigation error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousStage = () => {
    if (stage > 1) setStage(stage - 1);
    setError(null);
  };

  return {
    isLoading,
    error,
    handleNext,
    goToPreviousStage,
    stage,
  };
}