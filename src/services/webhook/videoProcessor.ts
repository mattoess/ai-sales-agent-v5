import { Video } from '../../components/admin/content/types';
import { VideoMetadata, WebhookPayload } from './types';
import { WEBHOOK_CONFIG } from './config';
import { generateRequestId } from './utils';

function extractYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  if (!match) {
    throw new Error('Invalid YouTube URL');
  }
  return match[1];
}

export function createVideoPayload(video: Video, userId: string, companyId: string): WebhookPayload {
  const metadata: VideoMetadata = {
    id: video.id,
    type: 'video',
    name: video.title,
    uploadDate: new Date().toISOString(),
    userId,
    companyId,
    processingPipeline: 'v2',
    priority: 'normal',
    status: 'pending',
    platform: 'youtube',
    videoId: extractYouTubeId(video.url),
    settings: WEBHOOK_CONFIG.defaultSettings
  };

  return {
    metadata,
    content: video.url,
    requestId: generateRequestId(),
    timestamp: new Date().toISOString(),
    version: WEBHOOK_CONFIG.version
  };
}