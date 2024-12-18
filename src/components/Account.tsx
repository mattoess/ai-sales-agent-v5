import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const Account: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-techcxo-navy mb-8">
            Account Settings
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Subscription
              </h2>
              {/* Add subscription details here once integrated with Stripe */}
              <p className="text-gray-600">
                Manage your subscription in the billing portal
              </p>
              <button className="mt-4 button-secondary">
                Manage Subscription
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};