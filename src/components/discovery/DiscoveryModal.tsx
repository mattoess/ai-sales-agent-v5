// src/components/discovery/DiscoveryModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { ProspectInfoStep } from './ProspectInfoStep';
import { CurrentStateForm } from '../CurrentStateForm';
import { FutureStateForm } from '../FutureStateForm';
import { ThemesReview } from '../ThemesReview';
import { SolutionReview } from '../SolutionReview';
import { FinalAnalysis } from '../FinalAnalysis';
import { ProgressBar } from '../ProgressBar';
import { StageNavigation } from '../StageNavigation';
import { useDiscoveryStore } from '../../store/discoveryStore';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId?: string;
}

// Development data for testing
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
    companyName: "Tech Innovations Inc",
    clientID: "recmUA4ynqMSPfs9I"
  }
};

export function DiscoveryModal({ isOpen, onClose, sessionId }: DiscoveryModalProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const stage = useDiscoveryStore(state => state.discovery.stage);
  const { updateCurrentState, updateFutureState, updateProspectInfo } = useDiscoveryStore();
  
  React.useEffect(() => {
    if (isOpen) {
      // Reset discovery when modal opens
      useDiscoveryStore.getState().resetDiscovery();
      
      // In development, pre-populate with test data
      if (process.env.NODE_ENV === 'development') {
        updateCurrentState(devData.currentState);
        updateFutureState(devData.futureState);
        updateProspectInfo(devData.prospectInfo);
      }
    }
  }, [isOpen, updateCurrentState, updateFutureState, updateProspectInfo]);

  const handleComplete = React.useCallback(() => {
    console.log('🏁 Modal handling completion');
    setIsSaving(false);
    onClose();
  }, [onClose]);

  const handleStartSave = React.useCallback(() => {
    console.log('💾 Starting save process');
    setIsSaving(true);
  }, []);

  const renderStageContent = () => {
    console.log('Rendering stage:', stage);
    switch (stage) {
      case 1:
        return <ProspectInfoStep />;
      case 2:
        return <CurrentStateForm />;
      case 3:
        return <FutureStateForm />;
      case 4:
        return <ThemesReview />;
      case 5:
        return <SolutionReview />;
      case 6:
        return <FinalAnalysis />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={() => {
            if (!isSaving) onClose();
          }} 
        />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {sessionId ? 'Discovery Session Details' : 'New Discovery Session'}
            </h2>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4">
            <ProgressBar />
            <div className="mt-6">
              {renderStageContent()}
            </div>
          </div>

          {isSaving && (
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
              <p className="text-sm text-blue-600">
                Saving discovery session...
              </p>
            </div>
          )}

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <StageNavigation 
              onComplete={handleComplete}
              onStartSave={handleStartSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}