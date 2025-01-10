// src/hooks/useEmbeddingQueue.ts
import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import type { Document, Video, DocumentStatus } from '../components/admin/content/types';
import { makeApiRequest } from '../services/make/api';
import { AppError, ErrorType } from '../services/errors';
import { MAKE_CONFIG } from '../services/make/config';

type Content = Document | Video;

export interface ProcessingMetadata {
  extractionFlags: {
    pricing: boolean;
    metrics: boolean;
    methodology: boolean;
  };
  lastProcessed: Date;
  error?: {
    type: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

class EmbeddingQueue {
  private static instance: EmbeddingQueue;
  private queue: Content[] = [];
  private processing = false;
  private errors: Map<string, AppError> = new Map();

  private constructor() {}

  static getInstance(): EmbeddingQueue {
    if (!EmbeddingQueue.instance) {
      EmbeddingQueue.instance = new EmbeddingQueue();
    }
    return EmbeddingQueue.instance;
  }

  private isDocument(content: Content): content is Document {
    return 'file' in content && content.file instanceof File;
  }

  private isVideo(content: Content): content is Video {
    return 'url' in content;
  }

  private getNamespace(content: Content, clientId: string): string {
    if (this.isDocument(content)) {
      // Access contentType directly from Document
      return `${clientId}-${content.contentType}`;
    }
    return `${clientId}-video`;
  }

  getError(id: string): AppError | undefined {
    return this.errors.get(id);
  }

  async add(
    content: Content,
    user: any,
    updateStatus: (id: string, status: DocumentStatus, error?: AppError) => void
  ) {
    this.queue.push(content);
    updateStatus(content.id, 'waiting');
    
    if (!this.processing) {
      await this.processQueue(user, updateStatus);
    }
  }

  private async processQueue(
    user: any,
    updateStatus: (id: string, status: DocumentStatus, error?: AppError) => void
  ) {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const content = this.queue[0];

    try {
      updateStatus(content.id, 'processing');
      this.errors.delete(content.id);

      const namespace = this.getNamespace(content, user.publicMetadata.clientId);

      const payload = {
        content: {
          id: content.id,
          clientId: user.publicMetadata.clientId,
          name: this.isDocument(content) ? content.name : content.title,
          type: this.isDocument(content) ? 'document' : 'video',
          metadata: {
            vectorNamespace: namespace
          },
        },
        file: this.isDocument(content) ? content.file : undefined,
        url: this.isVideo(content) ? content.url : undefined,
        processing: {
          priority: 'normal',
          namespace,
          settings: MAKE_CONFIG.timeouts.content
        },
        user: {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          clientId: user.publicMetadata.clientId,
        }
      };

      const response = await makeApiRequest(
        MAKE_CONFIG.urls.content.process,
        payload,
        (data: unknown): data is { success: boolean } => {
          return typeof data === 'object' && data !== null && 'success' in data;
        }
      );

      if (!response.success) {
        throw new AppError(ErrorType.CONTENT, 'Content processing failed');
      }

      updateStatus(content.id, 'embedded');
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError(
        ErrorType.CONTENT,
        'Failed to process content',
        { originalError: error }
      );

      this.errors.set(content.id, appError);
      updateStatus(content.id, 'failed', appError);
    }

    this.queue.shift();
    await this.processQueue(user, updateStatus);
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

export function useEmbeddingQueue() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();
  const queue = EmbeddingQueue.getInstance();

  const embedDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) {
      throw new AppError(
        ErrorType.VALIDATION,
        'Missing required user or file data'
      );
    }

    await queue.add(
      document,
      user,
      (id: string, status: DocumentStatus, error?: AppError) => {
        const processingMetadata: ProcessingMetadata | undefined = error ? {
          extractionFlags: document.processingMetadata?.extractionFlags || {
            pricing: false,
            metrics: false,
            methodology: false
          },
          lastProcessed: new Date(),
          error: {
            type: error.type,
            message: error.message,
            details: error.context.details
          }
        } : undefined;

        updateDocument(id, { 
          status,
          processingMetadata
        });
      }
    );
  }, [user, updateDocument]);

  const embedVideo = useCallback(async (video: Video) => {
    if (!user) {
      throw new AppError(
        ErrorType.VALIDATION,
        'Missing required user data'
      );
    }

    await queue.add(
      video,
      user,
      (id: string, status: DocumentStatus) => {
        updateDocument(id, { status });
      }
    );
  }, [user, updateDocument]);

  return {
    embedDocument,
    embedVideo,
    queueLength: queue.getQueueLength(),
    getError: (id: string) => queue.getError(id)
  };
}