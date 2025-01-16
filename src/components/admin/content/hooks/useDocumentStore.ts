// src/components/admin/content/hooks/useDocumentStore.ts
import { create } from 'zustand';
import { makeApiRequest } from '@/services/make/api';
import { MAKE_CONFIG } from '@/services/make/config';
import { AppError, ErrorType } from '@/services/errors';
import { toast } from '@/components/ui/use-toast';
import { useClientStore } from '@/store/clientStore';
import type { 
  Document, 
  DocumentStatus,
  FileUploadProgress,
  DocumentFilters,
  DocumentSort,
  ContentType,
  DocumentMimeType,
  BatchDocumentProcessingPayload,
  DocumentMetadata
} from '@/types/DocumentLibrary';
import { normalizeTags } from '@/utils/tagUtils';

// API Types
interface BatchResponseDocument {
  'Document ID': string;
  'Name': string;
  'Description'?: string;
  'Client ID': string;
  'User ID': string;
  'Content Type': string;
  'Status': DocumentStatus;
  'Solutions': string;    // comma-separated
  'Audience': string;     // comma-separated
  'Tags': string;        // comma-separated
  'Created Date': string;
  'Modified Date': string;
  'error'?: string;
}

interface BatchResponse {
  status: "success";
  data: BatchResponseDocument[];
}

interface LoadDocumentsResponse {
  status: "success";
  data: {
    documents: BatchResponseDocument[];
  };
}

interface DeleteDocumentsResponse {
  status: "success";
  data: {
    deletedIds: string[];
  };
}

interface UpdateDocumentResponse {
  status: "success";
  data: BatchResponseDocument;
}

// Type guards
const isDeleteDocumentsResponse = (data: unknown): data is DeleteDocumentsResponse => {
  const response = data as DeleteDocumentsResponse;
  return (
    response?.status === "success" &&
    Array.isArray(response.data?.deletedIds) &&
    response.data.deletedIds.every(id => typeof id === 'string')
  );
};

const isBatchResponse = (data: unknown): data is BatchResponse => {
  const response = data as BatchResponse;
  return (
    response?.status === "success" &&
    Array.isArray(response.data)
  );
};

const isLoadDocumentsResponse = (data: unknown): data is LoadDocumentsResponse => {
  const response = data as LoadDocumentsResponse;
  return (
    response?.status === "success" &&
    Array.isArray(response.data?.documents)
  );
};

const isUpdateDocumentResponse = (data: unknown): data is UpdateDocumentResponse => {
  const response = data as UpdateDocumentResponse;
  return (
    response?.status === "success" &&
    response.data &&
    typeof response.data === 'object'
  );
};

// Helper Functions
const validateMimeType = (type: string): DocumentMimeType => {
  switch (type) {
    case 'application/pdf':
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return type as DocumentMimeType;
    default:
      return 'application/pdf';
  }
};

interface DocumentStore {
  documents: Document[];
  selectedDocumentIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  uploadProgress: Map<string, FileUploadProgress>;

  processBatchDocuments: (
    documents: Array<{
      file: File;
      metadata: DocumentMetadata;
    }>
  ) => Promise<void>;
  
  loadDocuments: (clientId: string) => Promise<void>;
  deleteDocuments: (documentIds: string[]) => Promise<void>;
  updateDocument: (documentId: string, metadata: DocumentMetadata) => Promise<void>;
  toggleDocumentSelection: (id: string) => void;
  clearSelection: () => void;
  setUploadProgress: (fileId: string, progress: FileUploadProgress) => void;
  removeUploadProgress: (fileId: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  selectedDocumentIds: new Set(),
  isLoading: false,
  error: null,
  uploadProgress: new Map(),

  processBatchDocuments: async (documents: Array<{
    file: File;
    metadata: DocumentMetadata;
  }>) => {
    const store = get();
    const fileIds = documents.map(doc => `${doc.file.name}-${Date.now()}`);
    
    fileIds.forEach(fileId => {
      store.setUploadProgress(fileId, {
        progress: 0,
        status: 'ready to process'
      });
    });
  
    try {
      const clientId = useClientStore.getState().client.data.clientId;
      const userId = useClientStore.getState().client.data.userID;
  
      if (!clientId || !userId) {
        throw new AppError(
          ErrorType.AUTH,
          'Client ID or User ID not found'
        );
      }
  
      // Convert files to base64
      const documentsWithBase64 = await Promise.all(
        documents.map(async (doc, index) => {
          // Convert file to base64
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Remove data:application/pdf;base64, prefix
              const base64String = (reader.result as string).split(',')[1];
              resolve(base64String);
            };
            reader.readAsDataURL(doc.file);
          });
  
          return {
            fileKey: `file_${index}`,
            name: doc.file.name,
            size: doc.file.size,
            mimeType: validateMimeType(doc.file.type),
            contentType: doc.metadata.contentType,
            fileData: base64,  // Include base64 data
            metadata: {
              description: doc.metadata.description,
              solutions: doc.metadata.solutions,
              audience: doc.metadata.audience,
              tags: doc.metadata.tags,
              contentType: doc.metadata.contentType
            }
          };
        })
      );
  
