export type DocumentStatus = 'not_embedded' | 'processing' | 'embedded' | 'failed' | 'waiting';
export type ContentType = 'solution' | 'case_study' | 'technical' | 'pricing' | 'methodology';
export type AudienceType = 'technical' | 'business' | 'executive';

interface ProcessingError {
  type: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface Document {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  tags: string[];
  size?: number;
  lastModified?: Date;
  file?: File;

  clientId: string;
  userId: string;
  contentType: {
    primary: ContentType;
    subtype?: string;
  };
  metadata: {
    solutions: string[];
    industries: string[];
    outcomes: string[];
    audience: AudienceType[];
    vectorNamespace: string;
  };
  status: DocumentStatus;
  processingMetadata?: {
    priority: 'high' | 'normal' | 'low';
    vectorNamespace: string;
    extractionFlags: {
      pricing: boolean;
      metrics: boolean;
      methodology: boolean;
    };
    lastProcessed?: Date;
    error?: ProcessingError;
  };
}