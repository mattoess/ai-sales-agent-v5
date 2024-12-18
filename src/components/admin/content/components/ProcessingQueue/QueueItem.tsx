import React from 'react';
import { Progress } from '../../../../ui/progress';
import { Document } from '../../types';

interface QueueItemProps {
  document: Document;
}

export function QueueItem({ document }: QueueItemProps) {
  const progress = document.status === 'processing' ? 50 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">{document.name}</span>
        <span className="text-gray-500">
          {document.status === 'processing' ? 'Processing...' : 'Waiting...'}
        </span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
}