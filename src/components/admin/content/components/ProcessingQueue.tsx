import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import { Badge } from '../../../ui/badge';
import { useEmbeddingQueue } from '../hooks/useEmbeddingQueue';
import { useDocumentStore } from '../hooks/useDocumentStore';

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
            <div key={doc.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{doc.name}</span>
                <span className="text-gray-500">
                  {doc.status === 'processing' ? 'Processing...' : 'Waiting...'}
                </span>
              </div>
              <Progress 
                value={doc.status === 'processing' ? 50 : 0}
                className="h-1"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}