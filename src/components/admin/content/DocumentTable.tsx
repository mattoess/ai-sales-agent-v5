import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Folder, RotateCcw, AlertCircle } from 'lucide-react';
import { useDocumentStore } from './hooks/useDocumentStore';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import type { Document } from './types';
import { ErrorDisplay } from '@/components/ui/error-display';
import { AppError, ErrorType } from '@/services/errors';

export function DocumentTable() {
  const { documents } = useDocumentStore();
  const { embedDocument, getError } = useEmbeddingQueue();
  const [processingError, setProcessingError] = useState<AppError | null>(null);

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
              <Tooltip delayDuration={50}>
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

      {failedCount > 0 && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetryAll}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Failed ({failedCount})
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Solutions</th>
              <th className="px-4 py-3 font-medium">Industries</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
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
                  {doc.contentType?.primary || 'Unknown'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {doc.metadata?.solutions.map((solution, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {doc.metadata?.industries.map((industry, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(doc)}
                </td>
                <td className="px-4 py-3">
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
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No documents uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}