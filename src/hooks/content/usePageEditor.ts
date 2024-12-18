import { useState } from 'react';
import { validateSlug } from '../../utils/content';

interface PageData {
  title: string;
  content: string;
  slug: string;
}

export function usePageEditor(initialData?: PageData) {
  const [formData, setFormData] = useState<PageData>(initialData || {
    title: '',
    content: '',
    slug: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PageData, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PageData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!validateSlug(formData.slug)) {
      newErrors.slug = 'Invalid slug format';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof PageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    formData,
    errors,
    isDirty,
    handleChange,
    validate,
    reset: () => {
      setFormData(initialData || { title: '', content: '', slug: '' });
      setErrors({});
      setIsDirty(false);
    },
  };
}