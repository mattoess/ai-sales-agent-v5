import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { EditorForm } from './EditorForm';
import { EditorToolbar } from './EditorToolbar';
import { usePageEditor } from '../../../../hooks/content/usePageEditor';

interface PageEditorProps {
  onClose: () => void;
  pageId?: string | null;
}

export function PageEditor({ onClose, pageId }: PageEditorProps) {
  const {
    formData,
    errors,
    isDirty,
    handleChange,
    validate,
    reset
  } = usePageEditor();

  const handleSave = async () => {
    if (validate()) {
      // Implement save logic
      console.log('Saving...', formData);
      reset();
      onClose();
    }
  };

  return (
    <Card className="w-full">
      <EditorToolbar onSave={handleSave} onClose={onClose} isDirty={isDirty} />
      <CardHeader>
        <CardTitle>{pageId ? 'Edit Page' : 'Create New Page'}</CardTitle>
      </CardHeader>
      <CardContent>
        <EditorForm
          initialData={formData}
          errors={errors}
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  );
}