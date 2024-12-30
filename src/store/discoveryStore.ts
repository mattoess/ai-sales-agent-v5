import { create } from 'zustand';
import { DiscoveryState, SolutionResponse } from '../types/discovery';

interface AISummaryUpdate {
  currentState?: Partial<DiscoveryState['aiSummary']['currentState']>;
  futureState?: Partial<DiscoveryState['aiSummary']['futureState']>;
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
    clientId: undefined,
    userId: undefined,
    industryType: '',
    companySize: undefined,  
    urgencyLevel: undefined, 
  },
  sessionName: '',
  sessionId: undefined,
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
  solution: undefined,
  solutionResponse: undefined, // Add this line to initialize solutionResponse
  showError: false, // Initialize with a default value
};

export const useDiscoveryStore = create<{
  discovery: DiscoveryState;
  setStage: (stage: number) => void;
  updateCurrentState: (data: Partial<DiscoveryState['currentState']>) => void;
  updateFutureState: (data: Partial<DiscoveryState['futureState']>) => void;
  updateAISummary: (data: AISummaryUpdate) => void;
  updateProspectInfo: (data: Partial<DiscoveryState['prospectInfo']>) => void;
  updateSessionName: (name: string) => void;
  setSessionId: (id: string) => void;
  resetDiscovery: () => void;
  solution: string | undefined;
  updateSolution: (solution: string) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
  setSolutionResponse: (response: SolutionResponse) => void;
}>((set) => ({
  discovery: initialState,
  setStage: (stage: number) => set((state) => ({ discovery: { ...state.discovery, stage } })),
  updateCurrentState: (data: Partial<DiscoveryState['currentState']>) => set((state) => ({
      discovery: {
        ...state.discovery,
        currentState: { ...state.discovery.currentState, ...data },
      },
    })),
  updateFutureState: (data: Partial<DiscoveryState['futureState']>) => set((state) => ({
      discovery: {
        ...state.discovery,
        futureState: { ...state.discovery.futureState, ...data },
      },
    })),
  updateAISummary: (data: AISummaryUpdate) => set((state) => ({
        discovery: {
          ...state.discovery,
          aiSummary: {
            ...state.discovery.aiSummary,
            currentState: {
              ...state.discovery.aiSummary.currentState,
              ...(data.currentState || {}),
            },
            futureState: {
              ...state.discovery.aiSummary.futureState,
              ...(data.futureState || {}),
            },
          },
        },
      })),
  updateProspectInfo: (data: Partial<DiscoveryState['prospectInfo']>) => set((state) => ({
      discovery: {
        ...state.discovery,
        prospectInfo: { ...state.discovery.prospectInfo, ...data },
      },
    })),
  updateSessionName: (name: string) => set((state) => ({
    discovery: { ...state.discovery, sessionName: name },
    })),
  setSessionId: (id: string) => set((state) => ({
    discovery: { ...state.discovery, sessionId: id },
    })),
  resetDiscovery: () => set({ discovery: initialState }),
  solution: initialState.solution,
  updateSolution: (solution: string) => set((state) => ({
    discovery: { ...state.discovery, solution },
  })),
  showError: false,
  setShowError: (show: boolean) => set((state) => ({
    discovery: { ...state.discovery, showError: show },
  })),
  // Add the setSolutionResponse method
  setSolutionResponse: (response: SolutionResponse) => set((state) => ({
    discovery: { 
      ...state.discovery, 
      solutionResponse: response 
    }
  })),
}));