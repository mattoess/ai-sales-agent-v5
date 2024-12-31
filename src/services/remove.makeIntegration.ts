// src/services/makeIntegration.ts

import { DiscoveryState } from '../types/discovery';
import { makeApiRequest } from './make/api';
import { ValidationError } from './make/errors';
import { MAKE_CONFIG } from './make/config';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/qx0twe651e9jiwlbpri5tjzo3dx3bov2';
const MAKE_SOLUTION_WEBHOOK_URL = 'https://hook.us2.make.com/f5nyskdeceb7fw9bngef54925crhmi5o';

interface SolutionDescription {
  description: string;
  testimonials: string[];
  sessionId: string;
}

export async function sendToMake(discoveryData: DiscoveryState) {
  try {
    const payload = {
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
      Urgency: discoveryData.currentState.targetDate
    };

    const apiResponse = await makeApiRequest(
      MAKE_WEBHOOK_URL,
      payload,
      (data: unknown): data is {body: any, status: number, headers: any[]} => {
        return typeof data === 'object' && data !== null && 
               'body' in data && 'status' in data && 'headers' in data;
      },
      MAKE_CONFIG.timeouts.request, // Use the default timeout from config
      MAKE_CONFIG.retry.maxAttempts, // Use the default max attempts from config
      MAKE_CONFIG.retry.delayMs, // Use the default delay between attempts from config
      MAKE_CONFIG.retry.maxDelayMs // Use the default max delay from config
    );

    if (!apiResponse) {
      throw new ValidationError('No data received from Make.com discovery webhook');
    }

    return {
      current_state: {
        barrier_themes: apiResponse.body.barrier_themes || [],
        emotional_impact: apiResponse.body.emotional_impact || [],
        financial_risk: apiResponse.body.financial_risk || ''
      },
      future_state: {
        desired_outcomes: apiResponse.body.desired_outcomes || [],
        emotional_relief: apiResponse.body.emotional_relief || [],
        financial_impact: apiResponse.body.financial_impact || ''
      }
    };
  } catch (error) {
    console.error('Error sending data to Make:', error);
    throw error;
  }
}

export async function generateSolution(discoveryData: DiscoveryState) {
  try {
    const payload = {
      barrier_themes: discoveryData.aiSummary.currentState.barrierThemes,
      emotional_impact: discoveryData.aiSummary.currentState.emotionalThemes,
      financial_risk: discoveryData.aiSummary.currentState.urgencyStatement,
      desired_outcomes: discoveryData.aiSummary.futureState.outcomeThemes,
      emotional_relief: discoveryData.aiSummary.futureState.emotionalImpactThemes,
      financial_impact: discoveryData.aiSummary.futureState.financialImpactStatement,
      firstName: discoveryData.prospectInfo.firstName,
      lastName: discoveryData.prospectInfo.lastName,
      email: discoveryData.prospectInfo.email,
      companyName: discoveryData.prospectInfo.companyName,
      sessionName: discoveryData.sessionName,
      solution: discoveryData.solution,
      sessionId: discoveryData.sessionId
    };

    const apiResponse = await makeApiRequest(
      MAKE_SOLUTION_WEBHOOK_URL,
      payload,
      (data: unknown): data is {body: any, status: number, headers: any[]} => {
        return typeof data === 'object' && data !== null && 
               'body' in data && 'status' in data && 'headers' in data;
      },
      MAKE_CONFIG.timeouts.solution, // Use the solution timeout from config
      MAKE_CONFIG.retry.maxAttempts, // Use the default max attempts from config
      MAKE_CONFIG.retry.delayMs, // Use the default delay between attempts from config
      MAKE_CONFIG.retry.maxDelayMs // Use the default max delay from config
    );

    if (!apiResponse) {
      throw new ValidationError('No data received from Make.com solution webhook');
    }

    return {
      description: apiResponse.body.solution_description || '',
      testimonials: apiResponse.body.testimonials || [],
      sessionId: apiResponse.body.sessionId
    } as SolutionDescription;
  } catch (error) {
    console.error('Error generating solution:', error);
    throw error;
  }
}