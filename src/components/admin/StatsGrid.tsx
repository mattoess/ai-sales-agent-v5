import React from 'react';
import { Users, MessageSquare, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Users',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
  },
  {
    name: 'Active Sessions',
    value: '1,280',
    change: '+15.3%',
    icon: MessageSquare,
  },
  {
    name: 'Conversion Rate',
    value: '64.2%',
    change: '+5.2%',
    icon: Target,
  },
  {
    name: 'Revenue Growth',
    value: '$12.5k',
    change: '+22.4%',
    icon: TrendingUp,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-2 bg-[#009A4D]/10 rounded-lg">
              <stat.icon className="w-6 h-6 text-[#009A4D]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}