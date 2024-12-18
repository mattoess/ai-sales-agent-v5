import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';

export function VideosTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>YouTube Videos</CardTitle>
          <Button>Add Video</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="YouTube URL" />
        </div>
      </CardContent>
    </Card>
  );
}