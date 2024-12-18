import { useState, useCallback } from 'react';
import { Page } from '../../types/content';

export function usePageList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Implement API call here
      const response = await fetch('/api/pages');
      const data = await response.json();
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePage = useCallback(async (id: string) => {
    try {
      // Implement API call here
      await fetch(`/api/pages/${id}`, { method: 'DELETE' });
      setPages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete page');
    }
  }, []);

  return {
    pages,
    isLoading,
    error,
    fetchPages,
    deletePage,
  };
}