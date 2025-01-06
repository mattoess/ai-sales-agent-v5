// src/components/admin/content/components/ProcessingQueue.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { useDocumentStore } from '@/components/admin/content/hooks/useDocumentStore';
import { QueueItem } from './ProcessingQueue/QueueItem';
import { ErrorDisplay } from '@/components/ui/error-display';
import { AppError, ErrorType } from '@/services/errors';
import type { Document } from '@/components/admin/content/types';

export function ProcessingQueue() {
  const { documents } = useDocumentStore();
  const [queueError, setQueueError] = React.useState<AppError | null>(null);
  
  const processingDocs = documents.filter(
    (doc: Document) => (doc.status === 'waiting' || doc.status === 'processing')
  );

  const failedDocs = documents.filter(
    (doc: Document) => doc.status === 'failed'
  );

  const queueLength = processingDocs.length;
  const hasFailures = failedDocs.length > 0;

  React.useEffect(() => {
    if (hasFailures) {
      setQueueError(new AppError(
        ErrorType.CONTENT,
        `${failedDocs.length} document${failedDocs.length === 1 ? '' : 's'} failed to process`,
        {
          details: {
            failedDocuments: failedDocs.map((doc: Document) => ({
              name: doc.name,
              id: doc.id,
              contentType: doc.contentType
            }))
          }
        }
      ));
    } else {
      setQueueError(null);
    }
  }, [failedDocs.length, hasFailures]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Processing Queue</CardTitle>
          <div className="flex items-center gap-2">
            {hasFailures && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {failedDocs.length} Failed
              </Badge>
            )}
            <Badge variant={queueLength > 0 ? "secondary" : "outline"}>
              {queueLength} {queueLength === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {queueError && (
          <ErrorDisplay
            type={queueError.type}
            message={queueError.message}
            details={queueError.context.details}
            className="mb-4"
            onDismiss={() => setQueueError(null)}
          />
        )}
        
        <div className="space-y-4">
          {processingDocs.length > 0 ? (
            processingDocs.map((doc: Document) => (
              <QueueItem key={doc.id} document={doc} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No documents currently processing
            </div>
          )}
          
          {hasFailures && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Failed Documents</h3>
              <div className="space-y-3">
                {failedDocs.map((doc: Document) => (
                  <QueueItem key={doc.id} document={doc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}