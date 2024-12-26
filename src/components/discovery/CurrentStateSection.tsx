import React from 'react';
import { TextAreaField } from '../forms/TextAreaField';
import { DateField } from '../forms/DateField';
import { useDiscoveryStore } from '../../store/discoveryStore';

export const CurrentStateSection: React.FC = () => {
  const { currentState, updateCurrentState } = useDiscoveryStore((state) => ({
    currentState: state.discovery.currentState,
    updateCurrentState: state.updateCurrentState,
  }));

  return (
    <div className="space-y-4">
      <TextAreaField
        label="Pain Points - What is getting in the way of what you are trying to achieve?"
        value={currentState.barriers.join('\n')}
        onChange={(value) => updateCurrentState({ barriers: value.split('\n') })}
        placeholder="Describe the barriers that are keeping you and your team from achieving success?"
        rows={6}
      />

      <TextAreaField
        label="Financial Impact - What happens if these barriers continue to be in the way?"
        value={currentState.financialImpact}
        onChange={(value) => updateCurrentState({ financialImpact: value })}
        placeholder="Describe the financial impact (revenue goals missed, profitability impacts, bonuses missed)"
      />

      <DateField
        label="Target Resolution Date"
        value={currentState.targetDate}
        onChange={(value) => updateCurrentState({ targetDate: value })}
      />

      <TextAreaField
        label="Personal Impact - What's it feel like every day waking up with the barriers? Or, prepping for board meeting?"
        value={currentState.emotionalImpact}
        onChange={(value) => updateCurrentState({ emotionalImpact: value })}
        placeholder="Describe the personal impact and the emotional stress"
        rows={4}
      />
    </div>
  );
};