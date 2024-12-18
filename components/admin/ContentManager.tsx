import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

export function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-500">Manage your website content and resources</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create New Content
        </Button>
      </div>

      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="grid gap-6">
            <div className="flex items-center space-x-4">
              <Input placeholder="Search pages..." className="max-w-sm" />
              <Button variant="outline">Filter</Button>
            </div>

            <div className="grid gap-4">
              {['Home', 'About', 'Services', 'Contact'].map((page) => (
                <Card key={page}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{page}</CardTitle>
                        <CardDescription>Last updated 2 days ago</CardDescription>
                      </div>
                      <Badge>Published</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="outline" size="sm">Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="text-center py-12 text-gray-500">
            Blog management coming soon
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="text-center py-12 text-gray-500">
            Resource management coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}