import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { PlanOverview } from '../../components/account/PlanOverview';
import { UsageMetrics } from '../../components/account/UsageMetrics';
import { UpgradeOptions } from '../../components/account/UpgradeOptions';

export function Subscription() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription & Usage"
        description="Manage your subscription and monitor usage"
      />
      <div className="grid grid-cols-1 gap-6">
        <PlanOverview />
        <UsageMetrics />
        <UpgradeOptions />
      </div>
    </div>
  );
}