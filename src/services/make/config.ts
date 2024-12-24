export const MAKE_CONFIG = {
  urls: {
    discovery: 'https://hook.us2.make.com/qx0twe651e9jiwlbpri5tjzo3dx3bov2',
    solution: 'https://hook.us2.make.com/f5nyskdeceb7fw9bngef54925crhmi5o',
    session: 'https://hook.us2.make.com/4rwh4wmldfn7rqzv3mnfrk0dfn1cpzsh'
  },
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
    maxDelayMs: 20000
  },
  timeouts: {
    request: 30000 // 30 seconds
  }
} as const;