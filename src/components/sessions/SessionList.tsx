import React from 'react';
import { SessionCard } from './SessionCard';
import { SessionFilters } from './SessionFilters';
import { useSessionStore } from '../../store/sessionStore';

export function SessionList() {
  const sessions = useSessionStore((state) => state.sessions);

  return (
    <div className="space-y-6">
      <SessionFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
        {sessions.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No discovery sessions found</p>
          </div>
        )}
      </div>
    </div>
  );
}