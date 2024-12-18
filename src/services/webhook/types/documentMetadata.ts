export interface DocumentMetadata {
  // Core metadata
  id: string;
  name: string;
  type: 'document';
  contentType: 'pdf' | 'doc' | 'docx';
  
  // File metadata
  fileSize: number;
  mimeType: string;
  lastModified?: string;
  pageCount?: number;
  
  // Processing metadata
  status: 'pending' | 'processing' | 'embedded' | 'failed';
  processingAttempts: number;
  uploadDate: string;
  lastUpdated: string;
  
  // User/Company metadata
  userId: string;
  companyId: string;
  
  // Content metadata
  tags: string[];
  extractedText?: string;
  extractedMetadata?: {
    title?: string;
    author?: string;
    creationDate?: string;
    keywords?: string[];
  };
  
  // Embedding settings
  embeddingModel: string;
  embeddingSettings: {
    maxTokens: number;
    chunkSize: number;
    overlapSize: number;
    quality: 'high' | 'medium' | 'low';
  };
}