import React from 'react';
import { FutureStateSection } from './discovery/FutureStateSection';

export const FutureStateForm: React.FC = () => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Future State Vision</h2>
      <FutureStateSection />
    </div>
  );
};