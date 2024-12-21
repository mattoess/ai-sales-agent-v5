import { withRetry } from './retry';
import { MakeApiError, NetworkError } from './errors';
import { MAKE_CONFIG } from './config';

export async function makeApiRequest<T>(
  endpoint: keyof typeof MAKE_CONFIG.urls,
  payload: unknown,
  validateResponse: (data: unknown) => data is T
): Promise<T> {
  return withRetry(async () => {
    try {
      const response = await fetch(MAKE_CONFIG.urls[endpoint], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new MakeApiError(
          `Make.com ${endpoint} request failed`,
          response.status
        );
      }

      const data = await response.json();
      
      if (!validateResponse(data)) {
        throw new MakeApiError('Invalid response format from Make.com');
      }

      return data;
    } catch (error) {
      if (error instanceof MakeApiError) throw error;
      if (error instanceof TypeError) {
        throw new NetworkError('Network request failed', error);
      }
      throw new MakeApiError('Unknown error occurred', undefined, error);
    }
  }, {
    maxAttempts: MAKE_CONFIG.retry.maxAttempts,
    delayMs: MAKE_CONFIG.retry.delayMs
  });
}