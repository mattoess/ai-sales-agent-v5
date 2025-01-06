// src/components/admin/content/components/ProcessingQueue/QueueItem.tsx
import React from 'react';
import { Progress } from '../../../../ui/progress';
import { File, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Document } from '../../types';
import { ErrorDisplay } from '../../../../ui/error-display';
import { useEmbeddingQueue } from '../../../../../hooks/useEmbeddingQueue';

interface QueueItemProps {
  document: Document;
}

export function QueueItem({ document }: QueueItemProps) {
  const { getError } = useEmbeddingQueue();
  const error = getError(document.id);

  const getStatusDetails = () => {
    switch (document.status) {
      case 'waiting':
        return {
          icon: <Clock className="w-4 h-4 text-gray-400" />,
          label: 'Waiting to process...',
          progress: 0
        };
      case 'processing':
        return {
          icon: <File className="w-4 h-4 text-blue-500 animate-pulse" />,
          label: 'Processing content...',
          progress: 50
        };
      case 'embedded':
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          label: 'Processing complete',
          progress: 100
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          label: 'Processing failed',
          progress: 100
        };
      default:
        return {
          icon: <File className="w-4 h-4 text-gray-400" />,
          label: 'Not processed',
          progress: 0
        };
    }
  };

  const { icon, label, progress } = getStatusDetails();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{document.name}</span>
        </div>
        <span className="text-xs text-gray-500">
          {document.contentType?.primary || 'Document'}
        </span>
      </div>
      
      <Progress value={progress} className="h-1" />
      
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-400">
          {document.metadata?.solutions?.length || 0} solutions tagged
        </span>
      </div>

      {error && (
        <ErrorDisplay
          type={error.type}
          message={error.message}
          details={error.context.details}
          className="mt-2"
        />
      )}
    </div>
  );
}