// src/components/ui/error-display.tsx
import * as React from "react"
import { X } from "lucide-react"
import { ErrorType } from "@/services/errors"

interface ErrorDisplayProps {
  type: ErrorType;
  message: string;
  details?: {
    files?: Array<{
      name: string;
      errors: string[];
    }>;
    [key: string]: any;
  };
  onDismiss?: () => void;
  className?: string;  // Add this line
}

export function ErrorDisplay({ 
  type, 
  message, 
  details, 
  onDismiss 
}: ErrorDisplayProps) {
  const getTypeStyle = () => {
    switch (type) {
      case ErrorType.VALIDATION:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case ErrorType.CONTENT:
        return 'bg-red-50 text-red-700 border-red-200';
      case ErrorType.NETWORK:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case ErrorType.API:
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case ErrorType.SYSTEM:
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className={`rounded-md p-4 border ${getTypeStyle()}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium">{message}</h3>
          {details?.files && (
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                {details.files.map((file, index) => (
                  <li key={index}>
                    <span className="font-medium">{file.name}</span>
                    <ul className="list-none pl-4">
                      {file.errors.map((error, errorIndex) => (
                        <li key={errorIndex} className="text-xs">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="ml-3 inline-flex text-gray-400 hover:text-gray-500"
            onClick={onDismiss}
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    </div>
  );
}