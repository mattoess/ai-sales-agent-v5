import React from 'react';
import { FolderPlus, Folder } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { generateId } from '../utils/ids';

interface FolderManagerProps {
  open: boolean;
  onClose: () => void;
}

export function FolderManager({ open, onClose }: FolderManagerProps) {
  const [folderName, setFolderName] = React.useState('');
  const { currentPath, addFolder } = useDocumentStore();

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      addFolder({
        id: generateId(),
        name: folderName.trim(),
        path: currentPath,
        parentId: null,
      });
      setFolderName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">{currentPath}</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <Button onClick={handleCreateFolder}>
              <FolderPlus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}