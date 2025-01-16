// src/hooks/useCloudStorage.ts
import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDocumentLibraryStore } from '@/store/documentLibraryStore';
import { googleDriveService } from '@/services/storage/googleDrive';
import { dropboxService } from '@/services/storage/dropbox';
import type { ContentType } from '@/types/DocumentLibrary';

export function useCloudStorage(contentType: ContentType) {
  const { user } = useUser();
  const { addDocument } = useDocumentLibraryStore();
  const [isLoading, setIsLoading] = useState<'google' | 'dropbox' | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (!user) return;

    files.forEach(file => { 
      addDocument({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        lastModified: new Date(),
        file,
        mimeType: file.type as any,
        contentType,
        path: '/',
        tags: [],
        clientId: user.publicMetadata.clientId as string,
        userId: user.id,
        metadata: {
          solutions: [],
          audience: [],
        },
        status: 'not_embedded'
      });
    });
  }, [user, addDocument, contentType]);

  const openGoogleDrivePicker = useCallback(async () => {
    try {
      setError(null);
      setIsLoading('google');
      const files = await googleDriveService.pickFiles();
      await handleFilesSelected(files);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load from Google Drive'));
      console.error('Google Drive error:', err);
    } finally {
      setIsLoading(null);
    }
  }, [handleFilesSelected]);

  const openDropboxChooser = useCallback(async () => {
    try {
      setError(null);
      setIsLoading('dropbox');
      const files = await dropboxService.pickFiles();
      await handleFilesSelected(files);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load from Dropbox'));
      console.error('Dropbox error:', err);
    } finally {
      setIsLoading(null);
    }
  }, [handleFilesSelected]);

  return {
    openGoogleDrivePicker,
    openDropboxChooser,
    isLoading,
    error
  };
}