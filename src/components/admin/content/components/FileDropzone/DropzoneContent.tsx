import React from 'react';
import { Upload } from 'lucide-react';

interface DropzoneContentProps {
  isDragActive: boolean;
}

export function DropzoneContent({ isDragActive }: DropzoneContentProps) {
  return (
    <div className="text-center">
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-sm text-gray-600">
        {isDragActive 
          ? 'Drop the files here...' 
          : 'Drag and drop files here, or use cloud storage options below'}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Supported files: PDF, DOC, DOCX
      </p>
    </div>
  );
}