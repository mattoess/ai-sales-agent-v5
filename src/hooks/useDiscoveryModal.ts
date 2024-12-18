import { useState } from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { useSessionStore } from '../store/sessionStore';

// Development data
const devData = {
  currentState: {
    barriers: [
      "Executive team conflicts",
      "Siloed departments",
      "Slow decision making",
      "Resistance to change"
    ],
    financialImpact: "$2.5M in delayed revenue",
    targetDate: "2024-12-31",
    emotionalImpact: "Team frustration and burnout\nLow morale\nHigh stress levels",
  },
  futureState: {
    desiredOutcomes: [
      "Aligned executive team",
      "Cross-functional collaboration",
      "Faster implementation",
      "Improved team morale"
    ],
    financialImpact: "$5M additional revenue",
    emotionalRelief: "Reduced stress\nHigher job satisfaction\nBetter work-life balance",
  },
  prospectInfo: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    companyName: "Tech Innovations Inc"
  }
};

export function useDiscoveryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>();
  
  const { setStage, updateCurrentState, updateFutureState, updateProspectInfo } = useDiscoveryStore();

  const openNewSession = () => {
    setCurrentSessionId(undefined);
    setStage(1);
    
    // In development, pre-populate with dummy data
    if (process.env.NODE_ENV === 'development') {
      updateCurrentState(devData.currentState);
      updateFutureState(devData.futureState);
      updateProspectInfo(devData.prospectInfo);
    } else {
      // Reset discovery store to initial state in production
      updateCurrentState({
        barriers: [],
        financialImpact: '',
        targetDate: '',
        emotionalImpact: '',
      });
      updateFutureState({
        desiredOutcomes: [],
        financialImpact: '',
        emotionalRelief: '',
      });
      updateProspectInfo({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
      });
    }
    
    setIsOpen(true);
  };

  const openExistingSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setStage(1);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentSessionId(undefined);
  };

  return {
    isOpen,
    currentSessionId,
    openNewSession,
    openExistingSession,
    closeModal,
  };
}