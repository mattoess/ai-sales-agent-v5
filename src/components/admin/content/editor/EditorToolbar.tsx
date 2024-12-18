import React from 'react';
import { Button } from '../../../ui/button';
import { Save, X } from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  onClose: () => void;
  isDirty: boolean;
}

export function EditorToolbar({ onSave, onClose, isDirty }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <Button variant="ghost" onClick={onClose}>
        <X className="w-4 h-4 mr-2" />
        Close
      </Button>
      <Button onClick={onSave} disabled={!isDirty}>
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}