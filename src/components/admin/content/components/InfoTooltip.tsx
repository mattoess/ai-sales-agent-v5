import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from '../../../ui/tooltip';

interface InfoTooltipProps {
  content: React.ReactNode;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <Tooltip content={content}>
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
    </Tooltip>
  );
}