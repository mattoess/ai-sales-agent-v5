import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { AISettings } from '../../components/settings/AISettings';

export function AIPreferences() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Assistant Settings"
        description="Customize how the AI assistant works for you"
      />
      <AISettings />
    </div>
  );
}