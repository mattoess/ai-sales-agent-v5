// src/types/onboarding.ts
import { BaseClientData, BaseResponse, LogoAttachment } from './common';

// Document types
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
  // Team Setup
  invitedMembers?: TeamMember[];
  
  // Content Setup
  content?: {
    documents?: DocumentResource[];
    videos?: VideoResource[];
    webResources?: WebResource[];
  };
}

export interface OnboardingResponse extends BaseResponse {
  userId: string;
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