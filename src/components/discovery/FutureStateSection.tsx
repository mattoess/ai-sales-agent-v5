import React from 'react';
import { TextAreaField } from '../forms/TextAreaField';
import { useDiscoveryStore } from '../../store/discoveryStore';

const SOLUTION_OPTIONS = [
  'Executive Team Coaching',
  'Executive 1:1 Coaching',
  'Executive Readiness Coaching',
] as const;

export const FutureStateSection: React.FC = () => {
  const { futureState, updateFutureState, solution, updateSolution } = useDiscoveryStore((state) => ({
    futureState: state.discovery.futureState,
    updateFutureState: state.updateFutureState,
    solution: state.discovery.solution,
    updateSolution: state.updateSolution,
  }));

  return (
    <div className="space-y-4">
      <TextAreaField
        label="Desired Outcomes - What would be different and true after success?"
        value={futureState.desiredOutcomes.join('\n')}
        onChange={(value) => updateFutureState({ desiredOutcomes: value.split('\n') })}
        placeholder="Describe the desired outcomes..."
        rows={6}
      />

      <TextAreaField
        label="Financial Impact of Achieving Outcomes"
        value={futureState.financialImpact}
        onChange={(value) => updateFutureState({ financialImpact: value })}
        placeholder="Describe the financial impact..."
      />

      <TextAreaField
        label="Personal Impact - How will it feel after achieving the outcomes?"
        value={futureState.emotionalRelief}
        onChange={(value) => updateFutureState({ emotionalRelief: value })}
        placeholder="Describe the personal impact..."
        rows={4}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recommended Solution
        </label>
        <select
          value={solution}
          onChange={(e) => updateSolution(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a solution</option>
          {SOLUTION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};