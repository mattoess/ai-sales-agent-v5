import { useCallback } from 'react';
import { DiscoveryState } from '../../types/discovery';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { transformFromApiFormat } from '../../services/make/transformers';

export function useMakeWebhooks() {
  const { updateAISummary, setSessionId } = useDiscoveryStore();

  const processDiscovery = useCallback(async (discoveryData: DiscoveryState) => {
    try {
      const response = await sendDiscoveryData(discoveryData);
      const transformedData = transformFromApiFormat(response);
      
      updateAISummary(transformedData);

      return true;
    } catch (error) {
      console.error('Error processing discovery:', error);
      return false;
    }
  }, [updateAISummary]);

  const processSolution = useCallback(async (discoveryData: DiscoveryState) => {
    try {
      const response = await generateSolution(discoveryData);
      
      setSessionId(response.sessionId);
      // updateAISummary({
      //   solution: response.solution_description
      // });

      return true;
    } catch (error) {
      console.error('Error processing solution:', error);
      return false;
    }
  }, [setSessionId, updateAISummary]);

  return {
    processDiscovery,
    processSolution
  };
}