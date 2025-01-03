// src/types/client.ts
import { BaseClientData, BaseResponse } from './common';

export type ClientRole = 'owner' | 'admin' | 'user';

export interface ClientSettings {
    notifications: boolean;
    twoFactorEnabled: boolean;
    preferredLanguage: string;
}

export interface ClientSubscription {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'trial';
    expiresAt?: string;
}

export interface ClientData extends BaseClientData {
    role?: ClientRole;
    status?: 'active' | 'inactive'; // Made optional
    lastLoginAt?: string;
    settings?: ClientSettings;
    subscription?: ClientSubscription;
}

export interface ExistingAccount extends BaseClientData {
    clientId: string;
    clerkUserId: string;
    status: 'active' | 'inactive'; // Kept required for existing accounts
}

export interface ClientResponse extends BaseResponse {
    code?: 'CLERK_ID_EXISTS' | 'EMAIL_EXISTS' | 'COMPANY_SETUP_COMPLETE';
    clientId?: string;
    clerkUserId?: string;
    existingAccount?: ExistingAccount;
    requestedClerkId?: string;
    newAccount?: ClientData;
    metadata?: {
        createdAt: string;
        environment: string;
        onboardingStep?: string;
    };
}

export interface ClientState {
    isRegistered: boolean;
    data: ClientData;
}