import { MAKE_CONFIG } from './make/config.ts';

export interface OnboardingResponse {
  clientId: string;
  userId: string;
  status: 'success' | 'error';
  message?: string;
}

export async function createClient(data: {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  clerkUserId: string;
}): Promise<OnboardingResponse> {
  try {
    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        companyName: data.companyName,
        clerkUserId: data.clerkUserId,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.clientId || !result.userId) {
      throw new Error('Invalid response: missing required fields');
    }

    return {
      clientId: result.clientId,
      userId: result.userId,
      status: 'success'
    };
  } catch (error) {
    console.error('Onboarding integration error:', error);
    return {
      clientId: '',
      userId: '',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}