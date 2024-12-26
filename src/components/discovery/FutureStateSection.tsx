import React from 'react';
import { TextAreaField } from '../forms/TextAreaField';
import { useDiscoveryStore } from '../../store/discoveryStore';


export const FutureStateSection: React.FC = () => {
  const { futureState, updateFutureState} = useDiscoveryStore((state) => ({
    futureState: state.discovery.futureState,
    updateFutureState: state.updateFutureState,
  }));

  return (
    <div className="space-y-4">
      <TextAreaField
        label="Desired Outcomes - What would be different and true after success?"
        value={futureState.desiredOutcomes.join('\n')}
        onChange={(value) => updateFutureState({ desiredOutcomes: value.split('\n') })}
        placeholder="Describe the desired outcomes if all the barriers were gone and success happend"
        rows={6}
      />

      <TextAreaField
        label="Financial Impact of Achieving Outcomes"
        value={futureState.financialImpact}
        onChange={(value) => updateFutureState({ financialImpact: value })}
        placeholder="Describe the financial impact (revenue goals hit, profitability impacts, bonused earned"
      />

      <TextAreaField
        label="Personal Impact - How will it feel after achieving the outcomes?"
        value={futureState.emotionalRelief}
        onChange={(value) => updateFutureState({ emotionalRelief: value })}
        placeholder="Describe the personal impact and the emotional relief for you and your team"
        rows={4}
      />

    </div>
  );
};