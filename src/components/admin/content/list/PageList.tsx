import React from 'react';
import { usePages } from '../../../../hooks/usePages';
import { PageListItem } from './PageListItem';
import { PageListEmpty } from './PageListEmpty';

interface PageListProps {
  onEditPage: (pageId?: string) => void;
  filters: {
    status: string[];
    search: string;
  };
}

export function PageList({ onEditPage, filters }: PageListProps) {
  const { pages, isLoading } = usePages();

  if (isLoading) {
    return <div className="text-center py-12">Loading pages...</div>;
  }

  if (pages.length === 0) {
    return <PageListEmpty onCreateNew={() => onEditPage()} />;
  }

  const filteredPages = pages.filter(page => {
    if (filters.status.includes('all')) return true;
    return filters.status.includes(page.status);
  }).filter(page => {
    if (!filters.search) return true;
    return page.title.toLowerCase().includes(filters.search.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {filteredPages.map((page) => (
        <PageListItem 
          key={page.title} 
          page={page} 
          onEdit={() => onEditPage(page.id)}
        />
      ))}
    </div>
  );
}