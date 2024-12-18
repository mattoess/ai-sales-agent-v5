import { useState } from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { sendToMake, storeDiscoverySession } from '../services/makeIntegration';
import { useUser } from '@clerk/clerk-react';
import { validateEmail } from '../utils/validation';

export function useDiscoveryNavigation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  
  const { stage, setStage, discovery, updateAISummary } = useDiscoveryStore((state) => ({
    stage: state.discovery.stage,
    setStage: state.setStage,
    discovery: state.discovery,
    updateAISummary: state.updateAISummary,
  }));

  const validateProspectInfo = () => {
    const { firstName, lastName, email, companyName } = discovery.prospectInfo;
    if (!firstName || !lastName || !email || !companyName) {
      throw new Error('Please fill in all required fields');
    }
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }
  };

  const handleNext = async () => {
    setError(null);
    
    try {
      if (stage === 1) {
        validateProspectInfo();
        setStage(2);
      } else if (stage === 2) {
        if (!discovery.currentState.barriers.length) {
          throw new Error('Please add at least one barrier');
        }
        setStage(3);
      } else if (stage === 3) {
        if (!discovery.futureState.desiredOutcomes.length) {
          throw new Error('Please add at least one desired outcome');
        }
        setIsLoading(true);
        const response = await sendToMake(discovery);
        
        updateAISummary({
          currentState: {
            barrierThemes: response.current_state.barrier_themes,
            emotionalThemes: response.current_state.emotional_impact,
            urgencyStatement: response.current_state.financial_risk
          },
          futureState: {
            outcomeThemes: response.future_state.desired_outcomes,
            emotionalImpactThemes: response.future_state.emotional_relief,
            financialImpactStatement: response.future_state.financial_impact
          },
          solution: {
            description: response.bridge_the_gap.solution_summary,
            testimonials: response.similar_use_cases.map(useCase => 
              `${useCase.story}\n\nImpact: ${useCase.impact}`
            )
          }
        });
        setStage(4);
      } else if (stage === 4) {
        if (!discovery.sessionName) {
          throw new Error('Please enter a session name');
        }
        setStage(5);
      } else if (stage === 5) {
        setStage(6);
      } else if (stage === 6) {
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        await storeDiscoverySession(discovery, {
          id: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
          fullName: user.fullName || '',
          role: 'member',
          companyId: user.publicMetadata.companyId as string
        }, {
          sessionId: discovery.sessionId,
          sessionName: discovery.sessionName,
          isNewSession: !discovery.sessionId
        });
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