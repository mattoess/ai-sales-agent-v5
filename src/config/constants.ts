// API Keys and Integration defaults
export const DEFAULT_KEYS = {
  HCAPTCHA_TEST_KEY: '10000000-ffff-ffff-ffff-000000000001',
  // Add other default keys here
} as const;

// Environment variable names
export const ENV_VARS = {
  CLERK_KEY: 'VITE_CLERK_PUBLISHABLE_KEY',
  STRIPE_KEY: 'VITE_STRIPE_PUBLISHABLE_KEY',
  MAKE_WEBHOOK: 'VITE_MAKE_ONBOARDING_WEBHOOK',
  HCAPTCHA_KEY: 'VITE_HCAPTCHA_SITE_KEY',
} as const;