      const payload: BatchDocumentProcessingPayload = {
        metadata: {
          documents: documentsWithBase64,
          context: {
            clientId,
            userId
          },
          action: 'process'
        }
      };

      // Log the webhook payload for debugging
      console.log('Sending batch processing payload:', payload);

      const response = await makeApiRequest<BatchResponse>(
        MAKE_CONFIG.urls.content.process,
        payload,
        isBatchResponse
      );

      console.log('Received batch processing response:', response);

      if (response.status === "success") {
        response.data.forEach((docResponse, index) => {
          const fileId = fileIds[index];
          
          if (docResponse.Status === 'completed') {
            store.setUploadProgress(fileId, {
              progress: 100,
              status: 'completed'
            });
          } else {
            store.setUploadProgress(fileId, {
              progress: 0,
              status: 'failed',
              error: docResponse.error || 'Processing failed'
            });
          }
        });
      }
    } catch (error) {
      console.error('Batch processing failed:', error);
      fileIds.forEach(fileId => {
        store.setUploadProgress(fileId, {
          progress: 0,
          status: 'failed',
          error: error instanceof AppError ? error.message : 'Failed to process documents'
        });
      });
      throw error;
    }
  },

  loadDocuments: async (clientId: string) => {
    try {
      set({ isLoading: true });
      
      const response = await makeApiRequest<LoadDocumentsResponse>(
        MAKE_CONFIG.urls.content.process,
        { 
          action: 'load',
          clientId
        },
        isLoadDocumentsResponse
      );

      console.log('Received load documents response:', response);

      if (response.status === "success") {
        set({ 
          documents: response.data.documents.map(doc => ({
            id: doc['Document ID'],
            name: doc['Name'],
            description: doc['Description'],
            clientId: doc['Client ID'],
            userId: doc['User ID'],
            contentType: doc['Content Type'] as ContentType,
            status: doc['Status'],
            size: 0, // Size not available for loaded documents
            lastModified: new Date(doc['Modified Date']),
            mimeType: 'application/pdf' as DocumentMimeType,
            metadata: {
              solutions: doc['Solutions'],
              audience: doc['Audience'],
              tags: normalizeTags(doc['Tags']),
              contentType: doc['Content Type'] as ContentType
            }
          })),
          error: null
        });
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      const message = error instanceof AppError ? error.message : 'Failed to load documents';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDocument: async (documentId: string, metadata: DocumentMetadata) => {
    try {
      set({ isLoading: true });

      const response = await makeApiRequest<UpdateDocumentResponse>(
        MAKE_CONFIG.urls.content.process,
        {
          action: 'update',
          documentId,
          metadata
        },
        isUpdateDocumentResponse
      );

      console.log('Document update response:', response);

      if (response.status === "success") {
        set(state => ({
          documents: state.documents.map(doc =>
            doc.id === documentId
              ? {
                  ...doc,
                  description: metadata.description,
                  metadata: {
                    solutions: metadata.solutions,
                    audience: metadata.audience,
                    tags: metadata.tags,
                    contentType: metadata.contentType
                  }
                }
              : doc
          ),
          error: null
        }));
      }
    } catch (error) {
      console.error('Failed to update document:', error);
      const message = error instanceof AppError ? error.message : 'Failed to update document';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDocuments: async (documentIds: string[]) => {
    try {
      set({ isLoading: true });

      const response = await makeApiRequest<DeleteDocumentsResponse>(
        MAKE_CONFIG.urls.content.process,
        {
          action: 'delete',
          documentIds
        },
        isDeleteDocumentsResponse
      );

      if (response.status === "success") {
        set(state => ({
          documents: state.documents.filter(doc => !documentIds.includes(doc.id)),
          selectedDocumentIds: new Set(),
          error: null
        }));
      }
    } catch (error) {
      const message = error instanceof AppError ? error.message : 'Failed to delete documents';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  toggleDocumentSelection: (id: string) => set((state) => ({
    selectedDocumentIds: new Set(
      state.selectedDocumentIds.has(id)
        ? Array.from(state.selectedDocumentIds).filter(docId => docId !== id)
        : [...state.selectedDocumentIds, id]
    )
  })),

  clearSelection: () => set({ selectedDocumentIds: new Set() }),

  setUploadProgress: (fileId: string, progress: FileUploadProgress) => set((state) => ({
    uploadProgress: new Map(state.uploadProgress).set(fileId, progress)
  })),

  removeUploadProgress: (fileId: string) => set((state) => {
    const newProgress = new Map(state.uploadProgress);
    newProgress.delete(fileId);
    return { uploadProgress: newProgress };
  })
}));