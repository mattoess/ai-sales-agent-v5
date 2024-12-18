import { WEBHOOK_CONFIG } from './constants';

export async function sendWebhook(file: File, fields: Record<string, string | number | boolean>): Promise<Response> {
  const formData = new FormData();

  // Add each field individually to formData
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  // Add file last
  formData.append('file', file);

  const response = await fetch(WEBHOOK_CONFIG.url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed: ${response.statusText}`);
  }

  return response;
}