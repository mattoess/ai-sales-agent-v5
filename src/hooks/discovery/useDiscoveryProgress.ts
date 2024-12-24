import { useState, useCallback } from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { useStageValidation } from './useStageValidation';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { transformFromApiFormat } from '../../services/make/transformers'; // Add this import

export function useDiscoveryProgress() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    stage, 
    setStage, 
    discovery, 
    updateAISummary, 
    setSessionId 
  } = useDiscoveryStore(state => ({
    stage: state.discovery.stage,
    setStage: state.setStage,
    discovery: state.discovery,
    updateAISummary: state.updateAISummary,
    setSessionId: state.setSessionId
  }));

  const validation = useStageValidation();

  const handleProgress = useCallback(async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      switch (stage) {
        case 1: {
          validation.validateProspectInfo(discovery.prospectInfo);
          setStage(2);
          break;
        }
        
        case 2: {
          validation.validateCurrentState(discovery.currentState.barriers);
          setStage(3);
          break;
        }
        
        case 3: {
          const response = await sendDiscoveryData(discovery);
          
          // Use the transformer for consistent mapping
          const transformedData = transformFromApiFormat(response);
          updateAISummary(transformedData);
          
          setStage(4);
          break;
        }

        case 4: {
          const response = await generateSolution(discovery);
          setSessionId(response.sessionId);
          updateAISummary({
            solution: {
              description: response.solution_description,
              testimonials: response.testimonials
            }
          });
          setStage(5);
          break;
        }

        case 5: {
          setStage(6);
          break;
        }
      }

      return true;
    } catch (error) {
      console.error('Navigation error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [stage, discovery, validation, setStage, updateAISummary, setSessionId]);

  const handleBack = useCallback(() => {
    if (stage > 1) {
      setStage(stage - 1);
      setError(null);
    }
  }, [stage, setStage]);

  return {
    isProcessing,
    error,
    handleProgress,
    handleBack,
    stage
  };
}