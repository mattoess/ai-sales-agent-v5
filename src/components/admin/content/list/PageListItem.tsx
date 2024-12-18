import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { formatDistanceToNow } from '../../../../utils/date';
import { Eye, Edit, Settings } from 'lucide-react';

interface PageListItemProps {
  page: {
    id: string;
    title: string;
    updatedAt: Date;
    status: 'draft' | 'published' | 'archived';
    views?: number;
  };
  onEdit: () => void;
}

export function PageListItem({ page, onEdit }: PageListItemProps) {
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
          <div className="flex items-center space-x-2">
            {page.views !== undefined && (
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                {page.views}
              </div>
            )}
            <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
              {page.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}