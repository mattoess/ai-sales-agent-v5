// src/types/client.ts
import { BaseClientData, BaseResponse } from './common';

export type ClientRole = 'Admin' | 'User';

export interface ClientSettings {
    notifications: boolean;
    twoFactorEnabled: boolean;
    preferredLanguage: string;
}

export interface ClientSubscription {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'pending' | 'trial';
    expiresAt?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    lastBillingDate?: string;
    nextBillingDate?: string;
}

interface LogoInfo {
    name: string;
    path: string;    // URL path to the logo in public folder
    type?: string;
    uploadedAt: string;
}

export interface ClientData extends BaseClientData {
  id: string;
  name: string;
  userID?: string;         // Add this line
  role?: ClientRole;
  status?: 'active' | 'pending';
  lastLoginAt?: string;
  settings?: ClientSettings;
  subscription?: ClientSubscription;
  verificationStatus?: 'pending' | 'verified' | 'failed';
}

export interface ExistingAccount extends BaseClientData {
    clientId: string;
    userID: string;         // Our internal unique identifier
    clerkUserId: string;
    stripeCustomerId?: string;
    status: 'active' | 'pending';
}

export interface ClientResponse extends BaseResponse {
    status: 'success' | 'error';
    message?: string;
    data?: {
        userID: string;        // Airtable User Record ID
        clientId: string;      // Airtable Company Record ID
        company: {
            name: string;
            status: 'active' | 'pending';
            logo?: {
                name: string;
                path: string;
                type: string;
                uploadedAt: string;
            };
            industry?: string;
            website?: string;
        };
        user: {
            email: string;
            role: ClientRole;
            status: 'active' | 'pending';
            firstName: string;
            lastName: string;
        };
    };
}

export interface ClientState {
    isRegistered: boolean;
    data: ClientData;
  }
  
  export interface ClientStore {
    client: ClientState;
    setRegistered: (value: boolean) => void;
    updateClientData: (data: Partial<ClientData>) => void;
    setClientData: (clientId: string, clerkUserId: string, userID: string) => void;
    resetClientData: () => void;
  }