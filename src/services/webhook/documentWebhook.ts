import { Document } from '../../components/admin/content/types';
import { User } from '../../types/auth';
import { WebhookPayload } from '../../types/webhook/payload';
import { DocumentMetadata } from '../../types/webhook/metadata';

export function createDocumentPayload(document: Document, user: User): WebhookPayload {
  const fileExtension = document.name.split('.').pop()?.toLowerCase();
  const contentType = fileExtension as 'pdf' | 'doc' | 'docx';

  const metadata: DocumentMetadata = {
    id: document.id,
    name: document.name,
    uploadDate: new Date().toISOString(),
    tags: document.tags,
    userId: user.id,
    companyId: user.companyId || '',
    contentType,
    status: 'pending',
    fileSize: document.size || 0,
    mimeType: document.file?.type || '',
    lastModified: document.lastModified?.toISOString() || '',
    processingAttempts: 0,
    lastUpdated: new Date().toISOString()
  };

  return {
    metadata,
    file: document.file,
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: '1.0',
    source: 'web-app',
    settings: {
      priority: 'normal',
      processingOptions: {
        extractText: true,
        generateEmbeddings: true,
        extractMetadata: true
      }
    }
  };
}