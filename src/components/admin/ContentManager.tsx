// src/components/admin/ContentManager.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { DocumentLibrary } from './content/DocumentLibrary';
import { VideoUploader } from './content/shared/VideoUploader';
import { WebPagesTab } from './content/tabs/WebPagesTab';
import { SolutionsTab } from './content/SolutionsTab';
import { Info, FileText, Globe, Video, Briefcase } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Card, CardHeader, CardContent } from '../ui/card';

export function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Solution Content Management</h1>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-blue-700">Content Management Guide</h3>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-blue-600">
            <p>Here's a critical step. To maximize the power of your Ai Sales Agent, thoughtfully upload your company's content to power AI-driven solution discovery:</p><ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Solution Options: Define your company's key solutions and service offerings</li>
              <li>Solution Content: Upload product sheets, case studies, proposals, pricing guides</li>
              <li>Web Resources: Add URLs for your website, product pages, documentation, blog posts</li>
              <li>YouTube Video Content: Add YouTube video content of your products, demos, customer testimonials, webinars</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="solutions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="solutions" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Solutions
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Define and manage your company's solutions and service offerings
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>

          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Solution Documents
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Upload PDFs, Word docs, and other documents containing solution information,
                case studies, and technical documentation
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
          
          <TabsTrigger value="webpages" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Web Resources
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Add web pages, documentation sites, and blog posts to be processed
                for solution discovery
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
          
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Video Content
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Add YouTube videos and webinar recordings to extract insights
                and demonstrations
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solutions">
          <SolutionsTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentLibrary />
        </TabsContent>

        <TabsContent value="webpages">
          <WebPagesTab />
        </TabsContent>

        <TabsContent value="videos">
          <VideoUploader />
        </TabsContent>
      </Tabs>
    </div>
  );
}