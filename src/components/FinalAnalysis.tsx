import React from 'react';
import { motion } from 'framer-motion';
import { useDiscoveryStore } from '../store/discoveryStore';
import { Check, MessageSquare } from 'lucide-react';

export function FinalAnalysis() {
  const { aiSummary } = useDiscoveryStore((state) => ({
    aiSummary: state.discovery.aiSummary,
  }));

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Three-column layout for main analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Current State */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Current State</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Barrier Themes</h4>
              <ul className="space-y-2">
                {aiSummary.currentState.barrierThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-red-500 mt-0.5" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact Themes</h4>
              <ul className="space-y-2">
                {aiSummary.currentState.emotionalThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Risk Statement</h4>
              <p className="text-gray-700 bg-yellow-50 p-4 rounded-md border border-yellow-100">
                {aiSummary.currentState.urgencyStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Solution Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#009A4D]">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Solution Overview</h2>
          <div className="relative">
            <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-100">
              {aiSummary.solution?.description}
            </p>
          </div>
        </div>

        {/* Future State */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Future State</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Desired Outcome Themes</h4>
              <ul className="space-y-2">
                {aiSummary.futureState.outcomeThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact Themes</h4>
              <ul className="space-y-2">
                {aiSummary.futureState.emotionalImpactThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Impact Statement</h4>
              <p className="text-gray-700 bg-green-50 p-4 rounded-md border border-green-100">
                {aiSummary.futureState.financialImpactStatement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiSummary.solution?.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="flex gap-4 bg-green-50 p-4 rounded-lg border border-green-100"
            >
              <MessageSquare className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-gray-700 whitespace-pre-line">{testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}