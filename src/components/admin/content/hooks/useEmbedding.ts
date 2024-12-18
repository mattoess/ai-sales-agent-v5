import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from './useDocumentStore';
import { Document } from '../types';

const EMBED_WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

export function useEmbedding() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const embedDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) return;

    try {
      // Update status to processing
      updateDocument(document.id, { status: 'processing' });

      // Create form data with file and metadata
      const formData = new FormData();
      formData.append('file', document.file);
      formData.append('metadata', JSON.stringify({
        documentId: document.id,
        userId: user.id,
        companyId: user.publicMetadata.companyId,
        fileName: document.name,
        fileSize: document.size,
        uploadDate: new Date().toISOString(),
        tags: document.tags
      }));

      // Send to Make.com webhook
      const response = await fetch(EMBED_WEBHOOK_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      // Update status to embedded
      updateDocument(document.id, { status: 'embedded' });
    } catch (error) {
      console.error('Error embedding document:', error);
      updateDocument(document.id, { status: 'failed' });
    }
  }, [user, updateDocument]);

  return { embedDocument };
}