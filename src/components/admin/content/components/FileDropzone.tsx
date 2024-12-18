import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import { useDocumentStore } from '../hooks/useDocumentStore';

export function FileDropzone() {
  const { currentPath } = useDocumentStore();
  const { uploadFiles } = useFileUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const fileList = Object.assign(acceptedFiles, {
        item: (index: number) => acceptedFiles[index],
        length: acceptedFiles.length
      }) as unknown as FileList;
      uploadFiles(fileList, currentPath);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-sm text-gray-600">
        {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to select files'}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Supported files: PDF, DOC, DOCX
      </p>
    </div>
  );
}