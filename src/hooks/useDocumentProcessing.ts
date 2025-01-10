// src/hooks/useDocumentProcessing.ts
import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import type { Document, DocumentStatus } from '../components/admin/content/types';
import { AppError, ErrorType } from '../services/errors';

interface WebhookResponse {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
}

interface WebhookFields {
  documentId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  contentType: string;
  lastModified: string;
  userId: string;
  companyId: string;
  uploadDate: string;
  processingPriority: string;
  extractionFlags: {
    pricing: boolean;
    metrics: boolean;
    methodology: boolean;
  };
  status: DocumentStatus;
  version: string;
}

type FlattenedWebhookFields = Record<string, string | number | boolean>;

const flattenFields = (fields: WebhookFields): FlattenedWebhookFields => {
  const flattened: FlattenedWebhookFields = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        // Convert all values to primitive types
        flattened[`${key}_${subKey}`] = typeof subValue === 'boolean' 
          ? subValue 
          : String(subValue);
      });
    } else {
      flattened[key] = typeof value === 'boolean' ? value : String(value);
    }
  });
  
  return flattened;
};

export function useDocumentProcessing() {
  const { user } = useUser();
  const { updateDocument } = useDocumentStore();

  const processDocument = useCallback(async (document: Document) => {
    if (!user || !document.file) {
      throw new AppError(
        ErrorType.VALIDATION,
        'Missing required user or file data'
      );
    }

    try {
      updateDocument(document.id, { status: 'processing' });

      const fields: WebhookFields = {
        documentId: document.id,
        fileName: document.name,
        fileSize: document.size || 0,
        mimeType: document.file.type,
        contentType: document.contentType,
        lastModified: document.lastModified?.toISOString() || new Date().toISOString(),
        userId: user.id,
        companyId: user.publicMetadata.clientId as string,
        uploadDate: new Date().toISOString(),
        processingPriority: 'normal',
        extractionFlags: {
          pricing: document.contentType === 'pricing',
          metrics: document.contentType === 'case_study',
          methodology: document.contentType === 'methodology_and_frameworks'
        },
        status: 'processing',
        version: '1.0'
      };

      const flattenedFields = flattenFields(fields);
      const response = await sendWebhook(document.file, flattenedFields);
      const webhookData = await response.json() as unknown;
      
      // Type guard for webhook response
      const isWebhookResponse = (data: unknown): data is WebhookResponse => {
        return typeof data === 'object' && data !== null && 'success' in data;
      };

      if (!isWebhookResponse(webhookData) || !webhookData.success) {
        throw new AppError(
          ErrorType.CONTENT,
          'Document processing failed',
          { details: webhookData }
        );
      }

      updateDocument(document.id, { status: 'embedded' });
    } catch (error) {
      console.error('Error processing document:', error);
      updateDocument(document.id, { 
        status: 'failed',
        processingMetadata: {
          extractionFlags: {
            pricing: document.contentType === 'pricing',
            metrics: document.contentType === 'case_study',
            methodology: document.contentType === 'methodology_and_frameworks'
          },
          lastProcessed: new Date(),
          error: {
            type: error instanceof AppError ? error.type : ErrorType.CONTENT,
            message: error instanceof AppError ? error.message : 'Processing failed',
            details: error instanceof AppError ? error.context.details : undefined
          }
        }
      });
      throw error;
    }
  }, [user, updateDocument]);

  return { processDocument };
}