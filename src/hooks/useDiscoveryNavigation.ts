import { useState } from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { useUser } from '@clerk/clerk-react';
import { useDiscoveryProgress } from './discovery/useDiscoveryProgress';

export function useDiscoveryNavigation() {
  const { isProcessing, error, handleProgress, handleBack, stage } = useDiscoveryProgress();

  return {
    isLoading: isProcessing,
    error,
    handleNext: handleProgress,
    goToPreviousStage: handleBack,
    stage,
  };
}