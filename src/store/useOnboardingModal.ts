import { create } from 'zustand';
import { OnboardingState } from '../types/onboarding';

interface OnboardingStore {
  onboarding: OnboardingState;
  setOnboardingComplete: (isComplete: boolean) => void;
  updateOnboardingData: (data: Partial<OnboardingState['data']>) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  onboarding: {
    isOnboarded: false,
    data: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
    }
  },
  setOnboardingComplete: (isComplete) => 
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        isOnboarded: isComplete
      }
    })),
  updateOnboardingData: (data) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        data: {
          ...state.onboarding.data,
          ...data
        }
      }
    }))
}));