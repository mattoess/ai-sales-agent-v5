// src/components/admin/content/tabs/DocumentsTab.tsx
import { useSolutionStore } from '@/store/solutionStore';
import { DocumentLibrary } from '@/components/admin/content/DocumentLibrary';

interface DocumentsTabProps {
  filters: {
    status: string[];
    search: string;
  };
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onEditPage: (pageId?: string) => void;
  isEditorOpen: boolean;
  selectedPage: string | null;
  onCloseEditor: () => void;
}

export function DocumentsTab(props: DocumentsTabProps) {
  const solutions = useSolutionStore(state => state.solutions);
  
  return (
    <DocumentLibrary 
      {...props} 
      availableSolutions={solutions}
    />
  );
}