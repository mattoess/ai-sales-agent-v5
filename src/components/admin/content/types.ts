export interface Document {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  tags: string[];
  status: 'not_embedded' | 'processing' | 'embedded' | 'failed';
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