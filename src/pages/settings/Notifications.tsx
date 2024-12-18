import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { NotificationPreferences } from '../../components/settings/NotificationPreferences';

export function Notifications() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification Preferences"
        description="Control how and when you receive notifications"
      />
      <NotificationPreferences />
    </div>
  );
}