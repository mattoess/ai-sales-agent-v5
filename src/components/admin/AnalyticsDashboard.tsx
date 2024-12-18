import React from 'react';
import { BarChart, LineChart } from '../../components/charts';
import { StatsGrid } from './StatsGrid';

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Discovery Sessions Over Time
          </h3>
          <LineChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            User Activity by Role
          </h3>
          <BarChart />
        </div>
      </div>
    </div>
  );
}