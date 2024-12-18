import React from 'react';
import { Mail, X } from 'lucide-react';

const pendingInvites = [
  {
    id: 1,
    email: 'pending@example.com',
    role: 'Member',
    sentDate: '2024-02-20',
  },
];

export function PendingInvites() {
  return (
    <div className="space-y-4">
      {pendingInvites.map((invite) => (
        <div
          key={invite.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {invite.email}
              </div>
              <div className="text-sm text-gray-500">
                Invited on {invite.sentDate}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{invite.role}</span>
            <button className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      {pendingInvites.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No pending invites
        </div>
      )}
    </div>
  );
}