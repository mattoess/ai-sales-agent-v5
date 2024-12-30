import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useDiscoveryNavigation } from '../hooks/useDiscoveryNavigation';
import { useDiscoveryStore } from '../store/discoveryStore';

interface StageNavigationProps {
  onComplete?: () => void;
}

export function StageNavigation({ onComplete }: StageNavigationProps) {
  const { isLoading, error, handleNext, goToPreviousStage, stage } = useDiscoveryNavigation();
  const solution = useDiscoveryStore((state) => state.discovery.solution);
  const setShowError = useDiscoveryStore((state) => state.setShowError);

  // Track stage changes
  useEffect(() => {
    console.log('🔄 Stage Changed in StageNavigation:', stage);
  }, [stage]);

  // Track solution changes
  useEffect(() => {
    console.log('💫 Solution Changed in StageNavigation:', solution);
  }, [solution]);

  const handleNextClick = async () => {
    // Force log to stay in console
    console.log('%c Next Button Clicked', 'background: #009A4D; color: white; padding: 2px 5px; border-radius: 2px');
    console.log({
      stage,
      solution,
      isStage4: stage === 4,
      hasSolution: !!solution
    });

    // Add explicit validation logging
    if (stage === 4) {
      console.log('%c Stage 4 Validation', 'background: #ff9800; color: white; padding: 2px 5px; border-radius: 2px');
      if (!solution) {
        console.log('%c Validation Failed - No Solution', 'background: #f44336; color: white; padding: 2px 5px; border-radius: 2px');
        setShowError(true);
        return;
      }
      console.log('%c Validation Passed', 'background: #4caf50; color: white; padding: 2px 5px; border-radius: 2px');
    }

    const success = await handleNext();
    console.log('Navigation Result:', success);

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
          onClick={goToPreviousStage}
          disabled={stage === 1 || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNextClick}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#009A4D] rounded-md hover:bg-[#009A4D]/90 disabled:opacity-50"
          data-stage={stage}
        >
          {isLoading ? (
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