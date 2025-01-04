// src/utils/webhookTester.ts
import { MAKE_CONFIG } from '../services/make/config';

export async function testCompanySetupWebhook() {
  const testPayload = {
    action: 'saveCompanySetup',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    clerkUserId: 'clerk_test_123',
    companyName: 'Test Company',
    website: 'https://test.com',
    industry: 'SaaS',
    logo: {
      name: 'test-logo.png',
      path: '/company-logos/test/test-logo.png',
      type: 'image/png',
      uploadedAt: new Date().toISOString()
    }
  };

  try {
    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();
    console.log('Webhook Test Result:', result);
    return result;
  } catch (error) {
    console.error('Webhook Test Error:', error);
    throw error;
  }
}