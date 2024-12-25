// src/providers/DiscoveryProvider.tsx
import React, { createContext, useContext } from 'react';
import { useDiscoveryModal } from '../hooks/useDiscoveryModal';
import { useDiscoveryStore } from '../store/discoveryStore';
import { DiscoveryState } from '../types/discovery';

interface DiscoveryContextValue extends ReturnType<typeof useDiscoveryModal> {
  discovery: DiscoveryState;
  updateAISummary: (data: Partial<DiscoveryState['aiSummary']>) => void;
  updateSessionName: (name: string) => void;
}

const DiscoveryContext = createContext<DiscoveryContextValue | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const modalControls = useDiscoveryModal();
  const discoveryStore = useDiscoveryStore();

  const value: DiscoveryContextValue = {
    ...modalControls,
    discovery: discoveryStore.discovery,
    updateAISummary: discoveryStore.updateAISummary,
    updateSessionName: discoveryStore.updateSessionName,
  };

  return (
    <DiscoveryContext.Provider value={value}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (context === undefined) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
}