import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const paymentMethods = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '12/24',
    isDefault: true,
  },
];

export function PaymentMethods() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
      </div>
      <div className="px-6 py-5">
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {method.type} ending in {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="text-sm text-[#009A4D]">Default</span>
              )}
            </div>
          ))}
          <button className="flex items-center px-4 py-2 text-sm font-medium text-[#009A4D] hover:bg-[#009A4D]/5 rounded-lg">
            <Plus className="h-5 w-5 mr-2" />
            Add payment method
          </button>
        </div>
      </div>
    </div>
  );
}