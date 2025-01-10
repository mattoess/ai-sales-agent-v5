// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useOnboardingStore } from '../store/onboardingStore';
import { useClientStore } from '../store/clientStore';
import { useSolutionStore } from '../store/solutionStore';
import { getClientByClerkId } from '../services/clientService';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';
import { ONBOARDING_STEPS } from '../types/onboarding';
import { Toaster } from '../components/ui/toaster';
import { useToast } from "@/components/ui/use-toast";

export function DashboardLayout() {
  const { toast } = useToast();
  const { user } = useUser();
  const { 
    onboarding, 
    updateOnboardingData, 
    setCurrentStep,
    setOnboarded 
  } = useOnboardingStore();
  
  const { updateClientData, setClientData } = useClientStore();
  const { loadSolutions } = useSolutionStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoadingClient, setIsLoadingClient] = useState(true);
  const loadingRef = useRef(false);

  // Single effect to handle all data loading
  useEffect(() => {
    async function loadAllData() {
      // Return if already loading or no user
      if (loadingRef.current || !user) return;
      
      try {
        loadingRef.current = true;
        setIsLoadingClient(true);
        console.log('Loading client data for user:', user.id);
        
        const response = await getClientByClerkId(user.id);
        
        if (response.status === 'success' && response.data) {
          console.log('Client data loaded:', response.data);
          
          // Set client data in store
          setClientData(
            response.data.clientId,
            user.id,
            response.data.userID
          );
          
          // Update additional client data
          updateClientData({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            companyName: response.data.company.name,
            role: response.data.user.role,
            status: response.data.user.status,
          });
          
          // Load solutions
          try {
            await loadSolutions(response.data.clientId);
            console.log('Solutions loaded successfully for client:', response.data.clientId);
          } catch (error) {
            console.error('Error loading solutions:', error);
          }
          
          setOnboarded(true);
        } else {
          console.log('No existing client data found');
        }
      } catch (error) {
        console.error('Error loading client data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load client data"
        });
      } finally {
        setIsLoadingClient(false);
        loadingRef.current = false;  // Reset loading state after completion
      }
    }

    loadAllData();
  }, [user?.id]); // Only depend on user.id

  // Onboarding check effect
  useEffect(() => {
    if (!user || isLoadingClient) return;

    console.log('Checking onboarding state:', {
      isOnboarded: onboarding.isOnboarded,
      currentStep: onboarding.currentStep,
      userId: user.id,
      hasData: !!onboarding.data.clerkUserId,
      data: onboarding.data
    });

    const needsOnboarding = (!onboarding.isOnboarded || onboarding.currentStep === ONBOARDING_STEPS.WELCOME) && 
        (!onboarding.data.clerkUserId || 
         onboarding.data.clerkUserId !== user.id ||
         onboarding.currentStep);

    if (needsOnboarding) {
      if (!onboarding.data.clerkUserId) {
        updateOnboardingData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
          clerkUserId: user.id
        });
        setCurrentStep(ONBOARDING_STEPS.WELCOME);
      }
      
      setShowOnboarding(true);
      setOnboarded(false);
    }
  }, [
    user, 
    isLoadingClient,
    onboarding.isOnboarded, 
    onboarding.currentStep, 
    onboarding.data.clerkUserId, 
    updateOnboardingData, 
    setCurrentStep,
    setOnboarded
  ]);

  const handleCloseOnboarding = () => {
    if (onboarding.isOnboarded || window.confirm('Are you sure you want to finish setup later? You can resume from the dashboard.')) {
      setShowOnboarding(false);
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