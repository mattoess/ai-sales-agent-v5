import React from 'react';
import { Users, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Sessions',
    value: '24',
    change: '+12%',
    icon: Users,
  },
  {
    name: 'Success Rate',
    value: '85%',
    change: '+5%',
    icon: Target,
  },
  {
    name: 'Conversion Rate',
    value: '64%',
    change: '+8%',
    icon: TrendingUp,
  },
];

export function StatsBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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