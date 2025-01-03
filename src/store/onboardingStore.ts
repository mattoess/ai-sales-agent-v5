// src/store/onboardingStore.ts
import { create } from 'zustand';
import { 
  OnboardingState, 
  ONBOARDING_STEPS,
  DocumentResource,
  VideoResource,
  WebResource 
} from '../types/onboarding';

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
    website: '',
    industry: undefined,
    invitedMembers: [],
    content: {
      documents: [],
      videos: [],
      webResources: []
    }
  }
};

interface OnboardingStore {
  onboarding: OnboardingState;
  setOnboarded: (value: boolean) => void;
  updateOnboardingData: (data: Partial<OnboardingState['data']>) => void;
  setCurrentStep: (step: number) => void;
  addInvitedMember: (email: string) => void;
  addContent: (content: { 
    type: 'document' | 'video' | 'link', 
    data: Omit<DocumentResource | VideoResource | WebResource, 'type' | 'uploadedAt' | 'addedAt'>
  }) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  onboarding: initialState,
  
  setOnboarded: (value: boolean) => 
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        isOnboarded: value
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
    })),

  setCurrentStep: (step: number) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        currentStep: step
      }
    })),

  addInvitedMember: (email: string) =>
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
            ...(content.type === 'link' 
              ? { 
                  webResources: [
                    ...(state.onboarding.data.content?.webResources || []),
                    {
                      ...content.data,
                      type: 'link' as const,
                      uploadedAt: new Date().toISOString(),
                      addedAt: new Date().toISOString()
                    } as WebResource
                  ]
                }
              : { 
                  [`${content.type}s`]: [
                    ...(state.onboarding.data.content?.[`${content.type}s`] || []),
                    {
                      ...content.data,
                      type: content.type,
                      uploadedAt: new Date().toISOString()
                    } as DocumentResource | VideoResource
                  ]
                }
            )
          }
        }
      }
    }))
}));