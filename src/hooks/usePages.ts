import { useState, useEffect } from 'react';

interface Page {
  title: string;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([
    {
      title: 'Home',
      updatedAt: new Date(),
      status: 'published'
    },
    {
      title: 'About',
      updatedAt: new Date(),
      status: 'published'
    },
    {
      title: 'Services',
      updatedAt: new Date(),
      status: 'published'
    },
    {
      title: 'Contact',
      updatedAt: new Date(),
      status: 'published'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  return { pages, isLoading };
}