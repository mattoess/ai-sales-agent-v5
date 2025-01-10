// src/services/make/config.ts
export const MAKE_CONFIG = {
  urls: {
    discovery: import.meta.env.VITE_MAKE_DISCOVERY_WEBHOOK,
    solution: import.meta.env.VITE_MAKE_SOLUTION_WEBHOOK,
    createSession: import.meta.env.VITE_MAKE_CREATE_SESSION_WEBHOOK,
    loadSession: import.meta.env.VITE_MAKE_LOAD_SESSION_WEBHOOK,
    client: import.meta.env.VITE_MAKE_CLIENT_WEBHOOK,
    content: {
      process: import.meta.env.VITE_MAKE_CONTENT_PROCESS_WEBHOOK,
      embed: import.meta.env.VITE_MAKE_CONTENT_EMBED_WEBHOOK,
      analyze: import.meta.env.VITE_MAKE_CONTENT_ANALYZE_WEBHOOK,
      solutionOptions: import.meta.env.VITE_MAKE_CONTENT_SOLUTION_OPTIONS_WEBHOOK,
    }
  },
  retry: {
    maxAttempts: 1,
    delayMs: 2000,
    maxDelayMs: 20000,
  },
  timeouts: {
    discovery: 30000,
    solution: 30000,
    createSession: 30000,
    loadSession: 30000,
    client: 30000,
    content: {
      process: 60000,    // Content processing might take longer
      embed: 45000,
      analyze: 30000,
    }
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