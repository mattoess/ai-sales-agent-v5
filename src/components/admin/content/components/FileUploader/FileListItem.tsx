import React from 'react';
import { Document } from '../../types';
import { FileText, X } from 'lucide-react';
import { formatFileSize } from '../../utils/format';

interface FileListItemProps {
  file: Document;
  onRemove: () => void;
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          {file.size && (
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          )}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-gray-200 rounded-full"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}