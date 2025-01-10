import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { FileText, Globe, Youtube } from 'lucide-react';
import { DocumentsTab } from './tabs/DocumentsTab';
import { WebPagesTab } from './tabs/WebPagesTab';
import { VideosTab } from './tabs/VideosTab';
import { IconButton } from '@/components/ui/icon-button';
// import { filters } from './types';

// In ContentTabs.tsx
interface ContentTabsProps {
  filters: {
    status: string[];
    search: string;
  };
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onEditPage: (pageId?: string) => void;
  isEditorOpen: boolean;
  selectedPage: string | null;
  onCloseEditor: () => void;
}

export function ContentTabs({
  filters,
  onSearch,
  onStatusChange,
  onEditPage,
  isEditorOpen,
  selectedPage,
  onCloseEditor,
}: ContentTabsProps) {
  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="solutions">
          <FileText className="w-4 h-4" />
          Solutions
          </TabsTrigger>
          <TabsTrigger value="documents">
          <FileText className="w-4 h-4" />
          Solution Documents
        </TabsTrigger>
      <TabsTrigger value="documents" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documents
        </TabsTrigger>
        <TabsTrigger value="webpages" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Web Pages
        </TabsTrigger>
        <TabsTrigger value="videos" className="flex items-center gap-2">
          <Youtube className="w-4 h-4" />
          Videos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="documents">
      <DocumentsTab
        filters={filters}
        onSearch={onSearch}
        onStatusChange={onStatusChange}
        onEditPage={onEditPage}
        isEditorOpen={isEditorOpen}
        selectedPage={selectedPage}
        onCloseEditor={onCloseEditor}
      />
    </TabsContent>

      <TabsContent value="webpages">
        <WebPagesTab />
      </TabsContent>

      <TabsContent value="videos">
        <VideosTab />
      </TabsContent>
    </Tabs>
  );
}