import React from 'react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { generateSlug } from '../../../../utils/content';

interface EditorFormProps {
  initialData?: {
    title: string;
    content: string;
    slug: string;
  };
  onSubmit: (data: any) => void;
}

export function EditorForm({ initialData, onSubmit }: EditorFormProps) {
  const [formData, setFormData] = React.useState(initialData || {
    title: '',
    content: '',
    slug: '',
  });

  const [isDirty, setIsDirty] = React.useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'title' && !prev.slug) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Page Title</label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter page title"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">URL Slug</label>
        <Input
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="page-url-slug"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full h-64 p-2 border rounded-md"
          placeholder="Enter page content..."
          required
        />
      </div>
    </form>
  );
}