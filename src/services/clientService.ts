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
      logo: data.logo, // Already in LogoInfo format
      timestamp: new Date().toISOString()
    };

    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.status === 201 || response.status === 200) {
      return {
        status: 'success',
        data: {
          userID: result.data.userID,
          clientId: result.data.clientId,
          company: {
            name: result.data.company.name,
            status: result.data.company.status,
            logo: result.data.company.logo,
            industry: result.data.company.industry,
            website: result.data.company.website
          },
          user: {
            email: result.data.user.email,
            role: result.data.user.role,
            status: result.data.user.status,
            firstName: result.data.user.firstName,
            lastName: result.data.user.lastName
          }
        }
      };
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
    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        message: `Failed to fetch client data: ${result.message || response.statusText}`
      };
    }

    if (result.status === 'success' && result.data) {
      return {
        status: 'success',
        data: {
          userID: result.data.userID,
          clientId: result.data.clientId,
          company: {
            name: result.data.company.name,
            status: result.data.company.status,
            logo: result.data.company.logo
          },
          user: {
            email: result.data.user.email,
            role: result.data.user.role,
            status: result.data.user.status,
            firstName: result.data.user.firstName,
            lastName: result.data.user.lastName
          }
        }
      };
    }

    return {
      status: 'error',
      message: 'Failed to fetch client data'
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch client data'
    };
  }
}