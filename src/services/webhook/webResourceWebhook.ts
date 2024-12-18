import { User } from '../../types/auth';
import { WebhookPayload } from '../../types/webhook/payload';
import { WebResourceMetadata } from '../../types/webhook/metadata';

export function createWebResourcePayload(url: string, metadata: any, user: User): WebhookPayload {
  const webMetadata: WebResourceMetadata = {
    id: metadata.id,
    name: metadata.title || url,
    uploadDate: new Date().toISOString(),
    tags: metadata.tags || [],
    userId: user.id,
    companyId: user.companyId || '',
    contentType: 'weburl',
    status: 'pending',
    url,
    title: metadata.title,
    description: metadata.description,
    lastCrawled: new Date().toISOString(),
    processingAttempts: 0,
    lastUpdated: new Date().toISOString()
  };

  return {
    metadata: webMetadata,
    content: metadata.content,
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