import React from 'react';
import { Progress } from '../../../../ui/progress';
import { FileUploadProgress } from '../../types';

interface ProgressItemProps {
  upload: FileUploadProgress;
}

export function ProgressItem({ upload }: ProgressItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="truncate">{upload.fileId}</span>
        <span>{upload.progress}%</span>
      </div>
      <Progress value={upload.progress} />
    </div>
  );
}