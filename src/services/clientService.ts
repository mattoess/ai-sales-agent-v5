// src/services/clientService.ts
import { MAKE_CONFIG } from './make/config';
import type { ClientResponse } from '../types/client';
import type { OnboardingData } from '../types/onboarding';
import { saveCompanySetup } from './clientService';

export async function saveCompanySetup(data: OnboardingData, logoFile: File | null): Promise<ClientResponse> {
  try {
    const formData = new FormData();
    
    // Add all the text data
    formData.append('action', 'saveCompanySetup');
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('clerkUserId', data.clerkUserId || '');
    formData.append('companyName', data.companyName);
    formData.append('website', data.website || '');
    formData.append('industry', data.industry || '');
    formData.append('timestamp', new Date().toISOString());
    
    // Add the logo file if it exists
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.status === 201 || response.status === 200) {
      return {
        status: 'success',
        ...result
      };
    }

    return {
      status: 'error',
      message: result.message || 'Failed to save company setup',
      ...result
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
    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        action: 'getClient',
        clerkUserId 
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        status: 'error',
        message: `Failed to fetch client data: ${result.message || response.statusText}`,
        clerkUserId,
        requestedClerkId: clerkUserId
      };
    }

    return {
      status: 'success',
      ...result
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch client data',
      clerkUserId,
      requestedClerkId: clerkUserId
    };
  }
}