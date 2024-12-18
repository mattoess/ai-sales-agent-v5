export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  companyId?: string;
  role: 'owner' | 'admin' | 'member';
  subscription?: UserSubscription;
}

export interface UserSubscription {
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  plan: 'basic' | 'pro' | 'enterprise';
  currentPeriodEnd: string;
}