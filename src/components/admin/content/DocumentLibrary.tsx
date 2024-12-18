import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { DocumentTable } from './DocumentTable';
import { FolderManager } from './components/FolderManager';
import { TagManager } from './components/TagManager';
import { FolderBreadcrumb } from './components/FolderBreadcrumb';
import { FileDropzone } from './components/FileDropzone';
import { ProcessingQueue } from './components/ProcessingQueue';
import { EmbeddingStatus } from './components/EmbeddingStatus';
import { CloudStorageButtons } from './components/CloudStorageButtons';
import { InfoTooltip } from './components/InfoTooltip';
import { FileActions } from './components/FileActions';
import { useCloudStorage } from '../../../hooks/useCloudStorage';

const tooltipContent = (
  <div className="max-w-xs space-y-2 p-1">
    <p>Upload PDFs of your solution documents to be processed by our AI:</p>
    <ul className="list-disc pl-4 space-y-1">
      <li>Solution brochures and datasheets</li>
      <li>Case studies and success stories</li>
      <li>Value propositions and ROI analyses</li>
      <li>Technical documentation</li>
    </ul>
  </div>
);

export function DocumentLibrary() {
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const { openGoogleDrivePicker, openDropboxChooser } = useCloudStorage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProcessingQueue />
        <EmbeddingStatus />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Solution Documents</h2>
              <InfoTooltip content={tooltipContent} />
            </div>
            <FileActions 
              onNewFolder={() => setShowFolderManager(true)}
              onManageTags={() => setShowTagManager(true)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FolderBreadcrumb />
            
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <FileDropzone />
              <div className="px-8 pb-8">
                <CloudStorageButtons 
                  onGoogleDriveSelect={openGoogleDrivePicker}
                  onDropboxSelect={openDropboxChooser}
                />
              </div>
            </div>

            <DocumentTable />
          </div>
        </CardContent>
      </Card>

      <FolderManager
        open={showFolderManager}
        onClose={() => setShowFolderManager(false)}
      />
      <TagManager
        open={showTagManager}
        onClose={() => setShowTagManager(false)}
      />
    </div>
  );
}