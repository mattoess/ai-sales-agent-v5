// src/components/admin/content/DocumentLibrary/components/DocumentContent.tsx
import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  FolderBreadcrumb,
  FileDropzone,
  CloudStorageButtons,
  DocumentTable
} from '../../shared';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import type { Document, ContentType } from '../../types';

export function DocumentContent() {
  const { user } = useUser();
  const { openGoogleDrivePicker, openDropboxChooser } = useCloudStorage();
  const { addDocument } = useDocumentStore();

  const getContentType = (fileType: string): ContentType => {
    // Map file types to content types
    switch (true) {
      case /\.(pdf|doc|docx)$/.test(fileType.toLowerCase()):
        return 'solution';
      case /\.(xls|xlsx|csv)$/.test(fileType.toLowerCase()):
        return 'pricing';
      case /\.(ppt|pptx)$/.test(fileType.toLowerCase()):
        return 'technical';
      default:
        return 'solution';
    }
  };

  const handleFileSelect = useCallback((files: File[]) => {
    if (!user) return;

    files.forEach(file => {
      const clientId = user.publicMetadata.clientId as string;
      const contentType = getContentType(file.type);
      
      const newDocument: Document = {
        id: crypto.randomUUID(),
        name: file.name,
        type: 'file',
        path: '/',
        tags: [],
        size: file.size,
        lastModified: new Date(file.lastModified),
        file,
        clientId,
        userId: user.id,
        contentType: {
          primary: contentType,
          subtype: file.type
        },
        metadata: {
          solutions: [],
          industries: [],
          outcomes: [],
          audience: [],
          vectorNamespace: `${clientId}-${contentType}`
        },
        status: 'not_embedded',
        processingMetadata: {
          priority: 'normal',
          vectorNamespace: `${clientId}-${contentType}`,
          extractionFlags: {
            pricing: contentType === 'pricing',
            metrics: contentType === 'case_study',
            methodology: contentType === 'methodology'
          },
          lastProcessed: new Date()
        }
      };
      
      addDocument(newDocument);
    });
  }, [addDocument, user]);

  return (
    <div className="space-y-6">
      <FolderBreadcrumb />
      
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <FileDropzone onFileSelect={handleFileSelect} />
        <div className="px-8 pb-8">
          <CloudStorageButtons 
            onGoogleDriveSelect={openGoogleDrivePicker}
            onDropboxSelect={openDropboxChooser}
          />
        </div>
      </div>

      <DocumentTable />
    </div>
  );
}