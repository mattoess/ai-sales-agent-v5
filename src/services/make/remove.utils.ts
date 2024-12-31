import { MakeApiError, NetworkError } from './errors';

export async function makeRequest<T>(url: string, payload: unknown): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new MakeApiError(
        'Make.com API request failed',
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof MakeApiError) {
      throw error;
    }
    
    if (error instanceof TypeError) {
      throw new NetworkError('Network request failed', error);
    }
    
    throw new MakeApiError('Unknown error occurred', undefined, error);
  }
}

export function formatDiscoveryPayload(data: any) {
  return {
    Barriers: Array.isArray(data.barriers) ? data.barriers.join('\r\n') : '',
    'Barriers Financial Impact': data.financialImpact || '',
    'Barriers Personal Impact': data.emotionalImpact || '',
    'Outcome Financial Impact': data.futureOutcomeImpact || '',
    Outcomes: Array.isArray(data.outcomes) ? data.outcomes.join('\r\n') : '',
    'Outcomes Personal Impact': data.emotionalRelief || '',
    'Prospect Email Address': data.email || '',
    'Prospect First Name': data.firstName || '',
    'Prospect Last Name': data.lastName || '',
    Urgency: data.targetDate || ''
  };
}