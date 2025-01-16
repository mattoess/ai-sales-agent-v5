// src/components/admin/content/store/documentStore.ts
import { create } from 'zustand';
import { makeApiRequest } from '../../../../services/make/api';
import { MAKE_CONFIG } from '../../../../services/make/config';
import { AppError } from '../../../../services/errors';
import { useClientStore } from '@/store/clientStore';
import type { 
  Document, 
  FileUploadProgress, 
  DocumentSort,
  DocumentFilters,
  DocumentStatus,
  ContentType,
  BatchDocumentProcessingPayload
} from '@/types/DocumentLibrary';

interface BatchProcessResponse {
  status: "success";
  data: {
    documents: Array<{
      id: string;
      status: DocumentStatus;
      error?: string;
    }>;
  };
}

interface DocumentState {
  documents: Document[];
  uploadProgress: Record<string, FileUploadProgress>;
  currentSort: DocumentSort;
  currentFilters: DocumentFilters;
  selectedDocumentIds: string[];
  isLoading: boolean;
  isProcessing: boolean;

  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document> & { error?: string }) => void;
  deleteDocument: (id: string) => void;
  setUploadProgress: (fileId: string, progress: FileUploadProgress) => void;
  clearUploadProgress: (fileId: string) => void;
  setSelectedDocuments: (ids: string[]) => void;
  toggleDocumentSelection: (id: string) => void;
  clearSelection: () => void;
  setSortField: (sort: DocumentSort) => void;
  setFilters: (filters: DocumentFilters) => void;
  clearFilters: () => void;
  processSelectedDocuments: (clientId: string, userId: string) => Promise<void>;
  deleteSelectedDocuments: () => Promise<void>;
  getFilteredDocuments: () => Document[];
  getSortedDocuments: (docs: Document[]) => Document[];
  getVisibleDocuments: () => Document[];
}

