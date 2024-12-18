import React from 'react';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export function TagInput({ value, onChange, onAdd }: TagInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter new tag"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={onAdd}>Add</Button>
    </div>
  );
}