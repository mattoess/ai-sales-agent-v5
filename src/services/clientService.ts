// src/services/clientService.ts
import { MAKE_CONFIG } from './make/config';
import type { ClientData, ClientResponse } from '../types/client';

export async function createClient(data: Omit<ClientData, 'clientId'>): Promise<ClientResponse> {
  try {
    const response = await fetch(MAKE_CONFIG.urls.client, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'createClient',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        companyName: data.companyName,
        clerkUserId: data.clerkUserId,
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();

    // Handle 409 Conflict (existing user/email) as a normal flow, not an error
    if (response.status === 409) {
      return {
        status: 'error',
        ...result
      };
    }

    // Handle 201 Created (success)
    if (response.status === 201) {
      return {
        status: 'success',
        ...result
      };
    }

    return result;

  } catch (error) {
    console.error('Client registration error:', error);
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