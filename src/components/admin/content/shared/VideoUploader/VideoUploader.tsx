// src/components/admin/content/shared/VideoUploader/VideoUploader.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VideoHeader } from './VideoHeader';
import { VideoInput } from './VideoInput';
import { VideoList } from './VideoList';
import type { Video } from './types';
import { validateYouTubeUrl } from '../../utils/validation';
import { useEmbeddingQueue } from '../../hooks/useEmbeddingQueue';
import { AppError, ErrorType } from '@/services/errors';

export function VideoUploader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string>();
  const [videos, setVideos] = useState<Video[]>([]);
  const { embedVideo } = useEmbeddingQueue();

  const handleAddVideo = async () => {
    try {
      if (!validateYouTubeUrl(url)) {
        throw new AppError(
          ErrorType.VALIDATION,
          'Please enter a valid YouTube URL'
        );
      }

      // Create new video object
      const newVideo: Video = {
        id: crypto.randomUUID(),
        url,
        title: 'Processing...', // Will be updated after fetch
        status: 'pending',
      };

      setVideos(prev => [...prev, newVideo]);
      setUrl('');
      setError(undefined);

      // Process video
      await embedVideo(newVideo);

    } catch (error) {
      setError(error instanceof AppError ? error.message : 'Failed to add video');
    }
  };

  return (
    <Card>
      <CardHeader>
        <VideoHeader />
      </CardHeader>
      <CardContent className="space-y-6">
        <VideoInput
          url={url}
          onUrlChange={setUrl}
          onAdd={handleAddVideo}
          error={error}
        />
        <VideoList 
          videos={videos}
          onDelete={(id) => setVideos(prev => prev.filter(v => v.id !== id))}
          onRetry={async (id) => {
            const video = videos.find(v => v.id === id);
            if (video) await embedVideo(video);
          }}
        />
      </CardContent>
    </Card>
  );
}