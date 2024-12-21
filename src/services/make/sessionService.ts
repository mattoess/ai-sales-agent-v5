import { DiscoveryState } from '../../types/discovery';
import { User } from '../../types/auth';
import { makeApiRequest } from './api';
import { MAKE_CONFIG } from './config';

interface StoreSessionOptions {
  sessionId?: string;
  sessionName: string;
  isNewSession: boolean;
}

interface SessionResponse {
  sessionId: string;
  status: 'success' | 'error';
  message?: string;
}

function validateSessionResponse(data: unknown): data is SessionResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'sessionId' in data &&
    'status' in data &&
    typeof (data as any).sessionId === 'string' &&
    typeof (data as any).status === 'string'
  );
}

export async function storeDiscoverySession(
  discoveryData: DiscoveryState,
  user: User,
  options: StoreSessionOptions
): Promise<SessionResponse> {
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

  return makeApiRequest<SessionResponse>(
    'session', // Use correct endpoint
    payload,
    validateSessionResponse
  );
}