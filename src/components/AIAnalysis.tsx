import React from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { ThemeList } from './analysis/ThemeList';
import { ImpactStatement } from './analysis/ImpactStatement';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIAnalysis: React.FC = () => {
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
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Current State</h2>
          
          <div className="space-y-6">
            <ThemeList
              title="Key Barrier Themes"
              themes={aiSummary.currentState.barrierThemes}
              iconColor="text-red-500"
            />

            <ThemeList
              title="Personal Impact Themes"
              themes={aiSummary.currentState.emotionalThemes}
              iconColor="text-purple-500"
            />

            <ImpactStatement
              title="Financial Risk Statement"
              statement={aiSummary.currentState.urgencyStatement}
              type="warning"
            />
          </div>
        </motion.div>

        {/* Arrows for larger screens */}
        <div className="hidden lg:block absolute left-[30%] top-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ArrowRight className="w-12 h-12 text-techcxo-green" strokeWidth={3} />
          </motion.div>
        </div>
        <div className="hidden lg:block absolute right-[30%] top-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ArrowRight className="w-12 h-12 text-techcxo-green" strokeWidth={3} />
          </motion.div>
        </div>

        {/* Bridge the Gap */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg border-2 border-techcxo-green"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-techcxo-navy mb-6">How We Bridge the Gap</h2>
          
          <div className="relative">
            <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-100">
              {aiSummary.solution?.description}
            </p>
          </div>
        </motion.div>

        {/* Future State */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Future State</h2>
          
          <div className="space-y-6">
            <ThemeList
              title="Desired Outcome Themes"
              themes={aiSummary.futureState.outcomeThemes}
              iconColor="text-green-500"
            />

            <ThemeList
              title="Personal Impact Themes"
              themes={aiSummary.futureState.emotionalImpactThemes}
              iconColor="text-emerald-500"
            />

            <ImpactStatement
              title="Financial Impact Statement"
              statement={aiSummary.futureState.financialImpactStatement}
              type="success"
            />
          </div>
        </motion.div>
      </div>

      {/* Success Stories */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6 }}
      >
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
      </motion.div>
    </motion.div>
  );
};