import { dark } from '@clerk/themes';
import { env } from './env';

export const clerkConfig = {
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  appearance: {
    baseTheme: dark,
    variables: {
      colorPrimary: '#009845',
      colorTextOnPrimaryBackground: 'white',
      colorText: '#1f2937',
      colorBackground: '#ffffff',
      colorInputText: '#1f2937',
    },
    elements: {
      formButtonPrimary: 'bg-techcxo-green hover:bg-techcxo-green/90',
      card: 'bg-white shadow-xl',
      formFieldLabel: 'text-gray-700',
      formFieldInput: 'text-gray-900 bg-white border-gray-300',
      formFieldInputPlaceholder: 'text-gray-500',
      formFieldLabelRow: 'text-gray-700',
      footer: 'text-gray-600',
      footerActionLink: 'text-techcxo-green hover:text-techcxo-green/80',
      identityPreviewText: 'text-gray-700',
      identityPreviewEditButton: 'text-techcxo-green hover:text-techcxo-green/80',
      headerTitle: 'text-gray-900',
      headerSubtitle: 'text-gray-600',
      socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
      socialButtonsBlockButtonText: 'text-gray-600',
      dividerLine: 'bg-gray-200',
      dividerText: 'text-gray-500',
      formFieldWarningText: 'text-yellow-600',
      formFieldErrorText: 'text-red-600',
      alertText: 'text-gray-500',
      alertTextDanger: 'text-red-600',
      inputLabel: 'text-gray-700',
      input: 'bg-white text-gray-900',
      formFieldAction: 'text-gray-900',
      formFieldInputShowPasswordButton: 'text-gray-700 hover:text-gray-900',
    },
    layout: {
      socialButtonsPlacement: 'bottom',
      socialButtonsVariant: 'blockButton',
      showOptionalFields: true,
      shimmer: true
    },
    terms: {
      continueTo: 'Get started with'
    }
  },
  allowedRedirectOrigins: [
    'https://localhost:5173',
    'https://aisalesagentv2-yv0j--5173--c8c182a3.local-credentialless.webcontainer.io',
    window.location.origin
  ],
  navigate: (to: string) => window.location.href = to,
  signUp: {
    hcaptchaConfiguration: {
    siteKey: "10000000-ffff-ffff-ffff-000000000001"    
    }
  },
    // Move allowedRedirectOrigins into a redirectUrl configuration
  redirectUrl: window.location.origin,
};