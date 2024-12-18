// Base metadata interface for all content types
export interface BaseMetadata {
  id: string;
  name: string;
  uploadDate: string;
  tags: string[];
  userId: string;
  companyId: string;
  contentType: 'pdf' | 'doc' | 'docx' | 'weburl' | 'youtubeurl';
  status: 'pending' | 'processing' | 'embedded' | 'failed';
  processingAttempts: number;
  lastUpdated: string;
  processingErrors?: string[];
  embeddingModel?: string;
  embeddingDate?: string;
}

// Document-specific metadata
export interface DocumentMetadata extends BaseMetadata {
  contentType: 'pdf' | 'doc' | 'docx';
  fileSize: number;
  mimeType: string;
  lastModified: string;
  pageCount?: number;
  textContent?: string;
  extractedMetadata?: {
    title?: string;
    author?: string;
    creationDate?: string;
    keywords?: string[];
  };
}

// Web resource metadata
export interface WebResourceMetadata extends BaseMetadata {
  contentType: 'weburl';
  url: string;
  title?: string;
  description?: string;
  lastCrawled: string;
  htmlContent?: string;
  mainText?: string;
  metaTags?: Record<string, string>;
  links?: Array<{ url: string; text: string }>;
}

// Video metadata
export interface VideoMetadata extends BaseMetadata {
  contentType: 'youtubeurl';
  videoUrl: string;
  videoId: string;
  title: string;
  description?: string;
  duration?: string;
  thumbnailUrl?: string;
  transcript?: string;
  captions?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  channel?: {
    id: string;
    name: string;
  };
}