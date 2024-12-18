interface BaseMetadata {
  id: string;
  name: string;
  uploadDate: string;
  tags: string[];
  userId: string;
  companyId: string;
  contentType: 'pdf' | 'doc' | 'docx' | 'weburl' | 'youtubeurl';
  status: 'pending' | 'processing' | 'embedded' | 'failed';
  embeddingModel?: string;
  embeddingDate?: string;
  lastUpdated: string;
  processingAttempts: number;
  processingErrors?: string[];
}

interface DocumentMetadata extends BaseMetadata {
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

interface WebResourceMetadata extends BaseMetadata {
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

interface VideoMetadata extends BaseMetadata {
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

export type WebhookPayload = {
  metadata: DocumentMetadata | WebResourceMetadata | VideoMetadata;
  file?: File;
  content?: string;
  videoId?: string;
  requestId: string;
  timestamp: string;
  version: string;
  source: 'web-app' | 'api' | 'integration';
  settings?: {
    priority?: 'high' | 'normal' | 'low';
    callbackUrl?: string;
    processingOptions?: {
      extractText?: boolean;
      generateEmbeddings?: boolean;
      extractMetadata?: boolean;
      translateContent?: boolean;
      languages?: string[];
    };
  };
};