import { useState } from 'react';

interface ContentFilters {
  status: string[];
  search: string;
}

export function useContentManager() {
  const [filters, setFilters] = useState<ContentFilters>({
    status: ['all'],
    search: '',
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleStatusChange = (status: string) => {
    if (status === 'all') {
      setFilters({ ...filters, status: ['all'] });
    } else {
      const newStatus = filters.status.includes('all')
        ? [status]
        : filters.status.includes(status)
        ? filters.status.filter((s) => s !== status)
        : [...filters.status, status];
      
      setFilters({ ...filters, status: newStatus.length ? newStatus : ['all'] });
    }
  };

  const handleSearch = (query: string) => {
    setFilters({ ...filters, search: query });
  };

  const openEditor = (pageId?: string) => {
    setSelectedPage(pageId || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setSelectedPage(null);
    setIsEditorOpen(false);
  };

  return {
    filters,
    isEditorOpen,
    selectedPage,
    handleStatusChange,
    handleSearch,
    openEditor,
    closeEditor,
  };
}