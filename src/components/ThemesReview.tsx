import React from 'react';
import { TextAreaField } from './forms/TextAreaField';
import { useDiscoveryStore } from '../store/discoveryStore';
import { motion } from 'framer-motion';

export function ThemesReview() {
  const { aiSummary, updateAISummary, discovery, updateSessionName } = useDiscoveryStore((state) => ({
    aiSummary: state.discovery.aiSummary,
    updateAISummary: state.updateAISummary,
    discovery: state.discovery,
    updateSessionName: state.updateSessionName,
  }));

  // Generate default session name when component mounts
  React.useEffect(() => {
    const defaultName = `${discovery.prospectInfo.companyName}-discovery-${new Date().toISOString().split('T')[0]}`;
    updateSessionName(defaultName);
  }, [discovery.prospectInfo.companyName, updateSessionName]);

  return (
    <motion.div 
      className="space-y-8 bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900">Discovery Themes Review</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State Analysis */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Current State</h3>
          
          <TextAreaField
            label="Key Barrier Themes"
            value={aiSummary.currentState.barrierThemes.join('\n')}
            onChange={(value) =>
              updateAISummary({
                currentState: {
                  ...aiSummary.currentState,
                  barrierThemes: value.split('\n').filter(theme => theme.trim()),
                },
              })
            }
            rows={6}
          />

          <TextAreaField
            label="Personal Impact Themes"
            value={aiSummary.currentState.emotionalThemes.join('\n')}
            onChange={(value) =>
              updateAISummary({
                currentState: {
                  ...aiSummary.currentState,
                  emotionalThemes: value.split('\n').filter(theme => theme.trim()),
                },
              })
            }
            rows={4}
          />

          <TextAreaField
            label="Financial Risk Statement"
            value={aiSummary.currentState.urgencyStatement}
            onChange={(value) =>
              updateAISummary({
                currentState: {
                  ...aiSummary.currentState,
                  urgencyStatement: value,
                },
              })
            }
            rows={3}
          />
        </div>

        {/* Future State Analysis */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Future State</h3>
          
          <TextAreaField
            label="Desired Outcome Themes"
            value={aiSummary.futureState.outcomeThemes.join('\n')}
            onChange={(value) =>
              updateAISummary({
                futureState: {
                  ...aiSummary.futureState,
                  outcomeThemes: value.split('\n').filter(theme => theme.trim()),
                },
              })
            }
            rows={6}
          />

          <TextAreaField
            label="Personal Impact Themes"
            value={aiSummary.futureState.emotionalImpactThemes.join('\n')}
            onChange={(value) =>
              updateAISummary({
                futureState: {
                  ...aiSummary.futureState,
                  emotionalImpactThemes: value.split('\n').filter(theme => theme.trim()),
                },
              })
            }
            rows={4}
          />

          <TextAreaField
            label="Financial Impact Statement"
            value={aiSummary.futureState.financialImpactStatement}
            onChange={(value) =>
              updateAISummary({
                futureState: {
                  ...aiSummary.futureState,
                  financialImpactStatement: value,
                },
              })
            }
            rows={3}
          />
        </div>
      </div>

      {/* Session Name Input */}
      <div className="border-t pt-6">
        <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700 mb-2">
          Discovery Session Name
        </label>
        <input
          type="text"
          id="sessionName"
          value={discovery.sessionName}
          onChange={(e) => updateSessionName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
          placeholder="Enter session name"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          This name will be used to identify the discovery session in your dashboard
        </p>
      </div>
    </motion.div>
  );
}