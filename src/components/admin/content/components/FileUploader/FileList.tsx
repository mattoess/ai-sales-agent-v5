import React from 'react';
import { Document } from '../../types';
import { FileListItem } from './FileListItem';

interface FileListProps {
  files: Document[];
  onRemove: (id: string) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No files selected
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileListItem
          key={file.id}
          file={file}
          onRemove={() => onRemove(file.id)}
        />
      ))}
    </div>
  );
}