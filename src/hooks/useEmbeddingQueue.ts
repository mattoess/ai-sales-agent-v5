import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import { Document } from '../components/admin/content/types';
import { makeApiRequest, MAKE_CONFIG, ContentProcessingResponse, validateContentResponse } from '../services/make';
import { AppError, ErrorType } from '../services/errors';

class EmbeddingQueue {
  private static instance: EmbeddingQueue;
  private queue: Document[] = [];
  private processing = false;
  private errors: Map<string, AppError> = new Map();

  private constructor() {}

  static getInstance(): EmbeddingQueue {
    if (!EmbeddingQueue.instance) {
      EmbeddingQueue.instance = new EmbeddingQueue();
    }
    return EmbeddingQueue.instance;
  }

  getError(documentId: string): AppError | undefined {
    return this.errors.get(documentId);
  }

  async add(
    document: Document, 
    user: any, 
    updateStatus: (id: string, status: Document['status'], error?: AppError) => void
  ) {
    this.queue.push(document);
    updateStatus(document.id, 'waiting');
    
    if (!this.processing) {
      await this.processQueue(user, updateStatus);
    }
  }

  private async processQueue(
    user: any, 
    updateStatus: (id: string, status: Document['status'], error?: AppError) => void
  ) {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const document = this.queue[0];

    try {
      updateStatus(document.id, 'processing');
      this.errors.delete(document.id); // Clear any previous errors

      const namespace = `${user.publicMetadata.clientId}-${document.contentType?.primary || 'general'}`;

      const payload = {
        document: {
          id: document.id,
          clientId: user.publicMetadata.clientId,
          name: document.name,
          type: document.type,
          contentType: document.contentType,
          metadata: {
            ...document.metadata,
            vectorNamespace: namespace
          },
        },
        file: document.file,
        processing: {
          priority: document.processingMetadata?.priority || 'normal',
          namespace,
          extractionFlags: {
            pricing: document.processingMetadata?.extractionFlags?.pricing || false,
            metrics: document.processingMetadata?.extractionFlags?.metrics || true,
            methodology: document.processingMetadata?.extractionFlags?.methodology || false,
          },
        },
        user: {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          clientId: user.publicMetadata.clientId,
        }
      };

      const response = await makeApiRequest<ContentProcessingResponse>(
        MAKE_CONFIG.urls.content.process,
        payload,
        validateContentResponse,
        MAKE_CONFIG.timeouts.content.process
      );

      if (!response.success) {
        throw new AppError(
          ErrorType.CONTENT,
          'Content processing failed',
          {
            details: {
              documentId: document.id,
              status: response.status,
              metadata: response.metadata
            }
          }
        );
      }

      updateStatus(document.id, 'embedded');

    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(
            ErrorType.CONTENT,
            'Failed to process document',
            { originalError: error }
          );

      this.errors.set(document.id, appError);
      console.error('Error processing document:', appError);
      updateStatus(document.id, 'failed', appError);
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
        'Missing required user or file data',
        {
          details: {
            hasUser: !!user,
            hasFile: !!document.file,
            documentId: document.id
          }
        }
      );
    }

    const baseProcessingMetadata = {
      priority: document.processingMetadata?.priority || 'normal',
      vectorNamespace: document.metadata.vectorNamespace,
      extractionFlags: {
        pricing: document.processingMetadata?.extractionFlags?.pricing || false,
        metrics: document.processingMetadata?.extractionFlags?.metrics || true,
        methodology: document.processingMetadata?.extractionFlags?.methodology || false,
      },
      lastProcessed: new Date()
    } as const;

    await queue.add(
      document,
      user,
      (id, status, error) => updateDocument(id, { 
        status,
        processingMetadata: {
          ...baseProcessingMetadata,
          error: error ? {
            type: error.type,
            message: error.message,
            details: error.context.details
          } : undefined
        }
      })
    );
  }, [user, updateDocument]);

  return { 
    embedDocument, 
    queueLength: queue.getQueueLength(),
    getError: (documentId: string) => queue.getError(documentId)
  };
}