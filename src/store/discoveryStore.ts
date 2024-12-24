// discoveryStore.ts
import { create } from 'zustand';
import { DiscoveryState } from '../types/discovery';

interface AISummaryUpdate {
  currentState?: Partial<DiscoveryState['aiSummary']['currentState']>;
  futureState?: Partial<DiscoveryState['aiSummary']['futureState']>;
  solution?: DiscoveryState['aiSummary']['solution']; // Add this line
}

const initialState: DiscoveryState = {
  currentState: {
    barriers: [],
    financialImpact: '',
    targetDate: '',
    emotionalImpact: '',
  },
  futureState: {
    desiredOutcomes: [],
    financialImpact: '',
    emotionalRelief: '',
  },
  stage: 1,
  prospectInfo: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
  },
  solution: '',
  sessionName: '',
  aiSummary: {
    currentState: {
      barrierThemes: [],
      emotionalThemes: [],
      urgencyStatement: '',
    },
    futureState: {
      outcomeThemes: [],
      emotionalImpactThemes: [],
      financialImpactStatement: '',
    },
  },
};

export const useDiscoveryStore = create<{
  discovery: DiscoveryState;
  setStage: (stage: number) => void;
  updateCurrentState: (data: Partial<DiscoveryState['currentState']>) => void;
  updateFutureState: (data: Partial<DiscoveryState['futureState']>) => void;
  updateAISummary: (data: AISummaryUpdate) => void;
  updateProspectInfo: (data: Partial<DiscoveryState['prospectInfo']>) => void;
  updateSolution: (solution: string) => void;
  updateSessionName: (name: string) => void;
  setSessionId: (id: string) => void;
  resetDiscovery: () => void;
}>((set) => ({
  discovery: initialState,
  setStage: (stage) =>
    set((state) => ({
      discovery: { ...state.discovery, stage }
    })),
  updateCurrentState: (data) =>
    set((state) => ({
      discovery: {
        ...state.discovery,
        currentState: { ...state.discovery.currentState, ...data }
      }
    })),
  updateFutureState: (data) =>
    set((state) => ({
      discovery: {
        ...state.discovery,
        futureState: { ...state.discovery.futureState, ...data }
      }
    })),
    updateAISummary: (data: AISummaryUpdate) =>
      set((state) => ({
        discovery: {
          ...state.discovery,
          aiSummary: {
            ...state.discovery.aiSummary,
            currentState: {
              ...state.discovery.aiSummary.currentState,
              ...(data.currentState || {})
            },
            futureState: {
              ...state.discovery.aiSummary.futureState,
              ...(data.futureState || {})
            },
            solution: data.solution // Add this line
          }
        }
      })),
  updateProspectInfo: (data) =>
    set((state) => ({
      discovery: {
        ...state.discovery,
        prospectInfo: { ...state.discovery.prospectInfo, ...data }
      }
    })),
  updateSolution: (solution) =>
    set((state) => ({
      discovery: { ...state.discovery, solution }
    })),
  updateSessionName: (sessionName) =>
    set((state) => ({
      discovery: { ...state.discovery, sessionName }
    })),
  setSessionId: (sessionId) =>
    set((state) => ({
      discovery: { ...state.discovery, sessionId }
    })),
  resetDiscovery: () => set({ discovery: initialState })
}));