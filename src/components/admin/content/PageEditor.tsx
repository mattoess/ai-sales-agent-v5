import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface PageEditorProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    title: string;
    content: string;
    slug: string;
  };
}

export function PageEditor({ onClose, onSave, initialData }: PageEditorProps) {
  const [formData, setFormData] = React.useState(initialData || {
    title: '',
    content: '',
    slug: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? 'Edit Page' : 'Create New Page'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Page Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter page title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">URL Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="page-url-slug"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full h-64 p-2 border rounded-md"
              placeholder="Enter page content..."
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Create Page'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}