// src/types/session.ts
import { DiscoveryState, SolutionResponse } from './discovery';

export interface Session {
  id: string;
  prospectName: string;
  companyName: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  date: string;
  duration: number; 
  assignedUser: string;
}

export interface SessionWithData extends Session {
  discoveryState: DiscoveryState;
  solution: SolutionResponse;
}

export interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  setSession: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}