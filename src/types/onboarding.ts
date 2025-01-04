// src/types/onboarding.ts
import { BaseClientData, BaseResponse } from './common';

// Document types stay the same...
export interface BaseResource {
  id: string;
  title: string;
  url: string;
  uploadedAt: string;
}

export interface DocumentResource extends BaseResource {
  type: 'document';
}

export interface VideoResource extends BaseResource {
  type: 'video';
}

export interface WebResource extends BaseResource {
  type: 'link';
  addedAt: string;
}

interface TeamMember {
  email: string;
  status: 'pending' | 'accepted';
  invitedAt: string;
}

export interface OnboardingData extends BaseClientData {
  userID?: string;         // Added for user identification
  invitedMembers?: TeamMember[];
  content?: {
    documents?: DocumentResource[];
    videos?: VideoResource[];
    webResources?: WebResource[];
  };
}

export interface OnboardingResponse extends BaseResponse {
  status: 'success' | 'error';
  userID: string;        // Added to match our new structure
  clientId: string;
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

export interface WelcomeStepProps {
  onStepClick: (step: OnboardingStepNumber) => void;
}

export interface StepProps {}

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