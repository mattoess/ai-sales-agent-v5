import React from 'react';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { StatsBanner } from '../components/dashboard/StatsBanner';
import { SessionList } from '../components/sessions/SessionList';
import { DiscoveryModal } from '../components/discovery/DiscoveryModal';
import { useDiscovery } from '../providers/DiscoveryProvider';

export function Dashboard() {
  const { isOpen, currentSessionId, closeModal } = useDiscovery();

  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeHeader />
      <StatsBanner />
      <SessionList />
      <DiscoveryModal
        isOpen={isOpen}
        onClose={closeModal}
        sessionId={currentSessionId}
      />
    </div>
  );
}