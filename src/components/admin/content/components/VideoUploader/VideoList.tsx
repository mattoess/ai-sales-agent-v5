import React from 'react';
import { Video } from '../../types';
import { VideoListItem } from './VideoListItem';

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
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
        <VideoListItem key={video.id} video={video} />
      ))}
    </div>
  );
}