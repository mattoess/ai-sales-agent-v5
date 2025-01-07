// src/components/admin/content/types/index.ts
export type DocumentStatus = 'not_embedded' | 'processing' | 'embedded' | 'failed' | 'waiting';

export type ContentType = 
  | 'solution' 
  | 'case_study' 
  | 'technical' 
  | 'methodology_and_frameworks'
  | 'pricing';

export type AudienceType = 'technical' | 'business' | 'executive';

export interface ProcessingError {
  type: string;
  message: string;
  details?: Record<string, unknown>;
}

// In src/components/admin/content/types/index.ts
export interface Document {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  tags: string[];  // Add this line if it wasn't already there
  size?: number;
  lastModified?: Date;
  file?: File;

  clientId: string;
  userId: string;
  contentType: ContentType;
  metadata: {
    solutions: string[];
    audience: AudienceType[];
    isCompanyWide: boolean;
    vectorNamespace: string;
  };
  status: DocumentStatus;
  processingMetadata?: {
    extractionFlags: {
      pricing: boolean;
      metrics: boolean;
      methodology: boolean;
    };
    lastProcessed?: Date;
    error?: ProcessingError;
  };
}
export interface BulkEditableDocument extends Document {
  isSelected?: boolean;
  isPendingEdit?: boolean;
}

// In src/components/admin/content/types/index.ts
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  // Add any other properties your video object needs
}