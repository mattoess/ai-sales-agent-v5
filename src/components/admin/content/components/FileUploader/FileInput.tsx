import React from 'react';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';

interface FileInputProps {
  onFileSelect: (files: FileList) => void;
}

export function FileInput({ onFileSelect }: FileInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div className="relative">
      <Input
        type="file"
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
        multiple
        className="hidden"
        id="file-input"
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById('file-input')?.click()}
        className="w-full"
      >
        Choose Files
      </Button>
    </div>
  );
}