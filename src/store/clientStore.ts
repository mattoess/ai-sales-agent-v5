// src/store/clientStore.ts

import { create } from 'zustand';
import { ClientState, ClientData } from '../types/client';

const initialState: ClientState = {
  isRegistered: false,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    clerkUserId: '',
    clientId: ''
  }
};

export const useClientStore = create<{
  client: ClientState;
  setRegistered: (value: boolean) => void;
  updateClientData: (data: Partial<ClientData>) => void;
  setClientData: (clientId: string, clerkUserId: string) => void;
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
  
  setClientData: (clientId, clerkUserId) =>
    set((state) => ({
      client: {
        ...state.client,
        data: {
          ...state.client.data,
          clientId,
          clerkUserId
        },
      },
    })),
    
  resetClientData: () =>
    set(() => ({
      client: initialState
    }))
}));