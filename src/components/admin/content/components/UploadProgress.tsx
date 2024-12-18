import React from 'react';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { FileUploadProgress } from '../types';

function ProgressItem({ upload }: { upload: FileUploadProgress }) {
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

export function UploadProgress() {
  const { uploadProgress } = useDocumentStore();
  
  const activeUploads = Object.values(uploadProgress).filter(
    (p) => p.status === 'uploading' || p.status === 'processing'
  );

  if (activeUploads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Uploading Files</h3>
        <Badge variant="outline">
          {activeUploads.length} remaining
        </Badge>
      </div>
      {activeUploads.map((upload) => (
        <ProgressItem key={upload.fileId} upload={upload} />
      ))}
    </div>
  );
}