// src/store/clientStore.ts
import { create } from 'zustand';
import type { ClientState, ClientStore, ClientData, ClientRole } from '../types/client';

const initialState: ClientState = {
  isRegistered: false,
  data: {
    // Required fields from ClientData
    id: '',     // Add this
    name: '',   // Add this
    
    // From BaseClientData
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    clerkUserId: '',
    clientId: '',
    website: '',
    industry: undefined,
    logo: undefined,
    
    // From ClientData
    userID: '',
    role: 'User' as ClientRole,
    status: 'pending',
    lastLoginAt: '',
    settings: {
      notifications: true,
      twoFactorEnabled: false,
      preferredLanguage: 'en'
    },
    subscription: undefined,
    verificationStatus: 'pending'
  }
};

export const useClientStore = create<ClientStore>((set) => ({
  client: initialState,
  
  setRegistered: (value) =>
    set((state) => ({
      client: { ...state.client, isRegistered: value },
    })),
  
  updateClientData: (data) =>
    set((state) => ({
      client: {
        ...state.client,
        data: { ...state.client.data, ...data },
      },
    })),
  
  setClientData: (clientId, clerkUserId, userID) =>
    set((state) => ({
      client: {
        ...state.client,
        data: {
          ...state.client.data,
          clientId,
          clerkUserId,
          userID
        },
      },
    })),
    
  resetClientData: () =>
    set(() => ({
      client: initialState
    }))
}));