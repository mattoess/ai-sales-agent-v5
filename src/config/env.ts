import { DEFAULT_KEYS, ENV_VARS } from './constants';

// Environment variable validation and typing
const requiredEnvVars = Object.values(ENV_VARS);

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

// Type-safe environment variables with fallbacks
export const env = {
  CLERK_PUBLISHABLE_KEY: import.meta.env[ENV_VARS.CLERK_KEY],
  STRIPE_PUBLISHABLE_KEY: import.meta.env[ENV_VARS.STRIPE_KEY],
  MAKE_ONBOARDING_WEBHOOK: import.meta.env[ENV_VARS.MAKE_WEBHOOK],
  HCAPTCHA_SITE_KEY: import.meta.env[ENV_VARS.HCAPTCHA_KEY] || DEFAULT_KEYS.HCAPTCHA_TEST_KEY
} as const;