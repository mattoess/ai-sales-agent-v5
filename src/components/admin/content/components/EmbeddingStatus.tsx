import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { Progress } from '../../../ui/progress';

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
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Total Files</div>
              <div className="text-2xl font-semibold">{total}</div>
            </div>
            <div>
              <div className="text-gray-500">Embedded</div>
              <div className="text-2xl font-semibold text-green-600">{embedded}</div>
            </div>
            <div>
              <div className="text-gray-500">Failed</div>
              <div className="text-2xl font-semibold text-red-600">{failed}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}