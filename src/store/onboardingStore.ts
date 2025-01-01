// src/store/onboardingStore.ts
import { create } from 'zustand';
import { OnboardingState, ONBOARDING_STEPS } from '../types/onboarding';

const initialState: OnboardingState = {
  isOnboarded: false,
  currentStep: ONBOARDING_STEPS.WELCOME,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    clerkUserId: '',
    clientId: '',
    logoUrl: '',
    website: '',
    industry: '',
    invitedMembers: [],
    content: {
      documents: [],
      videos: [],
      webResources: []
    }
  }
};

export const useOnboardingStore = create<{
  onboarding: OnboardingState;
  setOnboarded: (value: boolean) => void;
  updateOnboardingData: (data: Partial<OnboardingState['data']>) => void;
  setClientData: (clientId: string, clerkUserId: string) => void;
  setCurrentStep: (step: number) => void;
  addInvitedMember: (email: string) => void;
  addContent: (content: { type: 'document' | 'video' | 'link', data: any }) => void;
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
    
  setClientData: (clientId, clerkUserId) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        data: {
          ...state.onboarding.data,
          clientId,
          clerkUserId
        },
      },
    })),

  setCurrentStep: (step) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        currentStep: step,
      },
    })),

  addInvitedMember: (email) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        data: {
          ...state.onboarding.data,
          invitedMembers: [
            ...(state.onboarding.data.invitedMembers || []),
            {
              email,
              status: 'pending',
              invitedAt: new Date().toISOString()
            }
          ]
        }
      }
    })),

  addContent: (content) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        data: {
          ...state.onboarding.data,
          content: {
            ...state.onboarding.data.content,
            [content.type === 'link' ? 'webResources' : 
             content.type === 'video' ? 'videos' : 'documents']: [
              ...(state.onboarding.data.content?.[
                content.type === 'link' ? 'webResources' : 
                content.type === 'video' ? 'videos' : 'documents'
              ] || []),
              {
                ...content.data,
                type: content.type,
                addedAt: new Date().toISOString()
              }
            ]
          }
        }
      }
    }))
}));