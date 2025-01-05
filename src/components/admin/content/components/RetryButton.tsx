// src/components/admin/content/components/RetryButton.tsx
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

interface RetryButtonProps {
  onClick: () => void;
  count?: number;
  isLoading?: boolean;
  tooltipText?: string;
  className?: string;
}

export function RetryButton({ 
  onClick, 
  count, 
  isLoading = false, 
  tooltipText = 'Retry processing',
  className = '' 
}: RetryButtonProps) {
  const button = (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center gap-2 ${className}`}
    >
      <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      Retry {count !== undefined && `(${count})`}
    </Button>
  );

  if (tooltipText) {
    return (
      <Tooltip content={tooltipText}>
        {button}
      </Tooltip>
    );
  }

  return button;
}