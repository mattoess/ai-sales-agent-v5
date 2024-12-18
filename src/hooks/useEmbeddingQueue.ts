import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import { Document } from '../components/admin/content/types';

const WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

class EmbeddingQueue {
  private static instance: EmbeddingQueue;
  private queue: Document[] = [];
  private processing = false;

  private constructor() {}

  static getInstance(): EmbeddingQueue {
    if (!EmbeddingQueue.instance) {
      EmbeddingQueue.instance = new EmbeddingQueue();
    }
    return EmbeddingQueue.instance;
  }

  async add(document: Document, user: any, updateStatus: (id: string, status: Document['status']) => void) {
    this.queue.push(document);
    updateStatus(document.id, 'waiting');
    
    if (!this.processing) {
      await this.processQueue(user, updateStatus);
    }
  }

  private async processQueue(user: any, updateStatus: (id: string, status: Document['status']) => void) {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const document = this.queue[0];

    try {
      updateStatus(document.id, 'processing');

      // Create form data with complete metadata
      const formData = new FormData();

      // Add the file
      if (document.file) {
        formData.append('file', document.file);
      }

      // Add comprehensive metadata
      const metadata = {
        // Document metadata
        documentId: document.id,
        fileName: document.name,
        fileType: document.file?.type,
        fileSize: document.size,
        filePath: document.path,
        tags: document.tags,
        uploadDate: new Date().toISOString(),
        lastModified: document.lastModified?.toISOString(),

        // User context
        userId: user.id,
        userEmail: user.email,
        userName: user.fullName,
        companyId: user.companyId,
        
        // Processing context
        processingPipeline: 'v2',
        environment: process.env.NODE_ENV,
        clientVersion: '1.0.0',
        priority: 'normal',
        
        // Embedding settings
        embeddingModel: 'text-embedding-3-large',
        maxTokens: 8000,
        chunkSize: 1000,
        overlapSize: 200,
        quality: 'high',

        // Status tracking
        status: 'processing',
        processingAttempts: 1,
        processingStartTime: new Date().toISOString()
      };

      formData.append('metadata', JSON.stringify(metadata));

      // Add processing settings
      const settings = {
        extractText: true,
        generateEmbeddings: true,
        extractMetadata: true,
        translateContent: false,
        languages: ['en'],
        quality: 'high'
      };

      formData.append('settings', JSON.stringify(settings));

      // Send to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to process document: ${response.statusText}`);
      }

      updateStatus(document.id, 'embedded');
    } catch (error) {
      console.error('Error processing document:', error);
      updateStatus(document.id, 'failed');
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
    if (!user || !document.file) return;

    await queue.add(
      document,
      {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        fullName: user.fullName,
        companyId: user.publicMetadata.companyId,
      },
      (id, status) => updateDocument(id, { status })
    );
  }, [user, updateDocument]);

  return { 
    embedDocument, 
    queueLength: queue.getQueueLength() 
  };
}