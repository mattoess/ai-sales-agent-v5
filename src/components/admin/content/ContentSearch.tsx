import React from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface ContentSearchProps {
  onSearch: (query: string) => void;
}

export function ContentSearch({ onSearch }: ContentSearchProps) {
  return (
    <div className="flex items-center space-x-4">
      <Input 
        placeholder="Search pages..." 
        className="max-w-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button variant="outline">Filter</Button>
    </div>
  );
}