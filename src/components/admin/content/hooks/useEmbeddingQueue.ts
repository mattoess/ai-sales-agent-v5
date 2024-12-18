import { useCallback } from 'react';
import { useDocumentProcessing } from '../../../../hooks/useDocumentProcessing';
import { useDocumentStore } from './useDocumentStore';
import { Document } from '../types';

class ProcessingQueue {
  private static instance: ProcessingQueue;
  private queue: Document[] = [];
  private processing = false;

  static getInstance(): ProcessingQueue {
    if (!ProcessingQueue.instance) {
      ProcessingQueue.instance = new ProcessingQueue();
    }
    return ProcessingQueue.instance;
  }

  async add(document: Document, processor: (doc: Document) => Promise<void>) {
    this.queue.push(document);
    
    if (!this.processing) {
      await this.processQueue(processor);
    }
  }

  private async processQueue(processor: (doc: Document) => Promise<void>) {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const document = this.queue[0];

    try {
      await processor(document);
    } catch (error) {
      console.error('Error processing document:', error);
    }

    this.queue.shift();
    await this.processQueue(processor);
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

export function useEmbeddingQueue() {
  const { processDocument } = useDocumentProcessing();
  const { updateDocument } = useDocumentStore();
  const queue = ProcessingQueue.getInstance();

  const embedDocument = useCallback(async (document: Document) => {
    updateDocument(document.id, { status: 'waiting' });
    await queue.add(document, processDocument);
  }, [processDocument, updateDocument]);

  return {
    embedDocument,
    queueLength: queue.getQueueLength()
  };
}