export interface WebhookPayload {
  // Document metadata
  documentId?: string; // Optional, will be assigned by Make.com
  fileName: string;
  fileSize: number;
  mimeType: string;
  contentType: 'pdf' | 'doc' | 'docx';
  lastModified?: string;
  
  // User metadata
  userId: string;
  companyId: string;
  
  // Processing metadata
  uploadDate: string;
  processingPriority: 'high' | 'normal' | 'low';
  
  // Content metadata
  tags: string[];
  
  // Processing options
  extractText: boolean;
  generateEmbeddings: boolean;
  extractMetadata: boolean;
  
  // Content
  file: File;
}