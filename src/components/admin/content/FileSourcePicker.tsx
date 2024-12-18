import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { GoogleDriveIcon } from './icons/GoogleDriveIcon';
import { DropboxIcon } from './icons/DropboxIcon';
import { Upload } from 'lucide-react';

interface FileSourcePickerProps {
  open: boolean;
  onClose: () => void;
}

export function FileSourcePicker({ open, onClose }: FileSourcePickerProps) {
  const handleGoogleDrive = () => {
    // Implement Google Drive picker
  };

  const handleDropbox = () => {
    // Implement Dropbox picker
  };

  const handleLocalUpload = () => {
    // Implement local file upload
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Files</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center gap-3 h-16"
            onClick={handleGoogleDrive}
          >
            <GoogleDriveIcon />
            <div className="text-left">
              <div className="font-semibold">Google Drive</div>
              <div className="text-sm text-gray-500">Select files from Google Drive</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-3 h-16"
            onClick={handleDropbox}
          >
            <DropboxIcon />
            <div className="text-left">
              <div className="font-semibold">Dropbox</div>
              <div className="text-sm text-gray-500">Select files from Dropbox</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-3 h-16"
            onClick={handleLocalUpload}
          >
            <Upload className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Local Computer</div>
              <div className="text-sm text-gray-500">Upload files from your device</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}