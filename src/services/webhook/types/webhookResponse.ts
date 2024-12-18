export interface WebhookResponse {
  // Core response info
  success: boolean;
  timestamp: string;
  requestId: string;
  
  // Document info
  documentId: string;        // The permanent ID assigned by Make
  originalId?: string;       // The temporary ID from the client (if provided)
  status: 'completed' | 'failed' | 'partial';
  
  // Error details (if any)
  error?: {
    message: string;
    code: string;
  };
  
  // Processing results
  results?: {
    // Document stats
    stats: {
      pageCount: number;
      wordCount: number;
      extractedTextLength: number;
    };
    
    // Extracted metadata
    metadata: {
      title?: string;
      author?: string;
      creationDate?: string;
      keywords?: string[];
      language?: string;
    };
    
    // AI analysis
    analysis: {
      suggestedTags: string[];
      mainTopics: string[];
      languageConfidence: number;
    };
  };
}