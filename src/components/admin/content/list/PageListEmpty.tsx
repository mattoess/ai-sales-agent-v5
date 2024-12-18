import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '../../../ui/button';

interface PageListEmptyProps {
  onCreateNew: () => void;
}

export function PageListEmpty({ onCreateNew }: PageListEmptyProps) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
      <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
      <p className="text-gray-500 mb-4">Get started by creating a new page</p>
      <Button onClick={onCreateNew}>Create New Page</Button>
    </div>
  );
}