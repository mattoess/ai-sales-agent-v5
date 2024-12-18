import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { AnalyticsDashboard } from '../../components/admin/AnalyticsDashboard';
import { DateRangePicker } from '../../components/admin/DateRangePicker';

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Monitor system usage and performance metrics"
      >
        <DateRangePicker />
      </PageHeader>
      <AnalyticsDashboard />
    </div>
  );
}