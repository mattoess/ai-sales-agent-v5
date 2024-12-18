import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Globe, Info } from 'lucide-react';
import { Tooltip } from '../../../ui/tooltip';

export function WebPagesTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle>Web Resources</CardTitle>
              <Tooltip content="Add links to web pages containing solution information, documentation, or resources">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <p className="text-sm text-gray-500">
              Add web pages to be processed by the AI
            </p>
          </div>
          <Button>
            <Globe className="w-4 h-4 mr-2" />
            Add URL
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="https://" />
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            No web pages added yet
          </div>
        </div>
      </CardContent>
    </Card>
  );
}