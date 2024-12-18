import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import { Document } from '../components/admin/content/types';
import { createWebhookFields } from '../services/webhook/createFields';
import { sendWebhook } from '../services/webhook/sendWebhook';

export function useDocumentProcessing() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const processDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) return;

    try {
      updateDocument(document.id, { status: 'processing' });

      // Create fields for webhook
      const fields = createWebhookFields(
        document,
        user.id,
        user.publicMetadata.companyId as string
      );

      // Send to webhook
      await sendWebhook(document.file, fields);

      updateDocument(document.id, { status: 'embedded' });
    } catch (error) {
      console.error('Error processing document:', error);
      updateDocument(document.id, { status: 'failed' });
      throw error;
    }
  }, [user, updateDocument]);

  return { processDocument };
}