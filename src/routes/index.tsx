// src/routes/index.tsx
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { ContentManager } from '../components/admin/ContentManager';
import { LandingPage } from '../components/landing/LandingPage';
import { ROUTES } from '../config/constants';
import { Loader2 } from 'lucide-react';
import { useOnboardingStore } from '../store/onboardingStore';
import { ONBOARDING_STEPS } from '../types/onboarding';
import { useEffect } from 'react';

// Separate component for onboarding route
function OnboardingRedirect() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { setCurrentStep, updateOnboardingData } = useOnboardingStore();

  useEffect(() => {
    if (user) {
      // Pre-populate with Clerk user data
      updateOnboardingData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
        clerkUserId: user.id
      });
      setCurrentStep(ONBOARDING_STEPS.WELCOME);
      navigate(ROUTES.DASHBOARD);
    }
  }, [user, updateOnboardingData, setCurrentStep, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-techcxo-green" />
    </div>
  );
}

export function AppRoutes() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-techcxo-green" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route
        path={ROUTES.HOME}
        element={
          isSignedIn ? (
            <Navigate to={ROUTES.DASHBOARD} replace />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Protected Onboarding Route */}
      <Route
        path={ROUTES.ONBOARDING_WELCOME}
        element={
          <SignedIn>
            <OnboardingRedirect />
          </SignedIn>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        element={
          <SignedIn>
            <DashboardLayout />
          </SignedIn>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path="/admin/content" element={<ContentManager />} />
        
        {/* Redirect root to dashboard for signed-in users */}
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <Navigate to={ROUTES.HOME} replace />
            )
          }
        />
      </Route>

      {/* Catch all redirect */}
      <Route 
        path="*" 
        element={
          isSignedIn ? (
            <Navigate to={ROUTES.DASHBOARD} replace />
          ) : (
            <Navigate to={ROUTES.HOME} replace />
          )
        } 
      />
    </Routes>
  );
}