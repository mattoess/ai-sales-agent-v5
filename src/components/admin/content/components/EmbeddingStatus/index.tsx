import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import { Progress } from '../../../../ui/progress';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import { EmbeddingMetrics } from './EmbeddingMetrics';

export function EmbeddingStatus() {
  const { documents } = useDocumentStore();
  
  const total = documents.length;
  const embedded = documents.filter(doc => doc.status === 'embedded').length;
  const failed = documents.filter(doc => doc.status === 'failed').length;
  const progress = total > 0 ? (embedded / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Embedding Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <EmbeddingMetrics 
            total={total}
            embedded={embedded}
            failed={failed}
          />
        </div>
      </CardContent>
    </Card>
  );
}