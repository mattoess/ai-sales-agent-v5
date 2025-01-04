export interface Company {
  id: string;
  name: string;
  teamMembers: TeamMember[];
  subscription: CompanySubscription;
  stripeCustomerId?: string;  // Company's Stripe customer ID
  billingContact?: {
    userID: string;          // Our internal unique identifier
    clerkUserId: string;     // Clerk's user identifier
    email: string;
    firstName: string;
    lastName: string;
  };
  verificationStatus?: 'pending' | 'verified' | 'failed';
}

export interface TeamMember {
  id: string;
  userID: string;           // Our internal unique identifier
  clerkUserId: string;      // Clerk's user identifier
  stripeCustomerId?: string; // Individual's Stripe customer ID
  role: 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joinedDate: string;
  email: string;
  firstName: string;
  lastName: string;
  verificationStatus?: 'pending' | 'verified' | 'failed';
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
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  lastBillingDate?: string;
  billingHistory?: {
    userID: string;         // Who made the change
    action: string;
    timestamp: string;
  }[];
}