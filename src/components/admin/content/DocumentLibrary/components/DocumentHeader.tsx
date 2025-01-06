// src/components/admin/content/DocumentLibrary/components/DocumentHeader.tsx
// import React from 'react';
import { InfoTooltip, FileActions } from '../../shared';

interface DocumentHeaderProps {
  onNewFolder: () => void;
  onManageTags: () => void;
}

export function DocumentHeader({ onNewFolder, onManageTags }: DocumentHeaderProps) {
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Solution Documents</h2>
        <InfoTooltip content={tooltipContent} />
      </div>
      <FileActions 
        onNewFolder={onNewFolder}
        onManageTags={onManageTags}
      />
    </div>
  );
}