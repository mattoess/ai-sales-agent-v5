// Used for processing documets and videos in the admin panel
import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Document, Video } from '../components/admin/content/types';
import { WebhookService } from '../services/webhook';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';

export function useWebhookProcessor() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const processDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) return;

    try {
      updateDocument(document.id, { status: 'processing' });
      
      const result = await WebhookService.processDocument(
        document,
        user.id,
        user.publicMetadata.companyId as string
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      updateDocument(document.id, { status: 'embedded' });
    } catch (error) {
      console.error('Error processing document:', error);
      updateDocument(document.id, { status: 'failed' });
      throw error;
    }
  }, [user, updateDocument]);

  const processVideo = useCallback(async (video: Video) => {
    if (!user) return;

    try {
      const result = await WebhookService.processVideo(
        video,
        user.id,
        user.publicMetadata.companyId as string
      );

      if (!result.success) {
        throw new Error(result.error);
      }
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