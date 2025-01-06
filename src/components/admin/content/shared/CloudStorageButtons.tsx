import React from 'react';
import { Button } from '../../../ui/button';
import { GoogleDriveIcon } from '../icons/GoogleDriveIcon';
import { DropboxIcon } from '../icons/DropboxIcon';

interface CloudStorageButtonsProps {
  onGoogleDriveSelect: () => void;
  onDropboxSelect: () => void;
}

export function CloudStorageButtons({ onGoogleDriveSelect, onDropboxSelect }: CloudStorageButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-3 min-w-[200px] bg-white hover:bg-gray-50"
        onClick={onGoogleDriveSelect}
      >
        <GoogleDriveIcon className="w-6 h-6" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Google Drive</span>
          <span className="text-xs text-gray-500">Import from Drive</span>
        </div>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-3 min-w-[200px] bg-white hover:bg-gray-50"
        onClick={onDropboxSelect}
      >
        <DropboxIcon className="w-6 h-6" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Dropbox</span>
          <span className="text-xs text-gray-500">Import from Dropbox</span>
        </div>
      </Button>
    </div>
  );
}