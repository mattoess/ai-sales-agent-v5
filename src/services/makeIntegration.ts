import { DiscoveryState } from '../types/discovery';

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

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to process discovery data');
    }

    const data = await response.json();
    return {
      current_state: {
        barrier_themes: data.barrier_themes || [],
        emotional_impact: data.emotional_impact || [],
        financial_risk: data.financial_risk || ''
      },
      future_state: {
        desired_outcomes: data.desired_outcomes || [],
        emotional_relief: data.emotional_relief || [],
        financial_impact: data.financial_impact || ''
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

    const response = await fetch(MAKE_SOLUTION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to generate solution');
    }

    const data = await response.json();
    return {
      description: data.solution_description || '',
      testimonials: data.testimonials || [],
      sessionId: data.sessionId
    } as SolutionDescription;
  } catch (error) {
    console.error('Error generating solution:', error);
    throw error;
  }
}