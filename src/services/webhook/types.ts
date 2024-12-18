import { Document, Video } from '../../components/admin/content/types';

export interface WebhookMetadata {
  id: string;
  type: 'document' | 'video' | 'web';
  name: string;
  uploadDate: string;
  userId: string;
  companyId: string;
  processingPipeline: string;
  priority: 'high' | 'normal' | 'low';
  status: 'pending' | 'processing' | 'complete' | 'failed';
  settings: {
    embeddingModel: string;
    maxTokens: number;
    chunkSize: number;
    overlapSize: number;
    quality: 'high' | 'medium' | 'low';
  };
}

export interface DocumentMetadata extends WebhookMetadata {
  type: 'document';
  mimeType: string;
  fileSize: number;
  pageCount?: number;
  extractedText?: string;
}

export interface VideoMetadata extends WebhookMetadata {
  type: 'video';
  platform: 'youtube';
  videoId: string;
  duration?: string;
  transcript?: string;
}

export interface WebhookPayload {
  metadata: WebhookMetadata;
  file?: File;
  content?: string;
  requestId: string;
  timestamp: string;
  version: string;
}

export interface WebhookResponse {
  success: boolean;
  error?: string;
  processingId?: string;
}