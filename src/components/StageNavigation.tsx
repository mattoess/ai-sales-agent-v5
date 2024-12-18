import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useDiscoveryNavigation } from '../hooks/useDiscoveryNavigation';
import { useDiscoveryStore } from '../store/discoveryStore';
import { storeDiscoverySession } from '../services/makeIntegration';
import { useUser } from '@clerk/clerk-react';

interface StageNavigationProps {
  onComplete?: () => void;
}

export function StageNavigation({ onComplete }: StageNavigationProps) {
  const { isLoading, error, handleNext, goToPreviousStage, stage } = useDiscoveryNavigation();
  const discovery = useDiscoveryStore((state) => state.discovery);
  const { user } = useUser();

  const handleNextClick = async () => {
    if (stage === 6) {
      try {
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
        
        onComplete?.();
      } catch (error) {
        console.error('Error saving discovery session:', error);
      }
    } else {
      await handleNext();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousStage}
          disabled={stage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            stage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-[#009A4D] text-white rounded-md hover:bg-[#009A4D]/90 disabled:bg-[#009A4D]/50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {stage === 6 ? 'Submit and Save' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}