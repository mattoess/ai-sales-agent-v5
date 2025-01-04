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
    status: 'active' | 'inactive' | 'trial';
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
  userID?: string;         // Add this line
  role?: ClientRole;
  status?: 'active' | 'inactive';
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
    status: 'active' | 'inactive';
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
            logo?: LogoInfo;    // Changed from LogoAttachment to LogoInfo
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