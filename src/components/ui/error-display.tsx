import { XCircle, XIcon } from 'lucide-react';
import { ErrorType } from '@/services/errors';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  type: ErrorType;
  message: string;
  details?: Record<string, unknown>;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorDisplay({ 
  type, 
  message, 
  details,
  onDismiss,
  className
}: ErrorDisplayProps) {
  return (
    <div className={cn("rounded-md bg-red-50 p-4", className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{type}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
            {details && (
              <pre className="mt-2 text-xs overflow-auto max-h-40">
                {JSON.stringify(details, null, 2)}
              </pre>
            )}
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="-mx-1.5 -my-1.5 p-1.5 text-red-500 hover:bg-red-100"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}