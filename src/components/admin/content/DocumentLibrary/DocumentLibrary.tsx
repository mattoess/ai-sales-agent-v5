// src/components/admin/content/DocumentLibrary/DocumentLibrary.tsx
import { useState } from 'react';  // Just import useState since that's what you're using
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DocumentHeader } from './components/DocumentHeader';
import { DocumentContent } from './components/DocumentContent';
import { 
  ProcessingQueue,
  EmbeddingStatus,
  FolderManager,
  TagManager 
} from '../shared';

export function DocumentLibrary() {
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);

  return (
    <div className="space-y-6">
      {/* Processing Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProcessingQueue />
        <EmbeddingStatus />
      </div>

      {/* Main Document Section */}
      <Card>
        <CardHeader>
          <DocumentHeader 
            onNewFolder={() => setShowFolderManager(true)}
            onManageTags={() => setShowTagManager(true)}
          />
        </CardHeader>
        <CardContent>
          <DocumentContent />
        </CardContent>
      </Card>

      {/* Modals */}
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