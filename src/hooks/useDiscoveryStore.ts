import { useDiscoveryStore as useBaseDiscoveryStore } from '../store/discoveryStore';

export function useDiscoveryStore() {
  const store = useBaseDiscoveryStore((state) => ({
    currentState: state.discovery.currentState,
    futureState: state.discovery.futureState,
    stage: state.discovery.stage,
    solution: state.discovery.solution,
    updateCurrentState: state.updateCurrentState,
    updateFutureState: state.updateFutureState,
    updateSolution: state.updateSolution,
    setStage: state.setStage,
  }));

  return store;
}