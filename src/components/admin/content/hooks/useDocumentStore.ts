// src/components/admin/content/hooks/useDocumentStore.ts
import create from 'zustand';
import type { Document } from '../types';

interface DocumentStore {
  documents: Document[];
  currentPath: string;
  addDocument: (doc: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  updateDocuments: (docs: Document[]) => void;  // New function
  setCurrentPath: (path: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  currentPath: '/',
  
  addDocument: (doc) => 
    set((state) => ({
      documents: [...state.documents, doc]
    })),
  
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === id ? { ...doc, ...updates } : doc
      )
    })),

  // New function to update multiple documents at once
  updateDocuments: (docs) =>
    set(() => ({
      documents: docs
    })),
  
  setCurrentPath: (path) =>
    set(() => ({
      currentPath: path
    }))
}));