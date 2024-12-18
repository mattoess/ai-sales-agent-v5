import { Document } from '../../../components/admin/content/types';
import { MakeWebhookMetadata } from '../types/makeWebhookTypes';

export function adaptDocumentToMakeFormat(
  document: Document,
  userId?: string,
  companyId?: string
): MakeWebhookMetadata {
  return {
    documentId: document.id,
    fileName: document.name,
    fileSize: document.size || 0,
    uploadDate: new Date().toISOString(),
    tags: document.tags || [],
    userId,
    companyId,
    contentType: document.file?.type,
    mimeType: document.file?.type,
    processingSettings: {
      model: 'text-embedding-3-large',
      chunkSize: 1000,
      overlap: 200,
      quality: 'high'
    }
  };
}