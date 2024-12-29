// Used for processing documents and videos in the admin panel

import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Document, Video } from '../components/admin/content/types';
import { WebhookService } from '../services/webhookService';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';

export function useWebhook() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const processDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) return;

    try {
      updateDocument(document.id, { status: 'processing' });

      const payload = await WebhookService.createDocumentPayload(document, {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        fullName: user.fullName || '',
        role: 'member',
        companyId: user.publicMetadata.companyId as string
      });

      const response = await WebhookService.sendWebhook(payload);
      
      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      updateDocument(document.id, { status: 'embedded' });
    } catch (error) {
      console.error('Error processing document:', error);
      updateDocument(document.id, { status: 'failed' });
    }
  }, [user, updateDocument]);

  const processVideo = useCallback(async (video: Video) => {
    if (!user) return;

    try {
      const payload = await WebhookService.createVideoPayload(video, {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        fullName: user.fullName || '',
        role: 'member',
        companyId: user.publicMetadata.companyId as string
      });

      await WebhookService.sendWebhook(payload);
    } catch (error) {
      console.error('Error processing video:', error);
      throw error;
    }
  }, [user]);

  return {
    processDocument,
    processVideo
  };
}