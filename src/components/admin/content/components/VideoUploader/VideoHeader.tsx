import React from 'react';
import { Youtube, Info } from 'lucide-react';
import { CardTitle } from '../../../../ui/card';
import { Tooltip } from '../../../../ui/tooltip';

export function VideoHeader() {
  return (
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
  );
}