// src/services/make/api.ts

import { ValidationError } from './errors';
import { MAKE_CONFIG } from './config';

export async function makeApiRequest<T>(
  endpoint: string,
  payload: any,
  validateResponse: (data: unknown) => data is T,
  timeoutMs: number = MAKE_CONFIG.timeouts.solution,
  maxAttempts: number = MAKE_CONFIG.retry.maxAttempts,
  delayMs: number = MAKE_CONFIG.retry.delayMs,
  maxDelayMs: number = MAKE_CONFIG.retry.maxDelayMs
): Promise<T | null> {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('✅ Response status:', response.status);
      const data = await response.json();
      console.log('📄 Raw response data:', data);

      // Let the service handle specific validations
      const isValid = validateResponse(data);
      console.log('🔍 Validation result:', isValid);
      console.log('📋 Data type:', typeof data);
      console.log('📊 Is array?', Array.isArray(data));
      if (Array.isArray(data) && data.length > 0) {
        console.log('📎 First item:', data[0]);
        console.log('📌 First item body type:', typeof data[0]?.body);
      }

      if (!isValid) {
        console.error('❌ Validation failed for response:', data);
        throw new ValidationError('Response validation failed');
      }

      return data;
    } catch (error) {
      attempt++;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('⏱️ Request timed out');
        } else {
          console.error(`❌ Attempt ${attempt} failed:`, error);
          if (error instanceof ValidationError) {
            console.error('🚫 Validation details:', error.message);
          }
        }
      }

      if (attempt >= maxAttempts) {
        console.error('🔴 Max attempts reached');
        return null;
      }

      // Exponential backoff delay
      const delay = Math.min(delayMs * Math.pow(2, attempt - 1), maxDelayMs);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return null;
}