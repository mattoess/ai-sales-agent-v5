// src/types/client.ts

export interface ClientData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    clerkUserId: string;
    clientId?: string;
  }
  
  export interface ExistingAccount {
    clientId: string;
    clerkUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
  }
  
  export interface ClientResponse {
    status: 'success' | 'error';
    code?: 'CLERK_ID_EXISTS' | 'EMAIL_EXISTS';
    message?: string;
    clientId?: string;
    clerkUserId?: string;
    existingAccount?: ExistingAccount;
    requestedClerkId?: string;
    newAccount?: ClientData;
    metadata?: {
      createdAt: string;
      environment: string;
    };
  }
  
  export interface ClientState {
    isRegistered: boolean;
    data: ClientData;
  }
  
  // Possible future expansion
  export type ClientRole = 'owner' | 'admin' | 'user';
  
  export interface ClientSettings {
    notifications: boolean;
    twoFactorEnabled: boolean;
    preferredLanguage: string;
  }