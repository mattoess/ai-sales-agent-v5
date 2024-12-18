interface RawMakeResponse {
  solution_description: {
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
  };
}

export function parseMakeResponse(responseData: any) {
  let solutionDesc: RawMakeResponse['solution_description'];
    
  if (Array.isArray(responseData)) {
    const firstResponse = responseData[0];
    if (!firstResponse?.body) {
      throw new Error('Invalid array response structure');
    }
    const parsedBody = typeof firstResponse.body === 'string' 
      ? JSON.parse(firstResponse.body) 
      : firstResponse.body;
    solutionDesc = parsedBody.solution_description;
  } else if (responseData.solution_description) {
    solutionDesc = responseData.solution_description;
  } else {
    throw new Error('Unexpected response structure');
  }

  validateSolutionDescription(solutionDesc);

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
}

function validateSolutionDescription(desc: any) {
  if (!desc) {
    throw new Error('Missing solution description');
  }

  const requiredFields = [
    'current_state',
    'future_state',
    'bridge_the_gap',
    'similar_use_cases'
  ];

  for (const field of requiredFields) {
    if (!desc[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}