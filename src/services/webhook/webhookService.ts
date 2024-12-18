import { WebhookPayload } from './types/webhookPayload';
import { WebhookResponse, ProcessingResult } from './types/webhookResponse';

const WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

export class WebhookService {
  static async sendWebhook(payload: WebhookPayload): Promise<ProcessingResult> {
    const formData = new FormData();
    
    // Add all metadata fields individually
    if (payload.documentId) {
      formData.append('documentId', payload.documentId);
    }
    formData.append('fileName', payload.fileName);
    formData.append('fileSize', payload.fileSize.toString());
    formData.append('mimeType', payload.mimeType);
    formData.append('contentType', payload.contentType);
    if (payload.lastModified) {
      formData.append('lastModified', payload.lastModified);
    }
    
    // User metadata
    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);
    
    // Processing metadata
    formData.append('uploadDate', payload.uploadDate);
    formData.append('processingPriority', payload.processingPriority);
    
    // Content metadata
    formData.append('tags', payload.tags.join(','));
    
    // Processing options
    formData.append('extractText', payload.extractText.toString());
    formData.append('generateEmbeddings', payload.generateEmbeddings.toString());
    formData.append('extractMetadata', payload.extractMetadata.toString());
    
    // Add file
    formData.append('file', payload.file);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.statusText}`);
    }

    const webhookResponse: WebhookResponse = await response.json();
    return webhookResponse.result;
  }

  static handleProcessingResult(result: ProcessingResult) {
    // Helper to process the webhook response
    if (!result.success) {
      throw new Error(result.errorDetails?.message || 'Processing failed');
    }

    // Return relevant info for the client
    return {
      documentId: result.documentId,
      status: result.status,
      stats: {
        pageCount: result.stats.pageCount,
        wordCount: result.stats.wordCount
      },
      metadata: {
        title: result.metadata.title,
        author: result.metadata.author,
        language: result.metadata.language
      },
      suggestedTags: result.analysis.suggestedTags
    };
  }
}