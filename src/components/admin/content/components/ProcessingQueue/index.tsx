import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import { useEmbeddingQueue } from '../../hooks/useEmbeddingQueue';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import { QueueItem } from './QueueItem';

export function ProcessingQueue() {
  const { queueLength } = useEmbeddingQueue();
  const { documents } = useDocumentStore();
  
  const processingDocs = documents.filter(doc => 
    doc.status === 'processing' || doc.status === 'waiting'
  );

  if (processingDocs.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Processing Queue</CardTitle>
          <Badge variant="secondary">{queueLength} remaining</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processingDocs.map(doc => (
            <QueueItem key={doc.id} document={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}