// src/services/webhook/index.ts
import { Document, Video } from '../../components/admin/content/types';
import { createDocumentPayload } from './documentProcessor';
import { createVideoPayload } from './videoProcessor';
import { sendWebhook } from './utils';
import { WebhookResponse } from './types';

export interface WebhookResponse {
  success: boolean;
  processingId?: string;
  error?: string;
}

export class WebhookService {
  static async processDocument(
    document: Document, 
    userId: string, 
    companyId: string
  ): Promise<WebhookResponse> {
    try {
      const payload = createDocumentPayload(document, userId, companyId);
      const response = await sendWebhook(payload);
      const result = await response.json();
      
      return {
        success: true,
        processingId: result.processingId
      };
    } catch (error) {
      console.error('Document processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async processVideo(
    video: Video, 
    userId: string, 
    companyId: string
  ): Promise<WebhookResponse> {
    try {
      const payload = createVideoPayload(video, userId, companyId);
      const response = await sendWebhook(payload);
      const result = await response.json();

      return {
        success: true,
        processingId: result.processingId
      };
    } catch (error) {
      console.error('Video processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export * from './types';