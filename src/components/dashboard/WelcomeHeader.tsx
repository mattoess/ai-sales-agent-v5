import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import { useDiscovery } from '../../providers/DiscoveryProvider';

export function WelcomeHeader() {
  const { user } = useUser();
  const { openNewSession } = useDiscovery();
  const firstName = user?.firstName || 'there';

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mt-1 text-gray-600">
            Here's what's happening with your discovery sessions
          </p>
        </div>
        <button
          onClick={openNewSession}
          className="px-4 py-2 bg-[#009A4D] text-white rounded-lg hover:bg-[#009A4D]/90 transition-colors flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Discovery Session
        </button>
      </div>
    </div>
  );
}