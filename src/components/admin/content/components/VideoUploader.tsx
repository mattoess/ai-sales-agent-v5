import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Youtube, Info } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Tooltip } from '../../../ui/tooltip';
import { Video } from '../types';

export function VideoUploader() {
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);

  const handleAddVideo = () => {
    // Simple validation for demo purposes
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
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
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-600" />
              Solution Videos
            </CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                Add video content to enhance your solution presentations
              </p>
              <Tooltip content="Add YouTube videos showcasing product demos, customer testimonials, or solution walkthroughs">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddVideo}>Add Video</Button>
          </div>
          <div className="grid gap-4">
            {videos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                No videos added yet
              </div>
            ) : (
              videos.map((video) => (
                <div key={video.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}