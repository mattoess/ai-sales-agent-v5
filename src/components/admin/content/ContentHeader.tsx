import React from 'react';
import { FileText, Info } from 'lucide-react';
import { Button } from '../../ui/button';
import { Tooltip } from '../../ui/tooltip';

export function ContentHeader() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Solution Content Management</h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
              Manage and organize your solution documents, case studies, and resources
            </p>
            <Tooltip content="Upload solution documents, brochures, case studies, and value propositions. All content will be processed and embedded into the AI discovery system.">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create New Content
        </Button>
      </div>
    </div>
  );
}