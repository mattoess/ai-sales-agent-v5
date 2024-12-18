import React, { useState } from 'react';
import { useOnboardingStore } from '../store/onboardingStore';
import { useDiscoveryStore } from '../store/discoveryStore';
import { createClient } from '../services/onboardingService';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Logo } from './Logo';

export const OnboardingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { onboardingData, updateOnboardingData, setOnboarded } = useOnboardingStore(
    (state) => ({
      onboardingData: state.onboarding.data,
      updateOnboardingData: state.updateOnboardingData,
      setOnboarded: state.setOnboarded,
    })
  );

  const updateProspectInfo = useDiscoveryStore((state) => state.updateProspectInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await createClient(onboardingData);
      
      if (result.status === 'success') {
        // Update discovery store with prospect info
        updateProspectInfo({
          firstName: onboardingData.firstName,
          lastName: onboardingData.lastName,
          email: onboardingData.email,
          clientId: result.clientId,
        });

        setOnboarded(true);
      } else {
        setError(result.message || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Onboarding error:', error);
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
            Welcome to TechCXO
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Let's get started with your account setup
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
                value={onboardingData.firstName}
                onChange={(e) => updateOnboardingData({ firstName: e.target.value })}
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
                value={onboardingData.lastName}
                onChange={(e) => updateOnboardingData({ lastName: e.target.value })}
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
                value={onboardingData.email}
                onChange={(e) => updateOnboardingData({ email: e.target.value })}
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
                value={onboardingData.companyName}
                onChange={(e) => updateOnboardingData({ companyName: e.target.value })}
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
              'Get Started'
            )}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};