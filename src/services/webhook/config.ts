export const WEBHOOK_CONFIG = {
  url: 'https://hook.us2.make.com/p7x46nz2ivxp7f43folpq6tpecod7b8v',
  version: '1.0',
  defaultSettings: {
    embeddingModel: 'text-embedding-3-large',
    maxTokens: 8000,
    chunkSize: 1000,
    overlapSize: 200,
    quality: 'high' as const
  }
};