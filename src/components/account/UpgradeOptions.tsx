import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Pro',
    price: '$199',
    features: [
      'Up to 50 discovery sessions',
      'Advanced AI analysis',
      'Priority support',
      'Team collaboration',
      'Custom templates',
    ],
  },
  {
    name: 'Enterprise',
    price: '$499',
    features: [
      'Unlimited discovery sessions',
      'Premium AI analysis',
      'Dedicated support',
      'Advanced team management',
      'Custom integrations',
      'API access',
    ],
  },
];

export function UpgradeOptions() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Available Plans</h3>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h4 className="text-xl font-semibold text-gray-900">{plan.name}</h4>
              <p className="mt-2 text-3xl font-bold text-[#009A4D]">
                {plan.price}
                <span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-[#009A4D] flex-shrink-0" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full px-4 py-2 bg-[#009A4D] text-white rounded-lg hover:bg-[#009A4D]/90 transition-colors">
                Upgrade to {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}