import { FileInput } from './FileInput';
import { FileList } from './FileList';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useDocumentStore } from '../../hooks/useDocumentStore';

export function FileUploader() {
  const { uploadFiles, isUploading } = useFileUpload();
  const { documents, currentPath } = useDocumentStore();

  const handleFileSelect = async (files: FileList) => {
    await uploadFiles(files, currentPath);
  };

  return (
    <div className="space-y-4">
      <FileInput 
        onFileSelect={handleFileSelect}
        disabled={isUploading}
        accept=".pdf,.doc,.docx"
        multiple
      />
      <FileList 
        files={documents}
        isLoading={isUploading}
      />
    </div>
  );
}