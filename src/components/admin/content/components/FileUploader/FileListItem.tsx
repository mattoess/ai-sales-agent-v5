// src/components/admin/content/components/FileUploader/FileListItem.tsx
import { FileText, File, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import type { Document, BulkEditableDocument } from '../../types';

interface FileListItemProps {
  file: Document | BulkEditableDocument;
  onRemove?: () => void;
  disabled?: boolean;
  onSelect?: (checked: boolean) => void;
  isSelected?: boolean;
  onClick?: () => void;
}

const FILE_ICONS: Record<string, JSX.Element> = {
  pdf: <FileText className="h-5 w-5 text-red-400" />,
  doc: <FileText className="h-5 w-5 text-blue-400" />,
  docx: <FileText className="h-5 w-5 text-blue-400" />,
  default: <File className="h-5 w-5 text-gray-400" />
};

export function FileListItem({ 
  file, 
  onRemove,
  disabled = false,
  onSelect,
  isSelected,
  onClick 
}: FileListItemProps) {
  const formatFileSize = (bytes: number = 0) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || 'default';
    return FILE_ICONS[extension] || FILE_ICONS.default;
  };

  const getStatusBadge = () => {
    switch (file.status) {
      case 'embedded':
        return <Badge className="bg-green-100 text-green-800">Embedded</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 animate-pulse">Processing</Badge>;
      case 'waiting':
        return <Badge className="bg-yellow-100 text-yellow-800">Waiting</Badge>;
      case 'failed':
        return (
          <div className="flex items-center gap-1">
            <Badge className="bg-red-100 text-red-800">Failed</Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Processing failed. Try again.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click event when clicking checkbox
    if ((e.target as HTMLElement).closest('.checkbox-container')) {
      return;
    }
    onClick?.();
  };

  return (
    <div 
      className={`
        relative group flex items-center justify-between p-3 
        bg-white border rounded-lg shadow-sm
        transition-all duration-200
        ${disabled ? 'opacity-70' : 'hover:border-gray-300 hover:shadow'}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={handleClick}
    >
      {onSelect && (
        <div className="checkbox-container absolute left-2 top-1/2 transform -translate-y-1/2">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(checked as boolean)}
          />
        </div>
      )}

      <div className={`flex items-center space-x-3 min-w-0 ${onSelect ? 'ml-8' : ''}`}>
        {getFileIcon(file.name)}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </p>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-500">
              {formatFileSize(file.size)}
            </p>
            <span className="text-gray-300">•</span>
            <p className="text-xs text-gray-500">
              Last modified: {new Date(file.lastModified || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge 
          variant={disabled ? "secondary" : "outline"}
          className={`
            text-xs transition-colors duration-200
            ${disabled ? 'bg-gray-100' : 'hover:bg-gray-100'}
          `}
        >
          {file.contentType}
        </Badge>

        {onRemove && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`
                  h-8 w-8 p-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  ${disabled ? 'cursor-not-allowed' : 'hover:bg-red-50 hover:text-red-600'}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                disabled={disabled}
              >
                <span className="sr-only">Remove file</span>
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove file</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}