export interface Company {
  id: string;
  name: string;
  teamMembers: TeamMember[];
  subscription: CompanySubscription;
}

export interface TeamMember {
  id: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joinedDate: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CompanySubscription {
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  billingPeriod: string;
  nextBillingDate: string;
  features: string[];
  limits: {
    sessions: number;
    teamMembers: number;
    storage: number;
  };
}