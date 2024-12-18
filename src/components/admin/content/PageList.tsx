import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { PageListItem } from './PageListItem';
import { usePages } from '../../../hooks/usePages';

export function PageList() {
  const { pages, isLoading } = usePages();

  if (isLoading) {
    return <div className="text-center py-12">Loading pages...</div>;
  }

  return (
    <div className="grid gap-4">
      {pages.map((page) => (
        <PageListItem key={page.title} page={page} />
      ))}
    </div>
  );
}