import React from 'react';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import { ProgressHeader } from './ProgressHeader';
import { ProgressItem } from './ProgressItem';

export function UploadProgress() {
  const { uploadProgress } = useDocumentStore();
  
  const activeUploads = Object.values(uploadProgress).filter(
    (p) => p.status === 'uploading' || p.status === 'processing'
  );

  if (activeUploads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border p-4 space-y-4">
      <ProgressHeader activeUploadsCount={activeUploads.length} />
      {activeUploads.map((upload) => (
        <ProgressItem key={upload.fileId} upload={upload} />
      ))}
    </div>
  );
}