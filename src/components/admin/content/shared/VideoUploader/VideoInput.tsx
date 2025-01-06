import React from 'react';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';

interface VideoInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAdd: () => void;
  error?: string;
}

export function VideoInput({ url, onUrlChange, onAdd, error }: VideoInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
      <Button type="submit">Add Video</Button>
    </form>
  );
}