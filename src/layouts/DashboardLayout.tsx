// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { useEffect, useState } from 'react';  // Added useState import
import { useUser } from '@clerk/clerk-react';
import { useOnboardingStore } from '../store/onboardingStore';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';
import { ONBOARDING_STEPS } from '../types/onboarding';  // Added ONBOARDING_STEPS import
import { Toaster } from '../components/ui/toaster';  // Add this import

export function DashboardLayout() {
  const { user } = useUser();
  const { onboarding, updateOnboardingData, setCurrentStep } = useOnboardingStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!user) return;

    console.log('Checking onboarding state:', {
      isOnboarded: onboarding.isOnboarded,
      userId: user.id,
      hasData: !!onboarding.data.clerkUserId
    });

    // Only show onboarding if:
    // 1. User is not onboarded AND
    // 2. Either no existing data OR different user
    if (!onboarding.isOnboarded && 
        (!onboarding.data.clerkUserId || onboarding.data.clerkUserId !== user.id)) {
      console.log('Initializing onboarding for new user');
      
      // Pre-populate with Clerk user data
      updateOnboardingData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
        clerkUserId: user.id
      });
      setCurrentStep(ONBOARDING_STEPS.WELCOME);
      setShowOnboarding(true);
    }
  }, [user, onboarding.isOnboarded, onboarding.data.clerkUserId, updateOnboardingData, setCurrentStep]);

  const handleCloseOnboarding = () => {
    // Only allow closing if user completed onboarding or explicitly chooses to finish later
    if (onboarding.isOnboarded || window.confirm('Are you sure you want to finish setup later? You can resume from the dashboard.')) {
      setShowOnboarding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={handleCloseOnboarding}
      />
      <Toaster />
    </div>
  );
}