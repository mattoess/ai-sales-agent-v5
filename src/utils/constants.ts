export const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export const SOLUTION_OPTIONS = [
  'Executive Team Coaching',
  'Executive 1:1 Coaching',
  'Executive Readiness Coaching',
] as const;

export type SolutionOption = typeof SOLUTION_OPTIONS[number];

export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  ONBOARDING_WELCOME: '/onboarding/welcome'
} as const;