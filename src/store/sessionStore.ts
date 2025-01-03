// src/store/sessionStore.ts
import { create } from 'zustand';
import { Session, SessionState } from '../types/session';

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  loading: false,
  error: null,
  
  setSession: (sessions: Session[]) => 
    set({ sessions, loading: false, error: null }),
    
  addSession: (session: Session) =>
    set((state) => ({ 
      sessions: [...state.sessions, session],
      loading: false,
      error: null 
    })),
    
  updateSession: (id: string, updates: Partial<Session>) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      ),
      loading: false,
      error: null
    })),
    
  setLoading: (loading: boolean) =>
    set({ loading }),
    
  setError: (error: string | null) =>
    set({ error }),
}));
