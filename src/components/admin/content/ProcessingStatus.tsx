import React from 'react';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Upload, Check } from 'lucide-react';
import { Tooltip } from '../../ui/tooltip';

export function ProcessingStatus() {
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'complete'>('idle');
  const [progress, setProgress] = React.useState(0);

  const handleProcessAll = () => {
    setStatus('processing');
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('complete');
      }
    }, 500);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {status === 'processing' && (
            <Badge variant="outline" className="bg-yellow-50">
              Processing Content...
            </Badge>
          )}
          {status === 'complete' && (
            <Badge variant="outline" className="bg-green-50">
              <Check className="w-3 h-3 mr-1" />
              All Content Embedded
            </Badge>
          )}
        </div>
        <Tooltip content="Process all uploaded content to embed it into the AI discovery system">
          <Button
            onClick={handleProcessAll}
            disabled={status === 'processing'}
          >
            <Upload className="w-4 h-4 mr-2" />
            Process All Content
          </Button>
        </Tooltip>
      </div>
      {status === 'processing' && (
        <Progress value={progress} className="w-full" />
      )}
    </div>
  );
}