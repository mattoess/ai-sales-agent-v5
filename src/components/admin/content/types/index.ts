export interface Document {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  tags: string[];
  status: 'not_embedded' | 'processing' | 'embedded' | 'failed' | 'waiting';
  size?: number;
  lastModified?: Date;
  file?: File;
}

export interface FileUploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface EmbedRequest {
  id: string;
  file: File;
  userId: string;
  companyId: string;
  metadata: {
    fileName: string;
    fileSize: number;
    uploadDate: string;
    tags: string[];
  };
}