import type { Document } from '../../types';
import { FileListItem } from './FileListItem';

interface FileListProps {
  files: Document[];
  onRemove?: (id: string) => void;
  isLoading?: boolean;
}

export function FileList({ 
  files, 
  onRemove,
  isLoading = false 
}: FileListProps) {
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
          onRemove={onRemove ? () => onRemove(file.id) : undefined}
          disabled={isLoading}
        />
      ))}
    </div>
  );
}