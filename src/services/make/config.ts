// src/services/make/config.ts
export const MAKE_CONFIG = {
  urls: {
    discovery: import.meta.env.VITE_MAKE_DISCOVERY_WEBHOOK,
    solution: import.meta.env.VITE_MAKE_SOLUTION_WEBHOOK,
    createSession: import.meta.env.VITE_MAKE_CREATE_SESSION_WEBHOOK,
    loadSession: import.meta.env.VITE_MAKE_LOAD_SESSION_WEBHOOK,
    client: import.meta.env.VITE_MAKE_CLIENT_WEBHOOK,
  },
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
    maxDelayMs: 20000,
  },
  timeouts: {
    discovery: 30000,
    solution: 30000,
    createSession: 30000,
    loadSession: 30000,
    client: 30000,
  },
  // Updated constants to match new webhook structure
  SOLUTION_WEBHOOK: import.meta.env.VITE_MAKE_SOLUTION_WEBHOOK,
  CREATE_SESSION_WEBHOOK: import.meta.env.VITE_MAKE_CREATE_SESSION_WEBHOOK,
  LOAD_SESSION_WEBHOOK: import.meta.env.VITE_MAKE_LOAD_SESSION_WEBHOOK,
  SOLUTION_TIMEOUT: 30000,
  CREATE_SESSION_TIMEOUT: 30000,
  LOAD_SESSION_TIMEOUT: 30000,
  SOLUTION_RETRIES: 3,
  SESSION_RETRIES: 3
};