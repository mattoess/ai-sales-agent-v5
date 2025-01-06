// src/components/admin/content/shared/VideoUploader/types.ts
export interface Video {
    id: string;
    url: string;
    title: string;
    description?: string;
    thumbnail?: string;
    status?: 'pending' | 'processing' | 'embedded' | 'failed';
    metadata?: {
      duration?: string;
      views?: number;
      channel?: string;
      publishDate?: string;
    };
  }
  
  export interface VideoInputProps {
    url: string;
    onUrlChange: (url: string) => void;
    onAdd: () => void;
    error?: string;
  }
  
  export interface VideoListProps {
    videos: Video[];
    onDelete?: (id: string) => void;
    onRetry?: (id: string) => void;
  }