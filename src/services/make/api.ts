// src/services/make/api.ts

import { ValidationError } from './errors';
import { MAKE_CONFIG } from './config';

export async function makeApiRequest<T>(
  endpoint: string,
  payload: any,
  validateResponse: (data: unknown) => data is T,
  timeoutMs: number = MAKE_CONFIG.timeouts.request, // Default timeout from config
  maxAttempts: number = MAKE_CONFIG.retry.maxAttempts, // Default max attempts from config
  delayMs: number = MAKE_CONFIG.retry.delayMs, // Default delay between attempts from config
  maxDelayMs: number = MAKE_CONFIG.retry.maxDelayMs // Default max delay from config
): Promise<T | null> {
  let attempt = 0;

  while (attempt < maxAttempts) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!validateResponse(data)) {
        throw new ValidationError('Invalid response format');
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error(`Attempt ${attempt + 1} failed:`, error);
      }

      attempt++;

      if (attempt >= maxAttempts) {
        console.error('Max attempts reached');
        return null;
      }

      // Exponential backoff delay
      const delay = Math.min(delayMs * Math.pow(2, attempt - 1), maxDelayMs);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return null;
}