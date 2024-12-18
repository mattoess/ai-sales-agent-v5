const MAKE_ONBOARDING_WEBHOOK = import.meta.env.VITE_MAKE_ONBOARDING_WEBHOOK;

export interface OnboardingResponse {
  clientId: string;
  status: 'success' | 'error';
  message?: string;
}

export async function createClient(data: {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}): Promise<OnboardingResponse> {
  try {
    const response = await fetch(MAKE_ONBOARDING_WEBHOOK, {
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
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      clientId: result.clientId,
      status: 'success'
    };
  } catch (error) {
    console.error('Onboarding integration error:', error);
    throw error;
  }
}