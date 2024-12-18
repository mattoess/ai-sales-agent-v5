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
import { useSessionStore } from '../../store/sessionStore';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId?: string;
}

export function DiscoveryModal({ isOpen, onClose, sessionId }: DiscoveryModalProps) {
  const stage = useDiscoveryStore((state) => state.discovery.stage);
  const sessions = useSessionStore((state) => state.sessions);
  const addSession = useSessionStore((state) => state.addSession);
  const { discovery } = useDiscoveryStore();

  React.useEffect(() => {
    if (sessionId) {
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        // Load session data into discovery store
        useDiscoveryStore.getState().updateCurrentState({
          barriers: ["Loaded barrier 1", "Loaded barrier 2"],
          financialImpact: "Loaded financial impact",
          targetDate: "2024-12-31",
          emotionalImpact: "Loaded emotional impact"
        });
      }
    }
  }, [sessionId, sessions]);

  const handleComplete = async () => {
    try {
      // Save session data
      const newSession = {
        id: Date.now().toString(),
        prospectName: `${discovery.prospectInfo.firstName} ${discovery.prospectInfo.lastName}`,
        companyName: discovery.prospectInfo.companyName || '',
        status: 'Completed',
        date: new Date().toISOString().split('T')[0],
        duration: '30 minutes',
        assignedTo: 'Current User',
      };
      
      // Add to session store
      addSession(newSession);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  if (!isOpen) return null;

  const renderStageContent = () => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {sessionId ? 'Discovery Session Details' : 'New Discovery Session'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
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

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <StageNavigation onComplete={handleComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}