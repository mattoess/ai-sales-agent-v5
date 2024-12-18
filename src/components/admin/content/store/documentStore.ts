import { create } from 'zustand';
import type { Document, FileUploadProgress, Folder } from '../types';

interface DocumentState {
  documents: Document[];
  folders: Folder[];
  uploadProgress: Record<string, FileUploadProgress>;
  currentPath: string;
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setUploadProgress: (fileId: string, progress: FileUploadProgress) => void;
  setCurrentPath: (path: string) => void;
  addFolder: (folder: Folder) => void;
  deleteFolder: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  folders: [],
  uploadProgress: {},
  currentPath: '/',
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
  setUploadProgress: (fileId, progress) =>
    set((state) => ({
      uploadProgress: { ...state.uploadProgress, [fileId]: progress },
    })),
  setCurrentPath: (path) => set({ currentPath: path }),
  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),
  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
    })),
}));