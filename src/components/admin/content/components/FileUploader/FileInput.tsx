import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface FileInputProps {
  onFileSelect: (files: FileList) => void;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
}

export function FileInput({ 
  onFileSelect, 
  disabled = false,
  accept = '.pdf,.doc,.docx',
  multiple = true
}: FileInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled && e.dataTransfer.files) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div 
      className={`
        relative rounded-lg border-2 border-dashed
        transition-all duration-200 ease-in-out
        ${disabled 
          ? 'bg-gray-50 border-gray-200' 
          : 'border-gray-300 hover:border-primary/50 hover:bg-primary/5'
        }
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Input
        type="file"
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        id="file-input"
      />
      
      <label 
        htmlFor="file-input"
        className="flex flex-col items-center justify-center p-6 cursor-pointer"
      >
        {disabled ? (
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        ) : (
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
        )}
        
        <div className="space-y-1 text-center">
          <p className="text-sm text-gray-600">
            {disabled ? 'Uploading...' : (
              <>
                <Button 
                  variant="link" 
                  className="px-1 py-0 h-auto font-semibold"
                  disabled={disabled}
                >
                  Choose files
                </Button>
                {' '}or drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">
            PDF, DOC, DOCX up to 50MB
          </p>
        </div>
      </label>
    </div>
  );
}