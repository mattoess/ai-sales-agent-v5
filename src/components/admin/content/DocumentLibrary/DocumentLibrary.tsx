import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmartUploadZone } from './components/SmartUploadZone';
import { DocumentGrid } from './components/DocumentGrid';
import { CloudStorageIntegration } from './components/CloudStorageIntegration';
import { ProcessingQueue } from './components/ProcessingQueue';
import { DocumentToolbar } from './components/DocumentToolbar';
import { DocumentMetadataDialog } from './components/DocumentMetadataDialog';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { useClientStore } from '@/store/clientStore';
import { ErrorDisplay } from '@/components/ui/error-display';
import { ContentType, DocumentFilters, DocumentSort } from '@/types/DocumentLibrary';
import { CONTENT_TYPE_INFO } from './constants';
import { ErrorType } from '@/services/errors';
import { toast } from '@/components/ui/use-toast';

export function DocumentLibrary() {
  const clientStore = useClientStore();
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('solution');
  const [filters, setFilters] = useState<DocumentFilters>({});
  const [sort, setSort] = useState<DocumentSort>({
    field: 'lastModified',
    direction: 'desc'
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);

  const {
    documents,
    selectedDocumentIds,
    uploadProgress,
    isLoading,
    error,
    loadDocuments,
    processBatchDocuments,
    deleteDocuments,
    toggleDocumentSelection,
    clearSelection,
  } = useDocumentStore();

  useEffect(() => {
    if (clientStore.client.data.clientId) {
      loadDocuments(
        clientStore.client.data.clientId
      );
    }
  }, [clientStore.client.data.clientId, loadDocuments, filters, sort]);

  // Single handleFileSelect function with logging
  const handleFileSelect = async (files: File[]) => {
    if (!clientStore.client.data.clientId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Client ID not found"
      });
      return;
    }

    console.log('Selected files:', files.map(f => f.name));
    setSelectedFiles(files);
    setShowMetadataDialog(true);
  };

  const handleMetadataSubmit = async (metadata: {
    description?: string;
    solutions: string;    // comma-separated string
    audience: string;     // comma-separated string
    tags: string;        // comma-separated string
    contentType: ContentType;
  }) => {
    if (!clientStore.client.data.clientId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Client ID not found"
      });
      return;
    }

    try {
      console.log('Processing documents with metadata:', {
        files: selectedFiles.map(f => f.name),
        metadata
      });

      const documentsToProcess = selectedFiles.map(file => ({
        file,
        metadata: {
          description: metadata.description,
          solutions: metadata.solutions,
          audience: metadata.audience,
          tags: metadata.tags,
          contentType: metadata.contentType
        }
      }));

      await processBatchDocuments(documentsToProcess);
      
      toast({
        title: "Success",
        description: `Successfully processed ${selectedFiles.length} document${selectedFiles.length > 1 ? 's' : ''}`
      });
    } catch (error) {
      console.error('Failed to process documents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process documents"
      });
    }

    setSelectedFiles([]);
    setShowMetadataDialog(false);
  };

  const handleBulkDelete = async () => {
    if (selectedDocumentIds.size === 0) return;
    if (!confirm('Are you sure you want to delete the selected documents?')) return;

    try {
      await deleteDocuments([...selectedDocumentIds]);
      toast({
        title: "Success",
        description: "Documents deleted successfully"
      });
    } catch (error) {
      console.error('Failed to delete documents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete documents"
      });
    }
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({
      ...prev,
      search: query || undefined
    }));
  };

  const handleSort = (newSort: DocumentSort) => {
    setSort(newSort);
  };

  const handleContentTypeChange = (value: string) => {
    const contentType = value as ContentType;
    setSelectedContentType(contentType);
    setFilters(prev => ({
      ...prev,
      contentTypes: [contentType]
    }));
  };

  const handleSolutionFilter = (solutions: string) => {
    setFilters(prev => ({
      ...prev,
      solutions: solutions || undefined
    }));
  };

  return (
    <div className="space-y-6">
      {error && (
        <ErrorDisplay
          type={ErrorType.CONTENT}
          message={error}
          onDismiss={() => useDocumentStore.setState({ error: null })}
        />
      )}

      <Card>
        <Tabs
          value={selectedContentType}
          onValueChange={handleContentTypeChange}
        >
          <TabsList>
            {Object.entries(CONTENT_TYPE_INFO).map(([type, info]) => (
              <TabsTrigger key={type} value={type}>
                {info.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(CONTENT_TYPE_INFO).map(([type, info]) => (
            <TabsContent key={type} value={type}>
              <div className="p-4 space-y-4">
                <SmartUploadZone
                  contentType={type as ContentType}
                  onFileSelect={handleFileSelect}
                />

                <CloudStorageIntegration
                  contentType={type as ContentType}
                  onFileSelect={handleFileSelect}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <DocumentMetadataDialog
        isOpen={showMetadataDialog}
        onClose={() => {
          setShowMetadataDialog(false);
          setSelectedFiles([]);
        }}
        onSubmit={handleMetadataSubmit}
        files={selectedFiles}
      />

      {documents.length > 0 && (
        <div className="space-y-4">
          <DocumentToolbar
            selectedCount={selectedDocumentIds.size}
            onDelete={handleBulkDelete}
            onClearSelection={clearSelection}
            onSearch={handleSearch}
            onSort={handleSort}
            onSolutionFilter={handleSolutionFilter}
            currentSort={sort}
            currentSolutions={filters.solutions}
          />

          <DocumentGrid
            documents={documents}
            selectedIds={selectedDocumentIds}
            onToggleSelect={toggleDocumentSelection}
            isLoading={isLoading}
            contentType={selectedContentType}
          />
        </div>
      )}

      {uploadProgress.size > 0 && (
        <ProcessingQueue
          uploadProgress={uploadProgress}
          onDismissError={(fileId) => useDocumentStore.getState().removeUploadProgress(fileId)}
        />
      )}
    </div>
  );
}