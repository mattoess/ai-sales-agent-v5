import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { ProfileForm } from '../../components/settings/ProfileForm';
import { PageHeader } from '../../components/common/PageHeader';

export function Profile() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        description="Manage your account information and preferences"
      />
      <ProfileForm user={user} />
    </div>
  );
}