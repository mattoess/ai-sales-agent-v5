// src/components/StageNavigation.tsx
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDiscoveryProgress } from '../hooks/discovery/useDiscoveryProgress';
import { useDiscoveryStore } from '../store/discoveryStore';
import { useSessionStore } from '../store/sessionStore';
import { createSession } from '../services/make/discoverySessionService';

interface StageNavigationProps {
  onComplete?: () => void;
  onStartSave?: () => void;
}

export function StageNavigation({ onComplete, onStartSave }: StageNavigationProps) {
  const { isProcessing, error, handleProgress, handleBack } = useDiscoveryProgress();
  const stageFromStore = useDiscoveryStore(state => state.discovery.stage);
  const discovery = useDiscoveryStore(state => state.discovery);
  const { addSession, setError, setLoading } = useSessionStore();

  // Debug mount/update
  useEffect(() => {
    console.log('🔍 StageNavigation mounted/updated:', {
      stageFromStore,
      isProcessing,
      hasError: !!error,
      discovery: {
        stage: discovery.stage,
        hasSolution: !!discovery.solution,
        hasSolutionResponse: !!discovery.solutionResponse
      }
    });
  }, [stageFromStore, isProcessing, error, discovery]);

  const handleNext = async () => {
    console.log('👆 Next/Complete clicked', {
      currentStage: stageFromStore,
      isProcessing,
      hasError: !!error
    });

    try {
      if (stageFromStore === 6) {
        console.log('🎯 Stage 6 detected - Starting session creation');
        setLoading(true);
        if (onStartSave) {
          console.log('📝 Triggering save state in modal');
          onStartSave();
        }

        if (!discovery.solutionResponse) {
          console.error('❌ No solution response available');
          throw new Error('No solution response available');
        }

        console.log('📤 Creating session with:', {
          discoveryState: discovery,
          solutionResponse: discovery.solutionResponse
        });

        const session = await createSession(
          discovery,
          discovery.solutionResponse
        );

        console.log('✅ Session created:', session);
        addSession(session);
        
        // Show success message before completing
        alert('Discovery session saved successfully!');
        
        if (onComplete) {
          console.log('🏁 Calling onComplete callback');
          onComplete();
        }
      } else {
        console.log('⏭️ Processing stage:', stageFromStore);
        await handleProgress();
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save session');
      // Prevent modal from closing on error
      alert('Failed to save session. Please try again.');
    } finally {
      setLoading(false);
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
          onClick={() => {
            console.log('⬅️ Back clicked from stage:', stageFromStore);
            handleBack();
          }}
          disabled={stageFromStore === 1 || isProcessing}
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
              {stageFromStore === 6 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}