import { create } from 'zustand';
import { Session } from '../types/session';

interface SessionState {
  sessions: Session[];
  setSession: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
}

// Mock data for initial state
const mockSessions: Session[] = [
  {
    id: '1',
    prospectName: 'John Smith',
    companyName: 'Tech Solutions Inc.',
    status: 'In Progress',
    date: '2024-02-22',
    duration: '60 minutes',
    assignedTo: 'Sarah Johnson',
  },
  {
    id: '2',
    prospectName: 'Emily Brown',
    companyName: 'Digital Innovations',
    status: 'Completed',
    date: '2024-02-21',
    duration: '45 minutes',
    assignedTo: 'Mike Wilson',
  },
  {
    id: '3',
    prospectName: 'David Lee',
    companyName: 'Growth Ventures',
    status: 'Scheduled',
    date: '2024-02-23',
    duration: '30 minutes',
    assignedTo: 'Sarah Johnson',
  },
];

export const useSessionStore = create<SessionState>((set) => ({
  sessions: mockSessions,
  setSession: (sessions) => set({ sessions }),
  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
  updateSession: (id, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      ),
    })),
}));