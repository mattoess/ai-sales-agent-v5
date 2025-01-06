import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '../../../../ui/badge';

interface TagListProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

export function TagList({ tags, onRemoveTag }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="flex items-center gap-1"
        >
          {tag}
          <button
            onClick={() => onRemoveTag(tag)}
            className="ml-1 hover:text-red-500"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}