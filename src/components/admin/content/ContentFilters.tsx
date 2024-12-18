import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ContentFiltersProps {
  selectedStatus: string[];
  onStatusChange: (status: string) => void;
}

export function ContentFilters({ selectedStatus, onStatusChange }: ContentFiltersProps) {
  const statuses = ['all', 'published', 'draft', 'archived'];

  return (
    <div className="flex items-center space-x-2">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={selectedStatus.includes(status) ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange(status)}
          className="capitalize"
        >
          {status}
          {selectedStatus.includes(status) && status !== 'all' && (
            <Badge variant="secondary" className="ml-2">
              {Math.floor(Math.random() * 10)}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}