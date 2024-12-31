import { useCallback } from 'react';
import { DiscoveryState } from '../../types/discovery';
import { sendDiscoveryData } from '../../services/make/discoveryService';
import { generateSolution } from '../../services/make/solutionService';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { transformFromApiFormat } from '../../services/make/transformers';

export function useMakeWebhooks() {
  const { updateAISummary, setSessionId, setSolutionResponse } = useDiscoveryStore();

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
      console.log('processSolution - Input discoveryData:', discoveryData);
      
      const response = await generateSolution(discoveryData);
    
      console.log('processSolution - Generated Solution Response:', response);
    
      // Add more detailed logging
      console.log('processSolution - Before setSolutionResponse');
      setSolutionResponse(response);
      console.log('processSolution - After setSolutionResponse');
      
      setSessionId(response.sessionId);

      return true;
    } catch (error) {
      console.error('Error processing solution:', error);
      return false;
    }
  }, [setSolutionResponse, setSessionId]);

  return {
    processDiscovery,
    processSolution
  };
}