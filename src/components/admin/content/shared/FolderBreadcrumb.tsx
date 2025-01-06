import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useDocumentStore } from '../hooks/useDocumentStore';

export function FolderBreadcrumb() {
  const { currentPath, setCurrentPath } = useDocumentStore();

  const pathSegments = currentPath.split('/').filter(Boolean);

  const handleClick = (index: number) => {
    const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
    setCurrentPath(newPath);
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <button
        onClick={() => setCurrentPath('/')}
        className="flex items-center hover:text-gray-900"
      >
        <Home className="w-4 h-4" />
      </button>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => handleClick(index)}
            className="hover:text-gray-900"
          >
            {segment}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}