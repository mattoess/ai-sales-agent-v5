import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import { DropzoneContent } from './DropzoneContent';

export function FileDropzone() {
  const { currentPath } = useDocumentStore();
  const { uploadFiles } = useFileUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => uploadFiles(files as unknown as FileList, currentPath),
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'bg-primary/5' : 'bg-transparent'
      }`}
    >
      <input {...getInputProps()} />
      <DropzoneContent isDragActive={isDragActive} />
    </div>
  );
}