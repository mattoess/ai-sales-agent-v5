import React from 'react';
import { Plus, Mail, UserPlus } from 'lucide-react';
import { TeamMemberList } from './TeamMemberList';
import { PendingInvites } from './PendingInvites';

export function TeamManagement() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your team members and their access levels
            </p>
          </div>
          <button className="px-4 py-2 bg-[#009A4D] text-white rounded-lg hover:bg-[#009A4D]/90 flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </button>
        </div>
        <div className="px-6 py-5">
          <TeamMemberList />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pending Invites</h3>
        </div>
        <div className="px-6 py-5">
          <PendingInvites />
        </div>
      </div>
    </div>
  );
}