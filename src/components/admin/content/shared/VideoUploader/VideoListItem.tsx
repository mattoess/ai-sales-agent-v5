// src/components/admin/content/shared/VideoUploader/VideoListItem.tsx
import React from 'react';
import type { VideoListItemProps, VideoStatus } from './types';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, RefreshCw } from 'lucide-react';

export const VideoListItem: React.FC<VideoListItemProps> = ({
  video,
  onDelete,
  onRetry
}) => {
  const isProcessing = video.status === 'processing' || video.status === 'pending';

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div className="flex items-center space-x-4">
        {video.thumbnail && (
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <h4 className="font-medium">{video.title}</h4>
          <p className="text-sm text-gray-500">{video.description}</p>
          <span className={`text-xs ${getStatusColor(video.status)}`}>
            {video.status || 'pending'}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {video.status === 'failed' && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        )}
        
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            disabled={isProcessing}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status?: VideoStatus): string => {
  switch (status) {
    case 'embedded':
      return 'text-green-600';
    case 'failed':
      return 'text-red-600';
    case 'processing':
    case 'pending':
      return 'text-blue-600';
    default:
      return 'text-gray-500';
  }
};