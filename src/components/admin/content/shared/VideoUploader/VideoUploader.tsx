// src/components/admin/content/shared/VideoUploader/VideoUploader.tsx
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VideoHeader } from './VideoHeader';
import { VideoInput } from './VideoInput';
import { VideoList } from './VideoList';
import type { Video } from './types';
import { validateYouTubeUrl } from '../../utils/validation';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import { AppError, ErrorType } from '@/services/errors';

export function VideoUploader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { embedVideo } = useEmbeddingQueue();

  const handleAddVideo = useCallback(async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setError(undefined);

      if (!validateYouTubeUrl(url)) {
        throw new AppError(
          ErrorType.VALIDATION,
          'Please enter a valid YouTube URL'
        );
      }

      const newVideo: Video = {
        id: crypto.randomUUID(),
        url,
        title: 'Processing...',
        description: '',
        thumbnail: '',
        status: 'pending'
      };

      setVideos(prev => [...prev, newVideo]);
      await embedVideo(newVideo);
      setUrl('');

    } catch (err) {
      setError(
        err instanceof AppError 
          ? err.message 
          : 'Failed to add video. Please try again.'
      );
      setVideos(prev => prev.filter(v => v.url !== url));
    } finally {
      setIsProcessing(false);
    }
  }, [url, isProcessing, embedVideo]);

  const handleDelete = useCallback((id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id));
  }, []);

  const handleRetry = useCallback(async (id: string) => {
    const video = videos.find(v => v.id === id);
    if (!video) return;

    try {
      setError(undefined);
      setVideos(prev => 
        prev.map(v => v.id === id ? { ...v, status: 'pending' } : v)
      );
      await embedVideo(video);
    } catch (err) {
      setError(
        err instanceof AppError 
          ? err.message 
          : 'Failed to process video. Please try again.'
      );
      setVideos(prev =>
        prev.map(v => v.id === id ? { ...v, status: 'failed' } : v)
      );
    }
  }, [videos, embedVideo]);

  return (
    <Card>
      <CardHeader>
        <VideoHeader />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <VideoInput
            url={url}
            onUrlChange={setUrl}
            onAdd={handleAddVideo}
            error={error}
            disabled={isProcessing}
          />
          <VideoList 
            videos={videos}
            onDelete={handleDelete}
            onRetry={handleRetry}
          />
        </div>
      </CardContent>
    </Card>
  );
}