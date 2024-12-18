import { DocumentMetadata, WebResourceMetadata, VideoMetadata } from './metadata';

export interface ProcessingSettings {
  priority?: 'high' | 'normal' | 'low';
  callbackUrl?: string;
  processingOptions?: {
    extractText?: boolean;
    generateEmbeddings?: boolean;
    extractMetadata?: boolean;
    translateContent?: boolean;
    languages?: string[];
  };
}

export interface WebhookPayload {
  metadata: DocumentMetadata | WebResourceMetadata | VideoMetadata;
  file?: File;
  content?: string;
  videoId?: string;
  requestId: string;
  timestamp: string;
  version: string;
  source: 'web-app' | 'api' | 'integration';
  settings?: ProcessingSettings;
}