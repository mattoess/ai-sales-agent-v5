export interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}

export interface OnboardingState {
  isOnboarded: boolean;
  data: OnboardingData;
}