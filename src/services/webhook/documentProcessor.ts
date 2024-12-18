import { Document } from '../../components/admin/content/types';
import { WebhookPayload } from './types/webhookPayload';

export function createDocumentPayload(
  document: Document, 
  userId: string, 
  companyId: string
): WebhookPayload {
  const fileExtension = document.name.split('.').pop()?.toLowerCase() as 'pdf' | 'doc' | 'docx';
  
  if (!document.file) {
    throw new Error('Document file is required');
  }

  return {
    // For new documents, don't send documentId
    ...(document.id && { documentId: document.id }),
    fileName: document.name,
    fileSize: document.size || 0,
    mimeType: document.file.type,
    contentType: fileExtension,
    lastModified: document.lastModified?.toISOString(),
    
    // User metadata
    userId,
    companyId,
    
    // Processing metadata
    uploadDate: new Date().toISOString(),
    processingPriority: 'normal',
    
    // Content metadata
    tags: document.tags || [],
    
    // Processing options
    extractText: true,
    generateEmbeddings: true,
    extractMetadata: true,
    
    // Content
    file: document.file
  };
}