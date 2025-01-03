import { useState, useCallback } from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { useStageValidation } from './useStageValidation';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { transformFromApiFormat } from '../../services/make/transformers';

export function useDiscoveryProgress() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    stage, 
    setStage, 
    discovery, 
    updateAISummary, 
    setSessionId,
    setShowError,
    setSolutionResponse
  } = useDiscoveryStore(state => ({
    stage: state.discovery.stage,
    setStage: state.setStage,
    discovery: state.discovery,
    updateAISummary: state.updateAISummary,
    setSessionId: state.setSessionId,
    setShowError: state.setShowError,
    setSolutionResponse: state.setSolutionResponse
  }));

  const validation = useStageValidation();

  const handleProgress = useCallback(async () => {
    console.log('🎯 handleProgress called at stage:', stage);
    console.log('📊 Current discovery state:', {
      stage,
      solution: discovery.solution,
      isStage4: stage === 4,
      hasSolution: !!discovery.solution
    });

    setError(null);
    setIsProcessing(true);
    
    try {
      switch (stage) {
        case 1: {
          console.log('Stage 1: Validating prospect info');
          console.log('Checking required fields:', {
            industryType: discovery.prospectInfo.industryType,
            companySize: discovery.prospectInfo.companySize,
            urgencyLevel: discovery.prospectInfo.urgencyLevel
          });

          if (!discovery.prospectInfo.industryType || 
              !discovery.prospectInfo.companySize || 
              !discovery.prospectInfo.urgencyLevel) {
            setShowError(true);
            throw new Error('Please complete all required fields before proceeding');
          }
          
          validation.validateProspectInfo(discovery.prospectInfo);
          setStage(2);
          break;
        }
        
        case 2: {
          console.log('Stage 2: Validating current state');
          validation.validateCurrentState(discovery.currentState.barriers);
          setStage(3);
          break;
        }
        
        case 3: {
          console.log('Stage 3: Sending discovery data');
          const response = await sendDiscoveryData(discovery);
          
          const transformedData = transformFromApiFormat(response);
          updateAISummary(transformedData);
          
          setStage(4);
          break;
        }

        case 4: {
          console.log('Stage 4: Checking solution before generation');
          console.log('Current solution:', discovery.solution);
          
          if (!discovery.solution) {
            console.log('No solution selected - throwing error');
            setShowError(true);
            throw new Error('Please select a solution before proceeding');
          }
        
          console.log('Solution is selected, proceeding with generation');
          const response = await generateSolution(discovery);
          setSolutionResponse(response);
          setSessionId(response.sessionId);
          setStage(5);
          break;
        }

        case 5: {
          console.log('Stage 5: Moving to final stage');
          setStage(6);
          break;
        }

      case 6: {
        console.log('Stage 6: Completing discovery session');
        // No additional validation needed at this stage
        // Just return true to allow StageNavigation to handle session creation
        return true;
      }
    
      default: {
        console.log('Unknown stage:', stage);
        throw new Error('Invalid stage');
      }
    }

      console.log('✅ Stage navigation successful');
      return true;
    } catch (error) {
      console.error('🔴 Navigation error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [stage, discovery, validation, setStage, updateAISummary, setSessionId, setShowError, setSolutionResponse]);

  const handleBack = useCallback(() => {
    console.log('⬅️ Handling back navigation from stage:', stage);
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