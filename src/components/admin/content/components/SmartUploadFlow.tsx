import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import { Document, ContentType } from '../types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDropzone } from '../shared/FileDropzone';
import { MetadataSelectors } from './MetadataSelectors';
import { AppError, ErrorType } from '@/services/errors';

const CONTENT_TYPE_INFO: Record<ContentType, {
  title: string;
  description: string;
  examples: string[];
}> = {
  'solution': {
    title: 'Solution Overview',
    description: 'High-level solution descriptions and capabilities',
    examples: ['Solution Briefs', 'Product Overviews', 'Capability Documents']
  },
  'case_study': {
    title: 'Case Studies',
    description: 'Customer success stories and implementation examples',
    examples: ['Success Stories', 'Implementation Examples', 'ROI Studies']
  },
  'technical': {
    title: 'Technical Documentation',
    description: 'Technical specifications and implementation details',
    examples: ['API Docs', 'Technical Specs', 'Implementation Guides']
  },
  'pricing': {
    title: 'Pricing Information',
    description: 'Pricing guides and commercial information',
    examples: ['Price Lists', 'Rate Cards', 'Pricing Models']
  },
  'methodology': {
    title: 'Methodology',
    description: 'Process documentation and methodological approaches',
    examples: ['Process Docs', 'Best Practices', 'Framework Guides']
  }
} as const;

type MetadataWithoutNamespace = Omit<Document['metadata'], 'vectorNamespace'>;

export function SmartUploadFlow() {
  const { user } = useUser();
  const { embedDocument } = useEmbeddingQueue();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showMetadata, setShowMetadata] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contentType, setContentType] = useState<ContentType>();
  const [error, setError] = useState<AppError | null>(null);

  const [metadata, setMetadata] = useState<Document['metadata']>({
    solutions: [],
    industries: [],
    outcomes: [],
    audience: [],
    vectorNamespace: ''
  });

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setShowMetadata(true);
    setError(null);
  };

  const createDocument = (file: File): Document => {
    if (!user || !contentType) {
      throw new AppError(
        ErrorType.VALIDATION,
        'Missing required user or content type',
        { details: { hasUser: !!user, hasContentType: !!contentType } }
      );
    }

    const namespace = `${user.publicMetadata.clientId}-${contentType}`;
    
    return {
      id: crypto.randomUUID(),
      clientId: user.publicMetadata.clientId as string,
      userId: user.id,
      name: file.name,
      type: 'file',
      path: '/',
      size: file.size,
      lastModified: new Date(file.lastModified),
      file,
      tags: [],
      contentType: { 
        primary: contentType 
      },
      metadata: {
        ...metadata,
        vectorNamespace: namespace
      },
      status: 'not_embedded',
      processingMetadata: {
        priority: 'normal',
        vectorNamespace: namespace,
        extractionFlags: {
          pricing: contentType === 'pricing',
          metrics: contentType === 'case_study',
          methodology: contentType === 'methodology',
        },
        lastProcessed: new Date()
      }
    };
  };

  const handleProcess = async () => {
    if (!user || !contentType || selectedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const documents = selectedFiles.map(createDocument);
      await Promise.all(documents.map(embedDocument));

      setSelectedFiles([]);
      setShowMetadata(false);
      setMetadata({
        solutions: [],
        industries: [],
        outcomes: [],
        audience: [],
        vectorNamespace: ''
      });
    } catch (err) {
      const appError = err instanceof AppError 
        ? err 
        : new AppError(
            ErrorType.CONTENT,
            'Failed to process documents',
            { originalError: err }
          );
      setError(appError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMetadataChange = (newMetadata: MetadataWithoutNamespace) => {
    setMetadata({
      ...newMetadata,
      vectorNamespace: metadata.vectorNamespace
    });
  };

  return (
    <div className="space-y-6">
      <FileDropzone 
        onFileSelect={handleFileSelect}
        onError={setError}
        className="max-w-2xl mx-auto"
      />

      {showMetadata && selectedFiles.length > 0 && (
        <div className="space-y-6">
          <Select
            value={contentType}
            onValueChange={(value: ContentType) => setContentType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content type..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CONTENT_TYPE_INFO).map(([key, info]) => (
                <SelectItem key={key} value={key as ContentType}>
                  <div className="space-y-1">
                    <div className="font-medium">{info.title}</div>
                    <div className="text-xs text-gray-500">{info.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <MetadataSelectors
            value={metadata}
            onChange={handleMetadataChange}
          />

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
                  {error.context.details && (
                    <div className="mt-2 text-sm text-red-700">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(error.context.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowMetadata(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProcess}
              disabled={!contentType || isProcessing}
            >
              {isProcessing ? 'Processing...' : `Process ${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}