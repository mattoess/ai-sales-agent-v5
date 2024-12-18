import { WebhookPayload } from '../types/webhook';
import { Document, Video } from '../components/admin/content/types';
import { User } from '../types/auth';

const EMBED_WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

export class EmbeddingService {
  static async embedContent(payload: WebhookPayload): Promise<void> {
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

    const response = await fetch(EMBED_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to embed content: ${response.statusText}`);
    }
  }

  static async embedDocument(document: Document, user: User): Promise<void> {
    if (!document.file) {
      throw new Error('No file provided');
    }

    const payload: WebhookPayload = {
      metadata: {
        id: document.id,
        name: document.name,
        uploadDate: new Date().toISOString(),
        tags: document.tags,
        userId: user.id,
        companyId: user.companyId || '',
        contentType: document.name.split('.').pop()?.toLowerCase() as 'pdf' | 'doc' | 'docx',
        fileSize: document.size || 0,
        mimeType: document.file.type,
        lastModified: document.lastModified?.toISOString() || new Date().toISOString(),
      },
      file: document.file,
    };

    await this.embedContent(payload);
  }

  static async embedWebResource(url: string, metadata: any, user: User): Promise<void> {
    const payload: WebhookPayload = {
      metadata: {
        id: metadata.id,
        name: metadata.title || url,
        uploadDate: new Date().toISOString(),
        tags: metadata.tags || [],
        userId: user.id,
        companyId: user.companyId || '',
        contentType: 'weburl',
        url,
        title: metadata.title,
        description: metadata.description,
        lastCrawled: new Date().toISOString(),
      },
      content: metadata.content,
    };

    await this.embedContent(payload);
  }

  static async embedVideo(video: Video, user: User): Promise<void> {
    const payload: WebhookPayload = {
      metadata: {
        id: video.id,
        name: video.title,
        uploadDate: new Date().toISOString(),
        tags: [],
        userId: user.id,
        companyId: user.companyId || '',
        contentType: 'youtubeurl',
        videoUrl: video.url,
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnail,
      },
      videoId: this.extractYouTubeId(video.url),
    };

    await this.embedContent(payload);
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