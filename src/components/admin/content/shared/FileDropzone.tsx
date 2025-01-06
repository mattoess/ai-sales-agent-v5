import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { AppError, ErrorType } from '@/services/errors';
import type { SetStateAction, Dispatch } from 'react';

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

interface FileDropzoneProps {
  onFileSelect: (files: File[]) => void;
  onError?: Dispatch<SetStateAction<AppError | null>>;
  className?: string;
}

export function FileDropzone({ 
  onFileSelect,
  onError,
  className = ''
}: FileDropzoneProps) {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.some(file => file.size > MAX_SIZE)) {
        throw new AppError(
          ErrorType.VALIDATION,
          'File size exceeds limit',
          {
            details: {
              maxSize: '50MB',
              files: acceptedFiles.map(f => ({
                name: f.name,
                size: f.size
              }))
            }
          }
        );
      }

      onFileSelect(acceptedFiles);
    } catch (error) {
      if (onError) {
        onError(error instanceof AppError ? error : new AppError(
          ErrorType.VALIDATION,
          'File upload error',
          { originalError: error }
        ));
      }
    }
  }, [onFileSelect, onError]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragReject 
  } = useDropzone({
    onDrop: handleDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      if (onError) {
        onError(new AppError(
          ErrorType.VALIDATION,
          'Invalid file type or size',
          {
            details: {
              files: fileRejections.map(rejection => ({
                name: rejection.file.name,
                errors: rejection.errors.map(err => err.message)
              }))
            }
          }
        ));
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center 
        transition-colors cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
        ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        ${className}
      `}
    >
      <input {...getInputProps()} />
      <Upload className={`
        w-12 h-12 mx-auto mb-4
        ${isDragReject ? 'text-red-400' : 'text-gray-400'}
      `} />
      
      <p className="text-sm text-gray-600">
        {isDragActive 
          ? isDragReject 
            ? 'Some files are not supported...'
            : 'Drop the files here...'
          : 'Drag and drop files here, or click to select files'
        }
      </p>
      
      <p className="text-xs text-gray-500 mt-2">
        Supported files: PDF, DOC, DOCX (max 50MB)
      </p>
    </div>
  );
}