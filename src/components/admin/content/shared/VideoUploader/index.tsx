import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../../../ui/card';
import { VideoHeader } from './VideoHeader';
import { VideoInput } from './VideoInput';
import { VideoList } from './VideoList';
import { Video } from '../../types';
import { validateYouTubeUrl } from '../../utils/validation';

export function VideoUploader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string>();
  const [videos, setVideos] = useState<Video[]>([]);

  const handleAddVideo = () => {
    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      url,
      title: 'Sample Video Title',
      description: 'Sample video description',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
    };

    setVideos([...videos, newVideo]);
    setUrl('');
    setError(undefined);
  };

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
          />
          <VideoList videos={videos} />
        </div>
      </CardContent>
    </Card>
  );
}