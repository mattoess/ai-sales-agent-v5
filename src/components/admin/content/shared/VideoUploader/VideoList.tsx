// src/components/admin/content/shared/VideoUploader/VideoList.tsx
import React from 'react';
import type { Video, VideoListProps, VideoListItemProps } from './types';
import { VideoListItem } from './VideoListItem';

export const VideoList: React.FC<VideoListProps> = ({ videos, onDelete, onRetry }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
        No videos added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <VideoListItem 
          key={video.id} 
          video={video}
          onDelete={onDelete ? () => onDelete(video.id) : undefined}
          onRetry={onRetry ? async () => await onRetry(video.id) : undefined}
        />
      ))}
    </div>
  );
};