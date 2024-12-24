// src/providers/DiscoveryProvider.tsx
import React, { createContext, useContext } from 'react';
import { useDiscoveryModal } from '../hooks/useDiscoveryModal';
import { useDiscoveryStore } from '../store/discoveryStore';
import { DiscoveryState } from '../types/discovery';

// Explicitly type the store
type DiscoveryStore = ReturnType<typeof useDiscoveryStore> & {
  discovery: DiscoveryState;
  updateAISummary: (data: any) => void;
  updateSessionName: (name: string) => void;
};

interface DiscoveryContextValue extends ReturnType<typeof useDiscoveryModal> {
  discovery: DiscoveryState;
  updateAISummary: (data: any) => void;
  updateSessionName: (name: string) => void;
}

const DiscoveryContext = createContext<DiscoveryContextValue | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const modalControls = useDiscoveryModal();
  const store = useDiscoveryStore() as DiscoveryStore;
  
  const value: DiscoveryContextValue = {
    ...modalControls,
    discovery: store.discovery,
    updateAISummary: store.updateAISummary,
    updateSessionName: store.updateSessionName,
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