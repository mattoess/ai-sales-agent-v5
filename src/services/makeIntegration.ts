import { DiscoveryState } from '../types/discovery';
import { parseMakeResponse } from './api/makeResponseParser';
import { User } from '../types/auth';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/qx0twe651e9jiwlbpri5tjzo3dx3bov2';
const MAKE_STORE_WEBHOOK_URL = 'https://hook.us2.make.com/4rwh4wmldfn7rqzv3mnfrk0dfn1cpzsh';
const MAKE_GET_WEBHOOK_URL = 'https://hook.us2.make.com/0qe3suyxn2tz56struqyu0tygx9gse6m';

interface StoreSessionOptions {
  sessionId?: string;
  sessionName: string;
  isNewSession: boolean;
}

export async function storeDiscoverySession(
  discoveryData: DiscoveryState,
  user: User,
  options: StoreSessionOptions
) {
  try {
    const payload = {
      // Session metadata
      sessionId: options.sessionId || '',
      sessionName: options.sessionName,
      isNewSession: options.isNewSession,
      
      // User data
      userId: user.id,
      userEmail: user.email,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      companyId: user.companyId,
      
      // Discovery data
      prospectInfo: discoveryData.prospectInfo,
      currentState: discoveryData.currentState,
      futureState: discoveryData.futureState,
      solution: discoveryData.solution,
      aiSummary: discoveryData.aiSummary,
      
      // Metadata
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    const response = await fetch(MAKE_STORE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to store discovery session');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error storing discovery session:', error);
    throw error;
  }
}

export async function getDiscoverySession(sessionId: string) {
  try {
    const response = await fetch(MAKE_GET_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve discovery session');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error retrieving discovery session:', error);
    throw error;
  }
}

export async function sendToMake(discoveryData: DiscoveryState) {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Barriers: discoveryData.currentState.barriers.join('\r\n'),
        'Barriers Financial Impact': discoveryData.currentState.financialImpact,
        'Barriers Personal Impact': discoveryData.currentState.emotionalImpact,
        ClientId: discoveryData.prospectInfo.clientId,
        'Outcome Financial Impact': discoveryData.futureState.financialImpact,
        Outcomes: discoveryData.futureState.desiredOutcomes.join('\r\n'),
        'Outcomes Personal Impact': discoveryData.futureState.emotionalRelief,
        'Prospect Email Address': discoveryData.prospectInfo.email,
        'Prospect First Name': discoveryData.prospectInfo.firstName,
        'Prospect Last Name': discoveryData.prospectInfo.lastName,
        Solution: discoveryData.solution,
        Urgency: discoveryData.currentState.targetDate
      })
    });

    if (!response.ok) {
      throw new Error('Failed to process discovery data');
    }

    const data = await response.json();
    return parseMakeResponse(data);
  } catch (error) {
    console.error('Error sending data to Make:', error);
    throw error;
  }
}