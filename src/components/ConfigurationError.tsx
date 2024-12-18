import React from 'react';

interface ConfigurationErrorProps {
  message: string;
}

export const ConfigurationError: React.FC<ConfigurationErrorProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuration Error</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <p className="text-sm text-gray-500">
          Please ensure your environment variables are properly configured.
        </p>
      </div>
    </div>
  );
};