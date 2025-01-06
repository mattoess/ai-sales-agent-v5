import { type ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import { QueueItem } from './QueueItem';
import type { Document } from '../../types';

export function ProcessingQueue(): ReactElement {
  const { documents } = useDocumentStore();
  
  const processingDocs = documents.filter(
    (doc: Document): boolean => ['waiting', 'processing'].includes(doc.status)
  );

  // Explicitly type the card components
  const ProcessingQueueCard: ReactElement = (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Processing Queue</CardTitle>
          <Badge 
            variant={processingDocs.length > 0 ? "secondary" : "outline"}
          >
            {processingDocs.length} {processingDocs.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processingDocs.length > 0 ? (
            processingDocs.map((doc: Document): ReactElement => (
              <QueueItem key={doc.id} document={doc} />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No documents currently processing
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return ProcessingQueueCard;
}