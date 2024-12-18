import React from 'react';
import { FolderPlus, Tag, Upload, Filter } from 'lucide-react';
import { FileActionButton } from './FileActionButton';

interface FileActionsProps {
  onNewFolder: () => void;
  onManageTags: () => void;
  onUpload?: () => void;
  onFilter?: () => void;
}

export function FileActions({ 
  onNewFolder, 
  onManageTags, 
  onUpload, 
  onFilter 
}: FileActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {onUpload && (
        <FileActionButton
          icon={Upload}
          label="Upload Files"
          onClick={onUpload}
        />
      )}
      <FileActionButton
        icon={FolderPlus}
        label="New Folder"
        onClick={onNewFolder}
      />
      <FileActionButton
        icon={Tag}
        label="Manage Tags"
        onClick={onManageTags}
      />
      {onFilter && (
        <FileActionButton
          icon={Filter}
          label="Filter"
          onClick={onFilter}
        />
      )}
    </div>
  );
}