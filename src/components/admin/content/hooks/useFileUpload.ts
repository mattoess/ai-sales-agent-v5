import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentStore } from './useDocumentStore';
import { makeApiRequest } from '../../../../services/make/api';
import { MAKE_CONFIG } from '../../../../services/make/config';
import { generateId } from '../utils/ids';
import { Document, AudienceType, ContentType, DocumentStatus } from '../types';

interface UploadResponse {
  success: boolean;
  documentId: string;
  status: 'uploaded' | 'failed';
}

interface UploadMetadata {
  solutions: string[];
  industries: string[];
  outcomes: string[];
  audience: AudienceType[];
  vectorNamespace: string;
}

export function useFileUpload() {
  const { user } = useUser();
  const { addDocument } = useDocumentStore();

  const uploadFiles = useCallback(async (
    files: FileList, 
    path: string,
    metadata: UploadMetadata
  ) => {
    if (!user) return;

    const validateResponse = (data: unknown): data is UploadResponse => {
      const response = data as UploadResponse;
      return (
        typeof response === 'object' &&
        response !== null &&
        typeof response.success === 'boolean' &&
        typeof response.documentId === 'string' &&
        ['uploaded', 'failed'].includes(response.status)
      );
    };

    for (const file of Array.from(files)) {
      const doc: Document = {
        id: generateId(),
        clientId: user.publicMetadata.clientId as string,
        userId: user.id,
        name: file.name,
        type: 'file',
        path,
        size: file.size,
        lastModified: new Date(file.lastModified),
        file,
        tags: [],
        contentType: {
          primary: 'solution' as ContentType,
          subtype: undefined
        },
        metadata: {
          ...metadata,
          vectorNamespace: metadata.vectorNamespace
        },
        status: 'not_embedded' as DocumentStatus,
        processingMetadata: {
          priority: 'normal',
          vectorNamespace: metadata.vectorNamespace,
          extractionFlags: {
            pricing: false,
            metrics: true,
            methodology: true
          }
        }
      };

      addDocument(doc);

      await makeApiRequest<UploadResponse>(
        MAKE_CONFIG.urls.content.process,
        {
          document: doc,
          user: {
            id: user.id,
            clientId: user.publicMetadata.clientId,
            email: user.primaryEmailAddress?.emailAddress
          }
        },
        validateResponse,
        MAKE_CONFIG.timeouts.content.process
      );
    }
  }, [user, addDocument]);

  return { uploadFiles };
}