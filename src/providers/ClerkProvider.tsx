import { ClerkProvider as BaseClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import React from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const ClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BaseClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#009845',
          colorTextOnPrimaryBackground: 'white',
        },
        elements: {
          formButtonPrimary: 'bg-techcxo-green hover:bg-techcxo-green/90',
          card: 'bg-white shadow-xl',
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
};