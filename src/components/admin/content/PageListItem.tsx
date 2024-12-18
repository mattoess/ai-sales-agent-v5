import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { formatDistanceToNow } from '../../../utils/date';

interface PageListItemProps {
  page: {
    title: string;
    updatedAt: Date;
    status: 'draft' | 'published' | 'archived';
  };
}

export function PageListItem({ page }: PageListItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{page.title}</CardTitle>
            <CardDescription>
              Last updated {formatDistanceToNow(page.updatedAt)}
            </CardDescription>
          </div>
          <Badge>{page.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="outline" size="sm">Preview</Button>
          <Button variant="outline" size="sm">Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}