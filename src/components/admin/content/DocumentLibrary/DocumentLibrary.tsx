// src/components/admin/content/DocumentLibrary/DocumentLibrary.tsx
import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderBreadcrumb,
  FileDropzone,
  CloudStorageButtons,
} from '../shared';
import { BulkEditTable } from './components/BulkEditTable';
import { InfoTooltip } from '../shared';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import { ErrorDisplay } from '@/components/ui/error-display';
import { AppError, ErrorType } from '@/services/errors';
import type { Document, ContentType } from '../types';

interface ContentTypeGuide {
  title: string;
  description: string;
  examples: string[];
  recommendations: string;
}

const CONTENT_TYPE_GUIDES: Record<ContentType, ContentTypeGuide> = {
  solution: {
    title: 'Solution Documents',
    description: 'Product descriptions, capabilities, and value propositions (PDF, DOC, DOCX)',
    examples: ['Product Sheets', 'Solution Briefs', 'Feature Guides'],
    recommendations: 'Include clear value propositions and use cases for your solutions and industries you serve'
  },
  case_study: {
    title: 'Case Studies',
    description: 'Customer success stories and implementation examples',
    examples: ['Success Stories', 'ROI Analysis', 'Implementation Examples'],
    recommendations: 'Highlight metrics, outcomes, and industry context'
  },
  technical: {
    title: 'Technical Documentation',
    description: 'Detailed technical specifications and guides',
    examples: ['API Docs', 'Integration Guides', 'Technical Specs'],
    recommendations: 'Include clear requirements and implementation steps'
  },
  pricing: {
    title: 'Pricing Information',
    description: 'Pricing models and commercial details',
    examples: ['Price Lists', 'Rate Cards', 'Licensing Models'],
    recommendations: 'Structure pricing clearly with options and tiers'
  },
  methodology_and_frameworks: {
    title: 'Methodology & Frameworks',
    description: 'Process frameworks and methodological approaches',
    examples: ['Process Guides', 'Best Practices', 'Frameworks'],
    recommendations: 'Detail step-by-step approaches and outcomes'
  }
} as const;

export function DocumentLibrary() {
  const { user } = useUser();
  const { openGoogleDrivePicker, openDropboxChooser } = useCloudStorage();
  const { addDocument, documents, updateDocuments } = useDocumentStore();
  const { embedDocument } = useEmbeddingQueue();
  const [selectedTabType, setSelectedTabType] = useState<ContentType>('solution');
  const [readyToProcess, setReadyToProcess] = useState(false);
  const [processingError, setProcessingError] = useState<AppError | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback((files: File[]) => {
    if (!user) return;

    files.forEach(file => {
      const clientId = user.publicMetadata.clientId as string;
      const contentType = selectedTabType;
      
      const newDocument: Document = {
        id: crypto.randomUUID(),
        name: file.name,
        type: 'file',
        path: '/',
        tags: [],
        size: file.size,
        lastModified: new Date(file.lastModified),
        file,
        clientId,
        userId: user.id,
        contentType,
        metadata: {
          solutions: [],
          audience: [],
          isCompanyWide: false,
          vectorNamespace: clientId
        },
        status: 'not_embedded',
        processingMetadata: {
          extractionFlags: {
            pricing: contentType === 'pricing',
            metrics: contentType === 'case_study',
            methodology: contentType === 'methodology_and_frameworks'
          },
          lastProcessed: new Date()
        }
      };
      
      addDocument(newDocument);
    });

    setReadyToProcess(true);
    setProcessingError(null);
  }, [addDocument, user, selectedTabType]);

  const handleProcessAll = useCallback(async () => {
    if (!documents.length || isProcessing) return;

    setIsProcessing(true);
    setProcessingError(null);

    try {
      const docsToProcess = documents.filter(
        doc => doc.status === 'not_embedded' || doc.status === 'failed'
      );

      if (!docsToProcess.length) {
        setReadyToProcess(false);
        return;
      }

      const updatedDocs = documents.map(doc => 
        docsToProcess.some(d => d.id === doc.id)
          ? { ...doc, status: 'waiting' as const }
          : doc
      );
      updateDocuments(updatedDocs);

      const batchSize = 5;
      for (let i = 0; i < docsToProcess.length; i += batchSize) {
        const batch = docsToProcess.slice(i, i + batchSize);
        await Promise.all(batch.map(doc => embedDocument(doc)));
      }

      setReadyToProcess(false);
    } catch (error) {
      setProcessingError(
        new AppError(
          ErrorType.CONTENT,
          'Failed to process documents',
          { 
            originalError: error,
            details: {
              failedCount: documents.filter(d => d.status === 'failed').length
            }
          }
        )
      );
    } finally {
      setIsProcessing(false);
    }
  }, [documents, updateDocuments, embedDocument, isProcessing]);

  const handleUpdateDocuments = useCallback((updatedDocs: Document[]) => {
    updateDocuments(updatedDocs);
  }, [updateDocuments]);

  return (
    <div className="space-y-6">
      {processingError && (
        <ErrorDisplay
          type={processingError.type}
          message={processingError.message}
          details={processingError.context.details}
          onDismiss={() => setProcessingError(null)}
        />
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Content Upload Guidelines</h3>
              <InfoTooltip content="Properly categorized and tagged content improves AI discovery accuracy" />
            </div>
            {readyToProcess && (
              <Button 
                onClick={handleProcessAll}
                className="bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Process All Documents'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="solution" 
            className="w-full"
            onValueChange={(value) => setSelectedTabType(value as ContentType)}
          >
            <TabsList className="mb-4">
            {Object.entries(CONTENT_TYPE_GUIDES).map(([key, guide]) => (
  <TabsTrigger key={key} value={key as ContentType}>
    {guide.title}
  </TabsTrigger>
))}
            </TabsList>
            
            {Object.entries(CONTENT_TYPE_GUIDES).map(([key, guide]) => (
  <TabsContent key={key} value={key as ContentType}>
    <div className="space-y-3">
      <p className="text-sm text-gray-600">{guide.description}</p>
      <div className="flex gap-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Example Documents</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {guide.examples.map((example: string, i: number) => (
              <li key={i}>{example}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Recommendations</h4>
          <p className="text-sm text-gray-600">{guide.recommendations}</p>
        </div>
      </div>
    </div>
  </TabsContent>
))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <FileDropzone onFileSelect={handleFileSelect} />
        <div className="px-8 pb-8">
          <CloudStorageButtons 
            onGoogleDriveSelect={openGoogleDrivePicker}
            onDropboxSelect={openDropboxChooser}
          />
        </div>
      </div>

      {documents.length > 0 && (
        <BulkEditTable 
          documents={documents}
          onUpdateDocuments={handleUpdateDocuments}
        />
      )}
    </div>
  );
}