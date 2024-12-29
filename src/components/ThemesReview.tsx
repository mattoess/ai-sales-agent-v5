// src/components/ThemesReview.tsx

import React from 'react';
import { TextAreaField } from './forms/TextAreaField';
import { useDiscoveryStore } from '../store/discoveryStore';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function ThemesReview() {
  const { aiSummary, updateAISummary, discovery, updateSessionName, solution, updateSolution } = useDiscoveryStore((state) => ({
    aiSummary: state.discovery.aiSummary,
    updateAISummary: state.updateAISummary,
    discovery: state.discovery,
    updateSessionName: state.updateSessionName,
    solution: state.discovery.solution,
    updateSolution: state.updateSolution,
  }));

  React.useEffect(() => {
    const defaultName = `${discovery.prospectInfo.companyName}-discovery-${new Date().toISOString().split('T')[0]}`;
    updateSessionName(defaultName);
  }, [discovery.prospectInfo.companyName, updateSessionName]);

  const handleCurrentStateChange = (key: keyof typeof aiSummary.currentState, value: string | string[]) => {
    updateAISummary({
      currentState: {
        [key]: value
      }
    });
  };

  const handleFutureStateChange = (key: keyof typeof aiSummary.futureState, value: string | string[]) => {
    updateAISummary({
      futureState: {
        [key]: value
      }
    });
  };

  // Helper function to safely join arrays
  const safeJoin = (arr?: string[]) => arr?.length ? arr.join('\n') : '';

  const handleSolutionChange = (value: string) => {
    updateSolution(value);
  };

  // Example dynamic solution options
  const solutionOptions = [
    'Executive Team Coaching',
    'Executive 1:1 Coaching',
    'Executive Readiness Coaching',
    // Add more options dynamically as needed
  ];

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
            value={safeJoin(aiSummary.currentState.barrierThemes)}
            onChange={(value) => handleCurrentStateChange('barrierThemes', value.split('\n').filter(theme => theme.trim()))}
            rows={6}
          />

          <TextAreaField
            label="Personal Impact Themes"
            value={safeJoin(aiSummary.currentState.emotionalThemes)}
            onChange={(value) => handleCurrentStateChange('emotionalThemes', value.split('\n').filter(theme => theme.trim()))}
            rows={4}
          />

          <TextAreaField
            label="Financial Risk Statement"
            value={aiSummary.currentState.urgencyStatement || ''}
            onChange={(value) => handleCurrentStateChange('urgencyStatement', value)}
            rows={3}
          />
        </div>

        {/* Future State Analysis */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Future State</h3>
          
          <TextAreaField
            label="Desired Outcome Themes"
            value={safeJoin(aiSummary.futureState.outcomeThemes)}
            onChange={(value) => handleFutureStateChange('outcomeThemes', value.split('\n').filter(theme => theme.trim()))}
            rows={6}
          />

          <TextAreaField
            label="Personal Impact Themes"
            value={safeJoin(aiSummary.futureState.emotionalImpactThemes)}
            onChange={(value) => handleFutureStateChange('emotionalImpactThemes', value.split('\n').filter(theme => theme.trim()))}
            rows={4}
          />

          <TextAreaField
            label="Financial Impact Statement"
            value={aiSummary.futureState.financialImpactStatement || ''}
            onChange={(value) => handleFutureStateChange('financialImpactStatement', value)}
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommended Solution
            </label>
            <Select
              onValueChange={handleSolutionChange}
              value={solution || ''}
            >
              <SelectTrigger className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]">
                <SelectValue placeholder="Select Solution Recommendation" />
              </SelectTrigger>
              <SelectContent>
                {solutionOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          value={discovery.sessionName || ''}
          onChange={(e) => updateSessionName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
          placeholder="Enter session name"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          This name will be used to identify the discovery session in your dashboard for future edits and reference
        </p>
      </div>
    </motion.div>
  );
}