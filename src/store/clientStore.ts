// src/store/clientStore.ts
import { create } from 'zustand';
import { ClientState, ClientData, ClientRole } from '../types/client';

const initialState: ClientState = {
    isRegistered: false,
    data: {
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
      status: 'inactive',
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

  export const useClientStore = create<{
    client: ClientState;
    setRegistered: (value: boolean) => void;
    updateClientData: (data: Partial<ClientData>) => void;
    setClientData: (clientId: string, clerkUserId: string, userID: string) => void;
    resetClientData: () => void;
  }>((set) => ({
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