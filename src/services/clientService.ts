// src/services/clientService.ts
import { MAKE_CONFIG } from './make/config';
import type { ClientResponse } from '../types/client';
import type { OnboardingData } from '../types/onboarding';

export async function saveCompanySetup(data: OnboardingData): Promise<ClientResponse> {
  try {
    const payload = {
      action: 'saveCompanySetup',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      clerkUserId: data.clerkUserId || '',
      companyName: data.companyName,
      website: data.website || '',
      industry: data.industry || '',
      logo: data.logo,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 'success' && result.data) {
      return result as ClientResponse; // Response should already match our type
    }

    return {
      status: 'error',
      message: result.message || 'Failed to save company setup'
    };

  } catch (error) {
    console.error('Company setup error:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getClientByClerkId(clerkUserId: string): Promise<ClientResponse> {
  try {
    console.log('🔍 Fetching client data for clerkUserId:', clerkUserId);
    console.log('🌐 Using webhook URL:', MAKE_CONFIG.urls.client);
    
    const payload = { 
      action: 'getClient',
      clerkUserId 
    };
    
    console.log('📦 Request payload:', payload);

    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('📄 Response data:', result);

    if (result.status === 'success' && result.data) {
      return result as ClientResponse;
    }

    return {
      status: 'error',
      message: result.message || 'Failed to fetch client data'
    };
  } catch (error) {
    console.error('❌ Error fetching client:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch client data'
    };
  }
}