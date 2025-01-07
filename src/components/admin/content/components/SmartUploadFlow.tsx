// src/components/admin/content/components/SmartUploadFlow.tsx
import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useEmbeddingQueue } from '@/hooks/useEmbeddingQueue';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileDropzone } from '../shared/FileDropzone';
import { MetadataSelectors } from './MetadataSelectors';
import type { Document, AudienceType, ContentType } from '../types';
import { AppError, ErrorType } from '@/services/errors';

interface MetadataState {
  solutions: string[];
  audience: AudienceType[];
  isCompanyWide: boolean;
  vectorNamespace: string;
}

const CONTENT_TYPE_GUIDES: Record<ContentType, {
  title: string;
  description: string;
  examples: string[];
  recommendations: string;
}> = {
  solution: {
    title: 'Solution Documents',
    description: 'Product descriptions and capabilities',
    examples: ['Product Sheets', 'Solution Briefs'],
    recommendations: 'Include clear value propositions'
  },
  case_study: {
    title: 'Case Studies',
    description: 'Customer success stories',
    examples: ['Success Stories', 'ROI Analysis'],
    recommendations: 'Highlight metrics and outcomes'
  },
  technical: {
    title: 'Technical Documentation',
    description: 'Technical specifications',
    examples: ['API Docs', 'Integration Guides'],
    recommendations: 'Include clear requirements'
  },
  pricing: {
    title: 'Pricing Information',
    description: 'Pricing models',
    examples: ['Price Lists', 'Rate Cards'],
    recommendations: 'Structure pricing clearly'
  },
  methodology_and_frameworks: {
    title: 'Methodology & Frameworks',
    description: 'Process documentation',
    examples: ['Process Guides', 'Frameworks'],
    recommendations: 'Detail step-by-step approaches'
  }
};

export function SmartUploadFlow() {
  const { user } = useUser();
  const { embedDocument } = useEmbeddingQueue();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showMetadata, setShowMetadata] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('solution');
  const [error, setError] = useState<AppError | null>(null);

  const [metadata, setMetadata] = useState<MetadataState>({
    solutions: [],
    audience: [],
    isCompanyWide: false,
    vectorNamespace: ''
  });

  const handleFileSelect = useCallback((files: File[]) => {
    setSelectedFiles(files);
    setShowMetadata(true);
    setError(null);
  }, []);

  const createDocument = useCallback((file: File): Document => {
    if (!user || !contentType) {
      throw new AppError(
        ErrorType.VALIDATION,
        'Missing required user or content type',
        { details: { hasUser: !!user, hasContentType: !!contentType } }
      );
    }

    const clientId = user.publicMetadata.clientId as string;
    
    return {
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
        ...metadata,
        vectorNamespace: metadata.vectorNamespace || clientId
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
  }, [user, contentType, metadata]);

  const handleProcess = async () => {
    if (!user || !contentType || selectedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      await Promise.all(selectedFiles.map(file => {
        const document = createDocument(file);
        return embedDocument(document);
      }));

      setSelectedFiles([]);
      setShowMetadata(false);
      setMetadata({
        solutions: [],
        audience: [],
        isCompanyWide: false,
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

  return (
    <div className="space-y-6">
      <FileDropzone onFileSelect={handleFileSelect} />

      {showMetadata && selectedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Configure Document Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <MetadataSelectors
              value={{
                solutions: metadata.solutions,
                audience: metadata.audience,
                isCompanyWide: metadata.isCompanyWide
              }}
              onChange={(newValue) => {
                setMetadata(prev => ({
                  ...prev,
                  ...newValue,
                  vectorNamespace: prev.vectorNamespace
                }));
              }}
            />
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFiles([]);
                  setShowMetadata(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProcess}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? 'Processing...' : 'Process Documents'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}