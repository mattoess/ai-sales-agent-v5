import { useCallback } from 'react';
import { useDocumentStore } from '../components/admin/content/hooks/useDocumentStore';
import { generateId } from '../components/admin/content/utils/ids';
import { Document, FileUploadProgress } from '../components/admin/content/types';

export function useFileUpload() {
  const { addDocument, setUploadProgress } = useDocumentStore();

  const uploadFiles = useCallback(async (files: FileList, path: string) => {
    Array.from(files).forEach(async (file) => {
      const fileId = generateId();
      
      // Create document record
      const document: Document = {
        id: fileId,
        name: file.name,
        type: 'file',
        path,
        tags: [],
        status: 'not_embedded',
        size: file.size,
        lastModified: new Date(file.lastModified),
        file: file // Store the file for later processing
      };

      addDocument(document);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        const uploadProgress: FileUploadProgress = {
          fileId,
          progress,
          status: progress < 100 ? 'uploading' : 'complete',
        };
        
        setUploadProgress(fileId, uploadProgress);

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
    });
  }, [addDocument, setUploadProgress]);

  return {
    uploadFiles
  };
}