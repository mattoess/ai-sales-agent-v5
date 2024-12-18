export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

export function formatPageStatus(status: string): {
  label: string;
  color: 'default' | 'secondary' | 'destructive';
} {
  switch (status) {
    case 'published':
      return { label: 'Published', color: 'default' };
    case 'draft':
      return { label: 'Draft', color: 'secondary' };
    case 'archived':
      return { label: 'Archived', color: 'destructive' };
    default:
      return { label: status, color: 'secondary' };
  }
}