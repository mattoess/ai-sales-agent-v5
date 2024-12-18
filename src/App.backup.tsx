import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';
import { ConfigurationError } from './components/ConfigurationError';
import { clerkConfig } from './config/clerk';
import { validateEnv } from './config/env';
import { Suspense } from 'react';

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
    <>
      <div className="p-4 text-2xl bg-red-500 text-white">Test Text</div>  {/* Add just this line */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <ClerkProvider {...clerkConfig}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ClerkProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}