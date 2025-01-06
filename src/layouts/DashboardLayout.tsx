// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useOnboardingStore } from '../store/onboardingStore';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';
import { ONBOARDING_STEPS } from '../types/onboarding';
import { Toaster } from '../components/ui/toaster';

export function DashboardLayout() {
  const { user } = useUser();
  const { 
    onboarding, 
    updateOnboardingData, 
    setCurrentStep,
    setOnboarded 
  } = useOnboardingStore();
  
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!user) return;

    console.log('Checking onboarding state:', {
      isOnboarded: onboarding.isOnboarded,
      currentStep: onboarding.currentStep,
      userId: user.id,
      hasData: !!onboarding.data.clerkUserId,
      data: onboarding.data
    });

    // Show onboarding if:
    // 1. Either not onboarded OR at Welcome step
    // 2. And one of:
    //    - No existing data
    //    - Different user
    //    - Current step is set (manual trigger)
    const needsOnboarding = (!onboarding.isOnboarded || onboarding.currentStep === ONBOARDING_STEPS.WELCOME) && 
        (!onboarding.data.clerkUserId || 
         onboarding.data.clerkUserId !== user.id ||
         onboarding.currentStep);

    console.log('Needs onboarding?', needsOnboarding, {
      condition1: !onboarding.isOnboarded || onboarding.currentStep === ONBOARDING_STEPS.WELCOME,
      condition2: !onboarding.data.clerkUserId || onboarding.data.clerkUserId !== user.id || onboarding.currentStep
    });

    if (needsOnboarding) {
      // Only update user data if not already set
      if (!onboarding.data.clerkUserId) {
        console.log('Initializing onboarding for new user');
        updateOnboardingData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
          clerkUserId: user.id
        });
        setCurrentStep(ONBOARDING_STEPS.WELCOME);
      }
      
      // Ensure not already onboarded before showing modal
      setShowOnboarding(true);
      // Reset onboarded state since we're starting onboarding
      setOnboarded(false);
    }
  }, [
    user, 
    onboarding.isOnboarded, 
    onboarding.currentStep, 
    onboarding.data.clerkUserId, 
    updateOnboardingData, 
    setCurrentStep,
    setOnboarded
  ]);

  const handleCloseOnboarding = () => {
    console.log('handleCloseOnboarding called', {
      isOnboarded: onboarding.isOnboarded
    });
    
    // Only allow closing if user completed onboarding or explicitly chooses to finish later
    if (onboarding.isOnboarded || window.confirm('Are you sure you want to finish setup later? You can resume from the dashboard.')) {
      setShowOnboarding(false);
      console.log('Setting showOnboarding to false');
    }
  };

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
}