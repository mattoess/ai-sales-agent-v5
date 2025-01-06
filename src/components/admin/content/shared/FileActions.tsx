import React from 'react';
import { Button } from '../../../ui/button';
import { FolderPlus, Tag } from 'lucide-react';

interface FileActionsProps {
  onNewFolder: () => void;
  onManageTags: () => void;
}

export function FileActions({ onNewFolder, onManageTags }: FileActionsProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onNewFolder}
        className="flex items-center gap-2"
      >
        <FolderPlus className="w-4 h-4" />
        New Folder
      </Button>
      <Button 
        variant="outline" 
        onClick={onManageTags}
        className="flex items-center gap-2"
      >
        <Tag className="w-4 h-4" />
        Manage Tags
      </Button>
    </div>
  );
}