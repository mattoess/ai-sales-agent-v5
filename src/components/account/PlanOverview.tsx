import React from 'react';
import { Shield, Zap } from 'lucide-react';

export function PlanOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
      </div>
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-[#009A4D]" />
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Pro Plan</h4>
              <p className="text-sm text-gray-500">$199/month</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-[#009A4D] border border-[#009A4D] rounded-lg hover:bg-[#009A4D]/5">
            Change Plan
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="w-4 h-4 mr-2 text-[#009A4D]" />
            Next billing date: March 1, 2024
          </div>
        </div>
      </div>
    </div>
  );
}