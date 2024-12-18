import React from 'react';
import { Video } from '../../types';
import { Button } from '../../../../ui/button';
import { MoreVertical, Play, ExternalLink } from 'lucide-react';

interface VideoListItemProps {
  video: Video;
}

export function VideoListItem({ video }: VideoListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{video.title}</h4>
          <p className="text-sm text-gray-500">{video.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button variant="ghost" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          Open
        </Button>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}