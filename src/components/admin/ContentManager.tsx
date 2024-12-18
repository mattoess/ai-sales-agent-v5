import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { DocumentLibrary } from './content/DocumentLibrary';
import { VideoUploader } from './content/components/VideoUploader';
import { WebPagesTab } from './content/tabs/WebPagesTab';
import { Info } from 'lucide-react';
import { Tooltip } from '../ui/tooltip';

export function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Solution Content Management</h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-500">
            Manage and organize your solution documents, case studies, and resources for AI-powered discovery
          </p>
          <Tooltip content="Upload solution documents, brochures, case studies, and value propositions. All content will be processed and embedded into the AI discovery system for intelligent recommendations.">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            Solution Documents
          </TabsTrigger>
          <TabsTrigger value="webpages" className="flex items-center gap-2">
            Web Resources
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            Video Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <DocumentLibrary />
        </TabsContent>

        <TabsContent value="webpages">
          <WebPagesTab />
        </TabsContent>

        <TabsContent value="videos">
          <VideoUploader />
        </TabsContent>
      </Tabs>
    </div>
  );
}