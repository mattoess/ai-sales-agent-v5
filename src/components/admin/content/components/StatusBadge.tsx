import React from 'react';
import { Badge } from '../../../ui/badge';
import { Document } from '../types';

interface StatusBadgeProps {
  status: Document['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'not_embedded':
      return <Badge variant="outline">Not Embedded Yet</Badge>;
    case 'waiting':
      return <Badge variant="secondary">Waiting in Queue</Badge>;
    case 'processing':
      return <Badge variant="default" className="animate-pulse bg-blue-500">Processing</Badge>;
    case 'embedded':
      return <Badge variant="default" className="bg-green-500">Embedded</Badge>;
    case 'failed':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return null;
  }
}