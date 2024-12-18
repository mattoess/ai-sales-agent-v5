import React, { createContext, useContext } from 'react';
import { useDiscoveryModal } from '../hooks/useDiscoveryModal';

const DiscoveryContext = createContext<ReturnType<typeof useDiscoveryModal> | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const discovery = useDiscoveryModal();
  
  return (
    <DiscoveryContext.Provider value={discovery}>
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