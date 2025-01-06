import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../ui/dialog';
import { TagInput } from './TagInput';
import { TagList } from './TagList';

interface TagManagerProps {
  open: boolean;
  onClose: () => void;
}

export function TagManager({ open, onClose }: TagManagerProps) {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([
    'enterprise',
    'overview',
    'case-study',
    'technical',
    'solution-brief'
  ]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <TagInput 
            value={newTag}
            onChange={setNewTag}
            onAdd={handleAddTag}
          />
          <TagList 
            tags={tags}
            onRemoveTag={handleRemoveTag}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}