// src/services/make/api.ts
import { AppError, ErrorType } from '../errors';
import { MAKE_CONFIG } from './config';

export async function makeApiRequest<T>(
  endpoint: string,
  payload: any,
  validateResponse: (data: unknown) => data is T,
  timeoutMs: number = MAKE_CONFIG.timeouts.solution,
  maxAttempts: number = MAKE_CONFIG.retry.maxAttempts,
  delayMs: number = MAKE_CONFIG.retry.delayMs,
  maxDelayMs: number = MAKE_CONFIG.retry.maxDelayMs
): Promise<T> {
  let attempt = 0;

  while (attempt < maxAttempts) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      console.log('🌐 Making fetch request to:', endpoint);
      console.log('📦 Payload:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new AppError(ErrorType.API, `HTTP error! Status: ${response.status}`, {
          statusCode: response.status,
          details: { endpoint, attempt: attempt + 1 }
        });
      }

      console.log('✅ Response status:', response.status);
      const data = await response.json();
      console.log('📄 Raw response data:', data);

      try {
        if (!validateResponse(data)) {
          throw new AppError(ErrorType.VALIDATION, 'Response validation failed', {
            details: { endpoint, data }
          });
        }
        return data;
      } catch (validationError) {
        throw new AppError(
          ErrorType.VALIDATION,
          'Invalid response format',
          {
            originalError: validationError,
            details: { endpoint, data }
          }
        );
      }

    } catch (error) {
      attempt++;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('⏱️ Request timed out');
          if (attempt >= maxAttempts) {
            throw new AppError(ErrorType.NETWORK, 'Request timeout after all retries', {
              details: { endpoint, attempts: maxAttempts }
            });
          }
        } else {
          console.error(`❌ Attempt ${attempt} failed:`, error);
          if (attempt >= maxAttempts) {
            throw AppError.fromError(error);
          }
        }
      }

      // Exponential backoff delay
      const delay = Math.min(delayMs * Math.pow(2, attempt - 1), maxDelayMs);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached due to the throws above, but TypeScript wants it
  throw new AppError(ErrorType.SYSTEM, 'Unexpected end of makeApiRequest');
}