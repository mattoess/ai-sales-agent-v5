```typescript
import React from 'react';
import { MoreVertical, Edit, Trash2, Tag, Eye } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';

interface DocumentActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  onManageTags?: () => void;
}

export function DocumentActions({
  onEdit,
  onDelete,
  onPreview,
  onManageTags,
}: DocumentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onPreview && (
          <DropdownMenuItem onClick={onPreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
        )}
        {onManageTags && (
          <DropdownMenuItem onClick={onManageTags}>
            <Tag className="w-4 h-4 mr-2" />
            Manage Tags
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```