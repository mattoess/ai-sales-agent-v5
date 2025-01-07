// src/components/admin/content/shared/DocumentTable.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Folder, RotateCcw, AlertCircle } from 'lucide-react';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import type { Document, BulkEditableDocument } from '../types';
import { ErrorDisplay } from '@/components/ui/error-display';
import { AppError, ErrorType } from '@/services/errors';
import { EditingPanel } from '../DocumentLibrary/components/BulkEditTable/EditingPanel';
import { BulkActions } from './BulkActions';

export function DocumentTable() {
  const { documents, updateDocument } = useDocumentStore();
  const { embedDocument, getError } = useEmbeddingQueue();
  const [processingError, setProcessingError] = useState<AppError | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [editingDoc, setEditingDoc] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedDocs(checked ? documents.map(d => d.id) : []);
  };

  const handleSelectDocument = (docId: string, checked: boolean) => {
    setSelectedDocs(prev => 
      checked ? [...prev, docId] : prev.filter(id => id !== docId)
    );
  };

  const handleEmbed = async (doc: Document) => {
    try {
      setProcessingError(null);
      if (doc.type === 'file' && (doc.status === 'not_embedded' || doc.status === 'failed')) {
        await embedDocument(doc);
      }
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(
            ErrorType.CONTENT,
            'Failed to start document processing',
            { originalError: error }
          );
      setProcessingError(appError);
    }
  };

  const handleBulkProcess = async () => {
    const selectedDocuments = documents.filter(doc => 
      selectedDocs.includes(doc.id) && 
      (doc.status === 'not_embedded' || doc.status === 'failed')
    );

    setProcessingError(null);
    
    try {
      await Promise.all(selectedDocuments.map(doc => handleEmbed(doc)));
      setSelectedDocs([]); // Clear selection after processing
    } catch (error) {
      setProcessingError(
        new AppError(
          ErrorType.CONTENT,
          'Failed to process selected documents',
          { 
            originalError: error,
            details: {
              selectedCount: selectedDocuments.length
            }
          }
        )
      );
    }
  };

  const handleBulkUpdate = (updates: Partial<Document>) => {
    selectedDocs.forEach(docId => {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        updateDocument(docId, {
          ...doc,
          ...updates
        });
      }
    });
    setSelectedDocs([]); // Clear selection after update
  };

  const handleRetryAll = async () => {
    const failedDocs = documents.filter(doc => doc.status === 'failed');
    setProcessingError(null);
    
    try {
      await Promise.all(failedDocs.map(doc => handleEmbed(doc)));
    } catch (error) {
      setProcessingError(
        new AppError(
          ErrorType.CONTENT,
          'Failed to retry processing documents',
          { 
            originalError: error,
            details: {
              failedCount: failedDocs.length
            }
          }
        )
      );
    }
  };

  const handleUpdateDocument = (updatedDoc: BulkEditableDocument) => {
    const { isSelected, isPendingEdit, ...docWithoutBulkProps } = updatedDoc;
    updateDocument(updatedDoc.id, docWithoutBulkProps);
    setEditingDoc(null);
  };

  const getStatusBadge = (doc: Document) => {
    const error = getError(doc.id);
    const showError = doc.status === 'failed' && error;

    switch (doc.status) {
      case 'embedded':
        return <Badge className="bg-green-100 text-green-800">Embedded</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 animate-pulse">Processing</Badge>;
      case 'waiting':
        return <Badge className="bg-yellow-100 text-yellow-800">Waiting</Badge>;
      case 'failed':
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-800">Failed</Badge>
            {showError && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <AlertCircle className="w-4 h-4 text-red-500 cursor-help" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{error.message}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">Not Embedded</Badge>;
    }
  };

  const failedCount = documents.filter(doc => doc.status === 'failed').length;
  const editableDocuments: BulkEditableDocument[] = documents.map(doc => ({
    ...doc,
    isSelected: selectedDocs.includes(doc.id),
    isPendingEdit: editingDoc === doc.id
  }));

  return (
    <div className="space-y-4">
      {processingError && (
        <ErrorDisplay
          type={processingError.type}
          message={processingError.message}
          details={processingError.context.details}
          onDismiss={() => setProcessingError(null)}
        />
      )}

      {selectedDocs.length > 0 && (
        <BulkActions
          selectedCount={selectedDocs.length}
          totalCount={documents.length}
          onProcessSelected={handleBulkProcess}
          onClearSelection={() => setSelectedDocs([])}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {selectedDocs.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedDocs.length} of {documents.length} selected
            </span>
          )}
        </div>
        {failedCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetryAll}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Failed ({failedCount})
          </Button>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="w-8 px-4 py-3">
                <Checkbox
                  checked={selectedDocs.length === documents.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Audience</th>
              <th className="px-4 py-3 font-medium">Solutions</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="w-8 px-4 py-3">
                  <Checkbox
                    checked={selectedDocs.includes(doc.id)}
                    onCheckedChange={(checked) => handleSelectDocument(doc.id, !!checked)}
                  />
                </td>
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
                <td className="px-4 py-3 text-gray-500">
                  {doc.contentType || 'Unknown'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {doc.metadata.audience.map((audience, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {doc.metadata.solutions.map((solution, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(doc)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingDoc(doc.id)}
                    >
                      Edit
                    </Button>
                    {doc.type === 'file' && (doc.status === 'not_embedded' || doc.status === 'failed') && (
                      <Button
                        size="sm"
                        onClick={() => handleEmbed(doc)}
                      >
                        {doc.status === 'failed' ? (
                          <>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Retry
                          </>
                        ) : (
                          'Embed Now'
                        )}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No documents uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingDoc && (
        <EditingPanel
          document={editableDocuments.find(d => d.id === editingDoc)!}
          onClose={() => setEditingDoc(null)}
          onUpdate={handleUpdateDocument}
        />
      )}
    </div>
  );
}