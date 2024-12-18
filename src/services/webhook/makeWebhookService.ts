import { MakeWebhookPayload } from './types/makeWebhookTypes';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v';

export class MakeWebhookService {
  static async sendWebhook(payload: MakeWebhookPayload): Promise<Response> {
    const formData = new FormData();
    
    // Add metadata as stringified JSON
    formData.append('metadata', payload.metadata);
    
    // Add file
    if (payload.file) {
      formData.append('file', payload.file);
    }

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.statusText}`);
    }

    return response;
  }
}