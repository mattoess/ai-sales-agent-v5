// Types that match Make.com's expected format
export interface MakeWebhookMetadata {
  documentId: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  tags: string[];
  userId?: string;
  companyId?: string;
  contentType?: string;
  mimeType?: string;
  processingSettings?: {
    model: string;
    chunkSize: number;
    overlap: number;
    quality: 'high' | 'medium' | 'low';
  };
}

export interface MakeWebhookPayload {
  metadata: string; // JSON stringified metadata
  file: File;
}