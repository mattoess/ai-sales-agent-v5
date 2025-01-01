// src/types/onboarding.ts
export interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  clerkUserId?: string;
  clientId?: string;
  
  // Company Setup
  logoUrl?: string;
  website?: string;
  industry?: string;
  
  // Team Setup
  invitedMembers?: {
    email: string;
    status: 'pending' | 'accepted';
    invitedAt: string;
  }[];
  
  // Content Setup
  content?: {
    documents?: Array<{
      id: string;
      title: string;
      url: string;
      type: 'document';
      uploadedAt: string;
    }>;
    videos?: Array<{
      id: string;
      title: string;
      url: string;
      type: 'video';
      uploadedAt: string;
    }>;
    webResources?: Array<{
      id: string;
      title: string;
      url: string;
      type: 'link';
      addedAt: string;
    }>;
  };
}

export interface OnboardingResponse {
  userId: string;
  clientId: string;
  status: 'success' | 'error';
}

export interface OnboardingState {
  isOnboarded: boolean;
  currentStep?: number;
  data: OnboardingData;
}

export const ONBOARDING_STEPS = {
  WELCOME: 1,
  COMPANY_SETUP: 2,
  TEAM_SETUP: 3,
  CONTENT_SETUP: 4,
} as const;

export type OnboardingStepNumber = typeof ONBOARDING_STEPS[keyof typeof ONBOARDING_STEPS];

// Component Props
export interface WelcomeStepProps {
  onStepClick: (step: OnboardingStepNumber) => void;
}

export interface StepProps {}

// Step Configuration
export interface StepValidation {
  isValid: boolean;
  message?: string;
}

export interface BaseStepConfig {
  id: OnboardingStepNumber;
  name: string;
  isRequired?: boolean;
  validationFn?: (data: OnboardingData) => boolean;
}

export interface StepComponentConfig extends BaseStepConfig {
  component: React.ComponentType<WelcomeStepProps> | React.ComponentType<StepProps>;
}

export type StepStatus = 'pending' | 'active' | 'completed' | 'disabled';

export interface StepState {
  status: StepStatus;
  isValid: boolean;
}