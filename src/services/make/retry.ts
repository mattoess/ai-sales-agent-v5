interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  delayMs: 1000, // Start with 1 second
  maxDelayMs: 20000, // Cap at 20 seconds
  shouldRetry: (error) => {
    if (error instanceof Error) {
      if (error.name === 'NetworkError') return true;
      
      if (error.name === 'MakeApiError') {
        const statusCode = (error as any).statusCode?.toString();
        // Retry on 429 (rate limit) and 5xx errors
        return statusCode === '429' || /^5\d{2}$/.test(statusCode);
      }
    }
    return false;
  }
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: unknown;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === opts.maxAttempts || !opts.shouldRetry(error)) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const baseDelay = Math.min(
        opts.delayMs * Math.pow(2, attempt - 1),
        opts.maxDelayMs
      );
      const jitter = Math.random() * 0.3 * baseDelay; // 30% jitter
      const delay = baseDelay + jitter;

      console.log(`Retry attempt ${attempt}/${opts.maxAttempts} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}