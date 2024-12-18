import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { TeamManagement } from '../../components/settings/TeamManagement';

export function Team() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Management"
        description="Manage your team members and their permissions"
      />
      <TeamManagement />
    </div>
  );
}