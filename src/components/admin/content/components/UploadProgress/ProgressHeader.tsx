import React from 'react';
import { Badge } from '../../../../ui/badge';

interface ProgressHeaderProps {
  activeUploadsCount: number;
}

export function ProgressHeader({ activeUploadsCount }: ProgressHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium">Uploading Files</h3>
      <Badge variant="outline">
        {activeUploadsCount} remaining
      </Badge>
    </div>
  );
}