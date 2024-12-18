import React from 'react';
import { Button } from '../../ui/button';
import { FileText, Folder } from 'lucide-react';
import { useDocumentStore } from './hooks/useDocumentStore';
import { useEmbeddingQueue } from './hooks/useEmbeddingQueue';
import { StatusBadge } from './components/StatusBadge';
import { Document } from './types';

export function DocumentTable() {
  const { documents } = useDocumentStore();
  const { embedDocument } = useEmbeddingQueue();

  const handleEmbed = async (doc: Document) => {
    if (doc.type === 'file' && doc.status === 'not_embedded') {
      await embedDocument(doc);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b bg-gray-50">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Embed File?</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {doc.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{doc.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-500">{doc.path}</td>
              <td className="px-4 py-3">
                <StatusBadge status={doc.status} />
              </td>
              <td className="px-4 py-3">
                {doc.type === 'file' && doc.status === 'not_embedded' && (
                  <Button
                    size="sm"
                    onClick={() => handleEmbed(doc)}
                  >
                    Embed Now
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {documents.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No documents uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}