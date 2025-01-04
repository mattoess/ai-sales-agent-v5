// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { LandingPage } from '../components/landing/LandingPage';
import { ROUTES } from '../config/constants';
import { Loader2 } from 'lucide-react';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';

export function AppRoutes() {
  const { isLoaded, isSignedIn } = useUser();

  // Show loading spinner while Clerk loads
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

      {/* Protected Onboarding Route - Replace Registration */}
      <Route
        path={ROUTES.ONBOARDING_WELCOME}
        element={
          <SignedIn>
            <OnboardingModal 
              isOpen={true} 
              onClose={() => {/* Handle close */}}
            />
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