interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  delayMs: 1000,
  shouldRetry: (error) => {
    if (error instanceof Error) {
      // Retry on network errors or 5xx server errors
      return error.name === 'NetworkError' || 
        (error.name === 'MakeApiError' && /^5\d{2}$/.test((error as any).statusCode?.toString()));
    }
    return false;
  }
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const { maxAttempts, delayMs, shouldRetry } = { ...defaultOptions, ...options };
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError;
}