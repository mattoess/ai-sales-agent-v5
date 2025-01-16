// src/components/admin/content/types/index.ts

export type DocumentStatus = 
  | 'not_embedded' 
  | 'processing' 
  | 'embedded' 
  | 'failed' 
  | 'waiting'
  | 'archived';

export type MimeType = 'pdf' | 'doc' | 'docx' | 'weburl' | 'youtubeurl';

export type ContentType = 
  | 'solution' 
  | 'case_study' 
  | 'technical' 
  | 'methodology_and_frameworks' 
  | 'pricing';

export type AudienceType = 'technical' | 'business' | 'executive';

// Updated to include both name and ID for solutions
export interface SolutionReference {
  id: string;        // SolutionOption.solutionOptionId
  name: string;      // SolutionOption.name
}

export interface DocumentMetadata {
  solutions: SolutionReference[];
  audience: AudienceType[];
  description?: string;
}

export interface Document {
  // Core fields
  id: string;
  name: string;
  tags: string[];
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  file?: File;

  // Type information
  mimeType: MimeType;
  contentType: ContentType;
  
  // Business fields
  clientId: string;
  userId: string;
  metadata: DocumentMetadata;
  
  // Status
  status: DocumentStatus;
}

export interface FileUploadProgress {
  progress: number;
  status:  'ready to process' | 'processing' | 'completed' | 'failed';
}

export type SortField = 
  | 'name'           // Document name
  | 'solutionName'   // From metadata.solutions[].name
  | 'createdAt'
  | 'modifiedAt'
  | 'contentType'
  | 'status';

export type SortDirection = 'asc' | 'desc';

export interface DocumentSort {
  field: SortField;
  direction: SortDirection;
}

export type DateFilterField = 'createdAt' | 'modifiedAt';

export interface DateRange {
  field: DateFilterField;
  start: Date;
  end: Date;
}

export interface DocumentFilters {
  contentTypes?: ContentType[];
  solutions?: string[];      // SolutionOption.solutionOptionId values
  status?: DocumentStatus[];
  search?: string;          // Free text search
  dateRange?: DateRange;    // Can filter by either created or modified date
}

export interface BulkEditableDocument extends Document {
  isSelected?: boolean;
  isPendingEdit?: boolean;
}