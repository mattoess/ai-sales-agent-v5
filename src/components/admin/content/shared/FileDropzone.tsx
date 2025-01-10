// src/components/admin/content/shared/FileDropzone.tsx
import { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppError, ErrorType } from '@/services/errors';

interface FileDropzoneProps {
  onFileSelect: (files: File[]) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  }, []);

  const validateFiles = useCallback((files: File[]): boolean => {
    const allowedTypes = [
      'application/pdf',                                                         // .pdf
      'application/msword',                                                     // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        handleError('Invalid file type. Only PDF and Word documents are allowed.');
        return false;
      }
      if (file.size > maxSize) {
        handleError('File too large. Maximum size is 10MB.');
        return false;
      }
    }
    return true;
  }, [handleError]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (validateFiles(droppedFiles)) {
      onFileSelect(droppedFiles);
    }
  }, [onFileSelect, validateFiles]);

const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  if (validateFiles(selectedFiles)) {
    onFileSelect(selectedFiles);
  }
  e.target.value = '';
}, [onFileSelect, validateFiles]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
        error ? "border-red-500 bg-red-50" : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
        multiple
        accept=".pdf,.doc,.docx"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            or click to browse
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};