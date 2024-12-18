import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Clock, Eye, User } from 'lucide-react';

interface PageMetadataProps {
  page: {
    views: number;
    lastModified: Date;
    author: string;
    status: string;
  };
}

export function PageMetadata({ page }: PageMetadataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Page Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Page Views</span>
            </div>
            <span className="font-medium">{page.views}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last Modified</span>
            </div>
            <span className="font-medium">
              {page.lastModified.toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Author</span>
            </div>
            <span className="font-medium">{page.author}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
              {page.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}