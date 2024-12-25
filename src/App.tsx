// src/App.tsx
import React, { Suspense } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';
import { ConfigurationError } from './components/ConfigurationError';
import { clerkConfig } from './config/clerk';
import { validateEnv } from './config/env';
import { DiscoveryProvider } from './providers/DiscoveryProvider';

export function App() {
  // Validate environment variables
  try {
    validateEnv();
  } catch (error) {
    console.error('Environment validation failed:', error);
    const message = error instanceof Error ? error.message : 'Configuration error';
    return <ConfigurationError message={message} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <ClerkProvider {...clerkConfig}>
          <BrowserRouter>
            <DiscoveryProvider>
              <AppRoutes />
            </DiscoveryProvider>
          </BrowserRouter>
        </ClerkProvider>
      </Suspense>
    </ErrorBoundary>
  );
}