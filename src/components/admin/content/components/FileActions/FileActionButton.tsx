import React from 'react';
import { Button } from '../../../../ui/button';
import { LucideIcon } from 'lucide-react';

interface FileActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function FileActionButton({ icon: Icon, label, onClick }: FileActionButtonProps) {
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}