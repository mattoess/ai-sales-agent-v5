import { create } from 'zustand';
import { OnboardingState } from '../types/onboarding';

const initialState: OnboardingState = {
  isOnboarded: false,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: ''
  }
};

export const useOnboardingStore = create<{
  onboarding: OnboardingState;
  setOnboarded: (value: boolean) => void;
  updateOnboardingData: (data: Partial<OnboardingState['data']>) => void;
}>((set) => ({
  onboarding: initialState,
  setOnboarded: (value) =>
    set((state) => ({
      onboarding: { ...state.onboarding, isOnboarded: value },
    })),
  updateOnboardingData: (data) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        data: { ...state.onboarding.data, ...data },
      },
    })),
}));