import { useState, useCallback } from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { useStageValidation } from './useStageValidation';
import { useMakeWebhooks } from './useMakeWebhooks';

export function useStageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const { stage, setStage, discovery } = useDiscoveryStore();
  const validation = useStageValidation();
  const { processDiscovery, processSolution } = useMakeWebhooks();

  const handleTransition = useCallback(async () => {
    setIsLoading(true);
    let success = true;

    try {
      switch (stage) {
        case 1:
          validation.validateProspectInfo(discovery.prospectInfo);
          break;

        case 2:
          validation.validateCurrentState(discovery.currentState.barriers);
          break;

        case 3:
          validation.validateFutureState(discovery.futureState.desiredOutcomes);
          success = await processDiscovery(discovery);
          break;

        case 4:
          validation.validateSessionName(discovery.sessionName);
          success = await processSolution(discovery);
          break;

        case 5:
          // Final review stage, no validation needed
          break;
      }

      if (success && stage < 6) {
        setStage(stage + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [stage, discovery, validation, processDiscovery, processSolution, setStage]);

  const goBack = useCallback(() => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  }, [stage, setStage]);

  return {
    isLoading,
    handleTransition,
    goBack,
    stage
  };
}