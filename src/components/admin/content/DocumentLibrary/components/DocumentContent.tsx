// src/components/admin/content/DocumentLibrary/components/DocumentContent.tsx
import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  FolderBreadcrumb,
  FileDropzone,
  CloudStorageButtons,
  DocumentTable
} from '../../shared';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InfoTooltip } from '../../shared';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useDocumentStore } from '../../hooks/useDocumentStore';
import type { Document, ContentType } from '../../types';

const CONTENT_TYPE_GUIDES = {
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
  methodology: {
    title: 'Methodology Documents',
    description: 'Process frameworks and methodological approaches',
    examples: ['Process Guides', 'Best Practices', 'Frameworks'],
    recommendations: 'Detail step-by-step approaches and outcomes'
  }
};

export function DocumentContent() {
  const { user } = useUser();
  const { openGoogleDrivePicker, openDropboxChooser } = useCloudStorage();
  const { addDocument } = useDocumentStore();

  const getContentType = (fileType: string): ContentType => {
    // Enhanced content type detection
    switch (true) {
      case /\.(pdf|doc|docx)$/.test(fileType.toLowerCase()):
        return 'solution';
      case /\.(xls|xlsx|csv)$/.test(fileType.toLowerCase()):
        return 'pricing';
      case /\.(ppt|pptx)$/.test(fileType.toLowerCase()):
        return 'technical';
      default:
        return 'solution';
    }
  };

  const handleFileSelect = useCallback((files: File[]) => {
    if (!user) return;

    files.forEach(file => {
      const clientId = user.publicMetadata.clientId as string;
      const contentType = getContentType(file.type);
     // const guide = CONTENT_TYPE_GUIDES[contentType];
      
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
        contentType: {
          primary: contentType,
          subtype: file.type
        },
        metadata: {
          solutions: [],
          industries: [],
          outcomes: [],
          audience: [],
          vectorNamespace: `${clientId}-${contentType}`
        },
        status: 'not_embedded',
        processingMetadata: {
          priority: 'normal',
          vectorNamespace: `${clientId}-${contentType}`,
          extractionFlags: {
            pricing: contentType === 'pricing',
            metrics: contentType === 'case_study',
            methodology: contentType === 'methodology'
          },
          lastProcessed: new Date()
        }
      };
      
      addDocument(newDocument);
    });
  }, [addDocument, user]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Content Upload Guidelines</h3>
            <InfoTooltip content="Properly categorized and tagged content improves AI discovery accuracy" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="solution" className="w-full">
            <TabsList className="mb-4">
              {Object.entries(CONTENT_TYPE_GUIDES).map(([key, guide]) => (
                <TabsTrigger key={key} value={key}>
                  {guide.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(CONTENT_TYPE_GUIDES).map(([key, guide]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{guide.description}</p>
                  <div className="flex gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Example Documents</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {guide.examples.map((example, i) => (
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

      <FolderBreadcrumb />
      
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <FileDropzone onFileSelect={handleFileSelect} />
        <div className="px-8 pb-8">
          <CloudStorageButtons 
            onGoogleDriveSelect={openGoogleDrivePicker}
            onDropboxSelect={openDropboxChooser}
          />
        </div>
      </div>

      <DocumentTable />
    </div>
  );
}