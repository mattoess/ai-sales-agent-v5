import { DiscoveryState } from '../types/discovery';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/qx0twe651e9jiwlbpri5tjzo3dx3bov2';

interface SolutionDescription {
  current_state: {
    barrier_themes: string[];
    emotional_impact: string[];
    financial_risk: string;
  };
  future_state: {
    desired_outcomes: string[];
    emotional_relief: string[];
    financial_impact: string;
  };
  bridge_the_gap: {
    solution_summary: string;
  };
  similar_use_cases: Array<{
    story: string;
    impact: string;
  }>;
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
      Solution: discoveryData.solution,
      Urgency: discoveryData.currentState.targetDate
    };

    console.log('Sending payload:', payload);

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok && response.status !== 302) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!responseText) {
      throw new Error('Empty response from Make.com');
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('JSON Parse Error:', e);
      throw new Error('Failed to parse Make.com response');
    }

    console.log('Parsed response data:', responseData);

    // Handle different response formats
    let solutionDesc: SolutionDescription;
    
    if (Array.isArray(responseData)) {
      // Handle array response format
      const firstResponse = responseData[0];
      if (!firstResponse || !firstResponse.body) {
        throw new Error('Invalid array response structure from Make.com');
      }
      const parsedBody = typeof firstResponse.body === 'string' 
        ? JSON.parse(firstResponse.body) 
        : firstResponse.body;
      solutionDesc = parsedBody.solution_description;
    } else if (responseData.solution_description) {
      // Handle direct object response format
      solutionDesc = responseData.solution_description;
    } else {
      console.error('Unexpected response structure:', responseData);
      throw new Error('Unexpected response structure from Make.com');
    }

    // Validate solution description
    if (!solutionDesc) {
      throw new Error('Missing solution description');
    }

    // Validate all required fields exist
    const requiredFields = [
      'current_state',
      'future_state',
      'bridge_the_gap',
      'similar_use_cases'
    ];

    for (const field of requiredFields) {
      if (!solutionDesc[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return {
      current_state: {
        barrier_themes: solutionDesc.current_state.barrier_themes || [],
        emotional_impact: solutionDesc.current_state.emotional_impact || [],
        financial_risk: solutionDesc.current_state.financial_risk || ''
      },
      future_state: {
        desired_outcomes: solutionDesc.future_state.desired_outcomes || [],
        emotional_relief: solutionDesc.future_state.emotional_relief || [],
        financial_impact: solutionDesc.future_state.financial_impact || ''
      },
      bridge_the_gap: {
        solution_summary: solutionDesc.bridge_the_gap.solution_summary || ''
      },
      similar_use_cases: (solutionDesc.similar_use_cases || []).map(useCase => ({
        story: useCase.story || '',
        impact: useCase.impact || ''
      }))
    };
  } catch (error) {
    console.error('Make.com integration error:', error);
    throw error;
  }
}