export interface User {
  id: string;
  userID: string; // Our internal unique user identifier
  clerkUserId: string; // Clerk's user identifier
  stripeCustomerId?: string; // Future Stripe customer ID
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  companyId?: string;
  role: 'owner' | 'admin' | 'member';
  subscription?: UserSubscription;
  userVerificationStatus?: 'pending' | 'verified' | 'failed'; // Track user verification status
}

export interface UserSubscription {
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  plan: 'basic' | 'pro' | 'enterprise';
  currentPeriodEnd: string;
  stripeSubscriptionId?: string; // Future Stripe subscription ID
  stripePriceId?: string; // Future Stripe price ID
  lastBillingDate?: string;
  nextBillingDate?: string;
}