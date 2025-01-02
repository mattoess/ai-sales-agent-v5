import React, { useState, useEffect } from 'react';
import { useClientStore } from '../store/clientStore';
import { saveCompanySetup } from '../services/clientService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { useUser } from '@clerk/clerk-react';

export const ClientRegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  
  const { clientData, updateClientData, setRegistered, setClientData } = useClientStore(
    (state) => ({
      clientData: state.client.data,
      updateClientData: state.updateClientData,
      setRegistered: state.setRegistered,
      setClientData: state.setClientData,
    })
  );

  useEffect(() => {
    if (user) {
      updateClientData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      });
    }
  }, [user, updateClientData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setError('User authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await saveCompanySetup({
        firstName: clientData.firstName || '',
        lastName: clientData.lastName || '',
        email: clientData.email || '',
        companyName: clientData.companyName || '',
        clerkUserId: user.id,
        website: '',
        industry: undefined
      }, null); // no logo for initial registration
      
      if (result.status === 'success' && result.clientId) {
        setClientData(result.clientId, user.id);
        setRegistered(true);
      } else {
        setError(result.message || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Client registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold text-techcxo-navy">
            Complete Your Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please verify your information to complete setup
          </p>
        </div>

        <motion.form 
          className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {error && (
            <div className="p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={clientData.firstName}
                onChange={(e) => updateClientData({ firstName: e.target.value })}
                className="input-base"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={clientData.lastName}
                onChange={(e) => updateClientData({ lastName: e.target.value })}
                className="input-base"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={clientData.email}
                onChange={(e) => updateClientData({ email: e.target.value })}
                className="input-base"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                required
                value={clientData.companyName}
                onChange={(e) => updateClientData({ companyName: e.target.value })}
                className="input-base"
                placeholder="Enter your company name"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="button-primary w-full flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};