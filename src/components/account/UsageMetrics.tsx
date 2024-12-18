import React from 'react';
import { BarChart, Users, MessageSquare } from 'lucide-react';

const metrics = [
  {
    name: 'Discovery Sessions',
    used: 35,
    limit: 50,
    icon: MessageSquare,
  },
  {
    name: 'Team Members',
    used: 8,
    limit: 10,
    icon: Users,
  },
  {
    name: 'Analytics Reports',
    used: 12,
    limit: 20,
    icon: BarChart,
  },
];

export function UsageMetrics() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Usage Overview</h3>
      </div>
      <div className="px-6 py-5">
        <div className="grid gap-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="flex items-center">
              <metric.icon className="w-5 h-5 text-gray-400" />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {metric.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {metric.used} / {metric.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#009A4D] rounded-full h-2"
                    style={{ width: `${(metric.used / metric.limit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}