import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import { Document } from '../components/admin/content/types';
import { createDocumentPayload } from '../services/webhook/documentProcessor';
import { WebhookService } from '../services/webhook/webhookService';

export function useEmbedding() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const embedDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) return;

    try {
      updateDocument(document.id, { status: 'processing' });

      const payload = createDocumentPayload(
        document,
        user.id,
        user.publicMetadata.companyId as string
      );

      const result = await WebhookService.sendWebhook(payload);
      
      if (result.documentId) {
        // Update document with the new ID from Make.com
        updateDocument(document.id, { 
          id: result.documentId,
          status: 'embedded' 
        });
      } else {
        updateDocument(document.id, { status: 'embedded' });
      }
    } catch (error) {
      console.error('Error embedding document:', error);
      updateDocument(document.id, { status: 'failed' });
      throw error;
    }
  }, [user, updateDocument]);

  return { embedDocument };
}