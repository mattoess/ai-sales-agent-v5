import React from 'react';
import { ContentSearch } from '../ContentSearch';
import { ContentFilters } from '../ContentFilters';

interface PageListHeaderProps {
  onSearch: (query: string) => void;
  selectedStatus: string[];
  onStatusChange: (status: string) => void;
}

export function PageListHeader({ onSearch, selectedStatus, onStatusChange }: PageListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ContentSearch onSearch={onSearch} />
      <ContentFilters
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}