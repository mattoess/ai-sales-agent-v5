// src/services/make/config.ts

export const MAKE_CONFIG = {
  urls: {
    discovery: import.meta.env.VITE_MAKE_DISCOVERY_WEBHOOK,
    solution: import.meta.env.VITE_MAKE_SOLUTION_WEBHOOK,
    session: import.meta.env.VITE_MAKE_SESSION_WEBHOOK,
    client: import.meta.env.VITE_MAKE_CLIENT_WEBHOOK    // Replaced onboarding with client
  },
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
    maxDelayMs: 20000
  },
  timeouts: {
    request: 30000,
    solution: 50000
  }
} as const;