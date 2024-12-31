// src/types/onboarding.ts
export interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  clerkUserId?: string;  // Add Clerk user ID
  clientId?: string;     // Add client ID from webhook response
}

export interface OnboardingResponse {
  userId: string;
  clientId: string;
  status: 'success' | 'error';
}

export interface OnboardingState {
  isOnboarded: boolean;
  data: OnboardingData;
}