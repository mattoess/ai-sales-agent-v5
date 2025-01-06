import { Progress } from '@/components/ui/progress';
import { File, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Document } from '../../types';
import { ErrorDisplay } from '@/components/ui/error-display';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QueueItemProps {
  document: Document;
}

interface StatusDetails {
  icon: JSX.Element;
  label: string;
  progress: number;
  color?: string;
}

export function QueueItem({ document }: QueueItemProps) {
  const { getError } = useEmbeddingQueue();
  const error = getError(document.id);

  const getStatusDetails = (): StatusDetails => {
    switch (document.status) {
      case 'waiting':
        return {
          icon: <Clock className="w-4 h-4 text-gray-400" />,
          label: 'Waiting to process...',
          progress: 0,
          color: 'bg-gray-200'
        };
      case 'processing':
        return {
          icon: <File className="w-4 h-4 text-blue-500 animate-pulse" />,
          label: 'Processing content...',
          progress: 50,
          color: 'bg-blue-500'
        };
      case 'embedded':
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          label: 'Processing complete',
          progress: 100,
          color: 'bg-green-500'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          label: 'Processing failed',
          progress: 100,
          color: 'bg-red-500'
        };
      default:
        return {
          icon: <File className="w-4 h-4 text-gray-400" />,
          label: 'Not processed',
          progress: 0,
          color: 'bg-gray-200'
        };
    }
  };

  const { icon, label, progress, color } = getStatusDetails();

  const formatSolutionsCount = (count: number) => {
    if (count === 0) return 'No solutions tagged';
    if (count === 1) return '1 solution tagged';
    return `${count} solutions tagged`;
  };

  return (
    <div className="space-y-2 p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{icon}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm font-medium text-gray-700 truncate">
            {document.name}
          </span>
        </div>
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
          {document.contentType?.primary || 'Document'}
        </span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-1" 
        indicatorClassName={color}
      />
      
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-400">
          {formatSolutionsCount(document.metadata?.solutions?.length || 0)}
        </span>
      </div>

      {error && (
        <div className="mt-2">
          <ErrorDisplay
            type={error.type}
            message={error.message}
            details={error.context.details}
          />
        </div>
      )}
    </div>
  );
}