// src/components/admin/content/shared/VideoUploader/VideoInput.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Remove the duplicate interface since it's imported
import type { VideoInputProps } from './types';

export const VideoInput: React.FC<VideoInputProps> = ({
  url,
  onUrlChange,
  onAdd,
  error,
  disabled
}) => {
  const handleAdd = async () => {
    await onAdd();
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Enter YouTube URL..."
          className={error ? 'border-red-500' : ''}
          disabled={disabled}
        />
        <Button
          onClick={handleAdd}
          disabled={disabled || !url}
        >
          {disabled ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Add Video'
          )}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};