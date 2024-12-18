import { Document } from '../../components/admin/content/types';
import { WEBHOOK_CONFIG } from './constants';

export function createWebhookFields(document: Document, userId: string, companyId: string) {
  if (!document.file) {
    throw new Error('Document file is required');
  }

  return {
    // Document fields
    documentId: document.id,
    fileName: document.name,
    fileSize: document.size || 0,
    mimeType: document.file.type,
    contentType: document.name.split('.').pop()?.toLowerCase(),
    lastModified: document.lastModified?.toISOString() || new Date().toISOString(),
    
    // User fields
    userId,
    companyId,
    
    // Processing fields
    uploadDate: new Date().toISOString(),
    processingPriority: 'normal',
    
    // Tags
    tags: document.tags?.join(',') || '',
    
    // Embedding settings
    embeddingModel: WEBHOOK_CONFIG.defaultSettings.embeddingModel,
    chunkSize: WEBHOOK_CONFIG.defaultSettings.chunkSize,
    overlapSize: WEBHOOK_CONFIG.defaultSettings.overlapSize,
    quality: WEBHOOK_CONFIG.defaultSettings.quality,
    
    // Processing flags
    extractText: true,
    generateEmbeddings: true,
    extractMetadata: true,
    
    // Version
    version: '1.0'
  };
}