const isBatchProcessResponse = (data: unknown): data is BatchProcessResponse => {
  const response = data as BatchProcessResponse;
  return (
    response?.status === "success" &&
    Array.isArray(response.data?.documents) &&
    response.data.documents.every(doc => 
      typeof doc.id === 'string' &&
      typeof doc.status === 'string'
    )
  );
};

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  uploadProgress: {},
  currentSort: { field: 'lastModified', direction: 'desc' },
  currentFilters: {},
  selectedDocumentIds: [],
  isLoading: false,
  isProcessing: false,

  setDocuments: (documents) => set({ documents }),
  
  addDocument: (document) => set((state) => ({ 
    documents: [...state.documents, document] 
  })),
  
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map((doc) =>
      doc.id === id ? {
        ...doc,
        ...updates,
        metadata: {
          ...doc.metadata,
          ...(updates.metadata || {}),
          error: updates.error // Store error in metadata
        }
      } : doc
    ),
  })),
  
  deleteDocument: (id) => set((state) => ({
    documents: state.documents.filter((doc) => doc.id !== id),
    selectedDocumentIds: state.selectedDocumentIds.filter(docId => docId !== id),
    uploadProgress: (() => {
      const { [id]: _, ...rest } = state.uploadProgress;
      return rest;
    })()
  })),

  setUploadProgress: (fileId, progress) => set((state) => ({
    uploadProgress: { ...state.uploadProgress, [fileId]: progress },
  })),

  clearUploadProgress: (fileId) => set((state) => {
    const { [fileId]: _, ...rest } = state.uploadProgress;
    return { uploadProgress: rest };
  }),

  setSelectedDocuments: (ids) => set({ selectedDocumentIds: ids }),
  
  toggleDocumentSelection: (id) => set((state) => ({
    selectedDocumentIds: state.selectedDocumentIds.includes(id)
      ? state.selectedDocumentIds.filter(docId => docId !== id)
      : [...state.selectedDocumentIds, id]
  })),
  
  clearSelection: () => set({ selectedDocumentIds: [] }),

  setSortField: (sort) => set({ currentSort: sort }),
  setFilters: (filters) => set({ currentFilters: filters }),
  clearFilters: () => set({ currentFilters: {} }),

  processSelectedDocuments: async (clientId: string, userId: string) => {
    const state = get();
    const documentsToProcess = state.documents.filter(
      doc => state.selectedDocumentIds.includes(doc.id) && doc.file !== undefined 
    );

    set({ isProcessing: true });

    try {
      // Convert files to base64 first
      const documentsWithBase64 = await Promise.all(
        documentsToProcess.map(async (doc, index) => {
          // We know doc.file exists because of the filter above
          const fileData = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = (reader.result as string).split(',')[1];
              resolve(base64String);
            };
            reader.readAsDataURL(doc.file!); // We can use ! here because we filtered
          });

          return {
            fileKey: `file_${index}`,
            name: doc.name,
            size: doc.size,
            mimeType: doc.mimeType,
            contentType: doc.contentType,
            fileData,
            metadata: {
              description: doc.description,
              solutions: doc.metadata.solutions,
              audience: doc.metadata.audience,
              tags: doc.metadata.tags,
              contentType: doc.contentType
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

      // Remove FormData related code since we're using JSON with base64
      const response = await makeApiRequest<BatchProcessResponse>(
        MAKE_CONFIG.urls.content.process,
        { 
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        },
        isBatchProcessResponse,
        MAKE_CONFIG.timeouts.content.process
      );

      if (response.status === "success") {
        response.data.documents.forEach(result => {
          get().updateDocument(result.id, { 
            status: result.status,
            error: result.error
          });
        });
      }

    } catch (error) {
      documentsToProcess.forEach(doc => {
        get().updateDocument(doc.id, { 
          status: 'failed',
          error: error instanceof AppError ? error.message : 'Processing failed'
        });
      });
      throw error;
    } finally {
      set({ isProcessing: false });
      get().clearSelection();
    }
  },

  deleteSelectedDocuments: async () => {
    const { selectedDocumentIds, documents } = get();
    const documentsToDelete = documents.filter(
      doc => selectedDocumentIds.includes(doc.id)
    );

    for (const doc of documentsToDelete) {
      await get().deleteDocument(doc.id);
    }
    
    get().clearSelection();
  },

  getFilteredDocuments: () => {
    const { documents, currentFilters } = get();
    
    return documents.filter(doc => {
      if (currentFilters.contentTypes?.length && 
          !currentFilters.contentTypes.includes(doc.contentType)) {
        return false;
      }
      
      if (currentFilters.solutions) {
        const filterSolutions = currentFilters.solutions.split(',');
        const documentSolutions = doc.metadata.solutions.split(',');
        if (!documentSolutions.some(sol => filterSolutions.includes(sol))) {
          return false;
        }
      }
      
      if (currentFilters.status?.length && 
          !currentFilters.status.includes(doc.status)) {
        return false;
      }
      
      if (currentFilters.search) {
        const searchLower = currentFilters.search.toLowerCase();
        return doc.name.toLowerCase().includes(searchLower) ||
               (doc.description?.toLowerCase().includes(searchLower) || false) ||
               doc.metadata.solutions.toLowerCase().includes(searchLower);
      }
      
      if (currentFilters.dateRange) {
        return doc.lastModified >= currentFilters.dateRange.start && 
               doc.lastModified <= currentFilters.dateRange.end;
      }
      
      return true;
    });
  },

  getSortedDocuments: (docs) => {
    const { currentSort } = get();
    
    return [...docs].sort((a, b) => {
      let compareResult = 0;
      
      switch (currentSort.field) {
        case 'name':
        case 'contentType':
        case 'status':
          compareResult = String(a[currentSort.field]).localeCompare(
            String(b[currentSort.field])
          );
          break;
        
        case 'lastModified':
          compareResult = a.lastModified.getTime() - b.lastModified.getTime();
          break;

        case 'size':
          compareResult = a.size - b.size;
          break;
      }
      
      return currentSort.direction === 'asc' ? compareResult : -compareResult;
    });
  },

  getVisibleDocuments: () => {
    const filteredDocs = get().getFilteredDocuments();
    return get().getSortedDocuments(filteredDocs);
  }
}));