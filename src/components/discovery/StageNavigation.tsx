import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useDiscoveryProgress } from '../../hooks/discovery/useDiscoveryProgress';

interface StageNavigationProps {
  onComplete?: () => void;
}

export function StageNavigation({ onComplete }: StageNavigationProps) {
  const { isProcessing, error, handleProgress, handleBack, stage } = useDiscoveryProgress();

  const handleNext = async () => {
    const success = await handleProgress();
    if (success && stage === 6 && onComplete) {
      onComplete();
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
          onClick={handleBack}
          disabled={stage === 1 || isProcessing}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#009A4D] rounded-md hover:bg-[#009A4D]/90 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {stage === 6 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}