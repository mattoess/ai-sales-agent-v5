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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(MAKE_CONFIG.urls[endpoint], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new MakeApiError(
          `Make.com ${endpoint} request failed: ${errorBody}`,
          response.status
        );
      }

      const data = await response.json();
      
      if (!validateResponse(data)) {
        throw new MakeApiError(
          `Invalid response format from Make.com: ${JSON.stringify(data)}`
        );
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof MakeApiError) throw error;
      if (error instanceof TypeError) {
        throw new NetworkError('Network request failed', error);
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Request timeout', error);
      }
      throw new MakeApiError('Unknown error occurred', undefined, error);
    }
  }, {
    maxAttempts: MAKE_CONFIG.retry.maxAttempts,
    delayMs: MAKE_CONFIG.retry.delayMs
  });
}