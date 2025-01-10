// src/components/admin/content/shared/VideoUploader/types.ts
export type VideoStatus = 'pending' | 'processing' | 'embedded' | 'failed';

export interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  status?: VideoStatus;
}

export interface VideoInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAdd: () => Promise<void>;
  error?: string;
  disabled?: boolean;
}

export interface VideoListProps {
  videos: Video[];
  onDelete?: (id: string) => void;
  onRetry?: (id: string) => Promise<void>;
}

export interface VideoListItemProps {
  video: Video;
  onDelete?: () => void;
  onRetry?: () => Promise<void>;
}