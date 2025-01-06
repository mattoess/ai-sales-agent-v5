import React from 'react';
import { FileText, Upload, Settings } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { SmartUploadFlow } from './content/components/SmartUploadFlow';
import { ProcessingQueue } from './content/components/ProcessingQueue';
import { DocumentTable } from './content/DocumentTable';

export function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-500">Upload and manage your company's content for AI-powered discovery</p>
        </div>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="web">Web Resources</TabsTrigger>
          <TabsTrigger value="video">Video Content</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <SmartUploadFlow />
              </CardContent>
            </Card>
            
            <ProcessingQueue />
            
            <DocumentTable />
          </div>
        </TabsContent>

        <TabsContent value="web">
          <div className="space-y-6">
            {/* Similar structure for web resources */}
          </div>
        </TabsContent>

        <TabsContent value="video">
          <div className="space-y-6">
            {/* Similar structure for video content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}