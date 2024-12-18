import { WebhookPayload } from './types';
import { WEBHOOK_CONFIG } from './config';

export async function sendWebhook(payload: WebhookPayload): Promise<Response> {
  const formData = new FormData();

  // Add metadata
  formData.append('metadata', JSON.stringify({
    ...payload.metadata,
    version: WEBHOOK_CONFIG.version,
    timestamp: new Date().toISOString()
  }));

  // Add file if present
  if (payload.file) {
    formData.append('file', payload.file);
  }

  // Add content if present
  if (payload.content) {
    formData.append('content', payload.content);
  }

  const response = await fetch(WEBHOOK_CONFIG.url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed: ${response.statusText}`);
  }

  return response;
}

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}