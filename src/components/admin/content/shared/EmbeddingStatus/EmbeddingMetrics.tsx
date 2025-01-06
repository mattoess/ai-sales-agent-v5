import React from 'react';

interface EmbeddingMetricsProps {
  total: number;
  embedded: number;
  failed: number;
}

export function EmbeddingMetrics({ total, embedded, failed }: EmbeddingMetricsProps) {
  return (
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
  );
}