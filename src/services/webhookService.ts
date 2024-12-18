import { WebhookPayload } from '../types/webhook';
import { Document, Video } from '../components/admin/content/types';
import { User } from '../types/auth';

const WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

export class WebhookService {
  static async sendWebhook(payload: WebhookPayload): Promise<Response> {
    const formData = new FormData();
    
    // Add metadata
    formData.append('metadata', JSON.stringify(payload.metadata));
    
    // Add file if present
    if (payload.file) {
      formData.append('file', payload.file);
    }
    
    // Add content or videoId if present
    if (payload.content) {
      formData.append('content', payload.content);
    }
    if (payload.videoId) {
      formData.append('videoId', payload.videoId);
    }

    // Add request metadata
    formData.append('requestId', payload.requestId);
    formData.append('timestamp', payload.timestamp);
    formData.append('version', payload.version);
    formData.append('source', payload.source);

    // Add processing settings if present
    if (payload.settings) {
      formData.append('settings', JSON.stringify(payload.settings));
    }

    return fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData
    });
  }

  static async createDocumentPayload(document: Document, user: User): Promise<WebhookPayload> {
    const fileExtension = document.name.split('.').pop()?.toLowerCase();
    const contentType = fileExtension as 'pdf' | 'doc' | 'docx';

    return {
      metadata: {
        id: document.id,
        name: document.name,
        uploadDate: new Date().toISOString(),
        tags: document.tags,
        userId: user.id,
        companyId: user.companyId || '',
        contentType,
        status: 'pending',
        fileSize: document.size || 0,
        mimeType: document.file?.type || '',
        lastModified: document.lastModified?.toISOString() || '',
        processingAttempts: 0,
        lastUpdated: new Date().toISOString()
      },
      file: document.file,
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      version: '1.0',
      source: 'web-app',
      settings: {
        priority: 'normal',
        processingOptions: {
          extractText: true,
          generateEmbeddings: true,
          extractMetadata: true
        }
      }
    };
  }

  static async createVideoPayload(video: Video, user: User): Promise<WebhookPayload> {
    return {
      metadata: {
        id: video.id,
        name: video.title,
        uploadDate: new Date().toISOString(),
        tags: [],
        userId: user.id,
        companyId: user.companyId || '',
        contentType: 'youtubeurl',
        status: 'pending',
        videoUrl: video.url,
        videoId: this.extractYouTubeId(video.url),
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail,
        processingAttempts: 0,
        lastUpdated: new Date().toISOString()
      },
      videoId: this.extractYouTubeId(video.url),
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

  private static extractYouTubeId(url: string): string {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (!match) {
      throw new Error('Invalid YouTube URL');
    }
    return match[1];
  }
}