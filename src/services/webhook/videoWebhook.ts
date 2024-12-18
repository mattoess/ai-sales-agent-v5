import { Video } from '../../components/admin/content/types';
import { User } from '../../types/auth';
import { WebhookPayload } from '../../types/webhook/payload';
import { VideoMetadata } from '../../types/webhook/metadata';
import { extractYouTubeId } from '../../utils/video';

export function createVideoPayload(video: Video, user: User): WebhookPayload {
  const videoId = extractYouTubeId(video.url);

  const metadata: VideoMetadata = {
    id: video.id,
    name: video.title,
    uploadDate: new Date().toISOString(),
    tags: [],
    userId: user.id,
    companyId: user.companyId || '',
    contentType: 'youtubeurl',
    status: 'pending',
    videoUrl: video.url,
    videoId,
    title: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    processingAttempts: 0,
    lastUpdated: new Date().toISOString()
  };

  return {
    metadata,
    videoId,
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: '1.0',
    source: 'web-app',
    settings: {
      priority: 'normal',
      processingOptions: {
        extractText: true,
        generateEmbeddings: true
      }
    }
  };
}