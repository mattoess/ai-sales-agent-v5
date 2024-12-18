import React from 'react';
import { FileInput } from './FileInput';
import { FileList } from './FileList';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useDocumentStore } from '../../hooks/useDocumentStore';

export function FileUploader() {
  const { uploadFiles, isUploading } = useFileUpload();
  const { documents, currentPath } = useDocumentStore();

  const handleFileSelect = (files: FileList) => {
    uploadFiles(files, currentPath);
  };

  const handleRemoveFile = (id: string) => {
    // Implement file removal logic
  };

  return (
    <div className="space-y-4">
      <FileInput onFileSelect={handleFileSelect} />
      <FileList 
        files={documents}
        onRemove={handleRemoveFile}
      />
    </div>
  );
}