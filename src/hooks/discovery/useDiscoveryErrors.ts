import { useState, useCallback } from 'react';
import { MakeApiError, ValidationError } from '../../services/make/errors';

export function useDiscoveryErrors() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof MakeApiError) {
      setError(`API Error: ${error.message}${error.statusCode ? ` (${error.statusCode})` : ''}`);
    } else if (error instanceof ValidationError) {
      setError(`Validation Error: ${error.message}`);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
    console.error('Discovery error:', error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}