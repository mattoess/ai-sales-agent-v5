import React from 'react';
import { CurrentStateSection } from './discovery/CurrentStateSection';

export const CurrentStateForm: React.FC = () => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Current State Discovery</h2>
      <CurrentStateSection />
    </div>
  );
};