export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
  };
  metadata: {
    views: number;
    lastModified: Date;
  };
}

export interface PageFilters {
  status: string[];
  search: string;
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PageEditorState {
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
}