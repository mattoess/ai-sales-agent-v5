// src/components/admin/content/types/index.ts
export { useEmbeddingQueue } from '../../../../hooks/useEmbeddingQueue';

export type DocumentStatus = 'not_embedded' | 'processing' | 'embedded' | 'failed' | 'waiting';

export type ContentType = 'solution' | 'case_study' | 'technical' | 'methodology_and_frameworks' | 'pricing';

export type AudienceType = 'technical' | 'business' | 'executive';

export interface ProcessingError {
  type: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface DocumentMetadata {
  solutions: string[];
  audience: AudienceType[];
  vectorNamespace: string;
}

export interface ProcessingMetadata {
  extractionFlags: {
    pricing: boolean;
    metrics: boolean;
    methodology: boolean;
  };
  lastProcessed?: Date;
  error?: ProcessingError;
}

export interface Document {
  // Core fields
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  tags: string[];
  size?: number;
  lastModified?: Date;
  file?: File;

  // Business logic fields
  clientId: string;
  userId: string;
  contentType: ContentType;
  
  // Metadata
  metadata: DocumentMetadata;
  
  // Processing status
  status: DocumentStatus;
  processingMetadata?: ProcessingMetadata;
}

export interface BulkEditableDocument extends Document {
  isSelected?: boolean;
  isPendingEdit?: boolean;
}

export interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  status?: 'pending' | 'processing' | 'embedded' | 'failed';
}