import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Zap } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const steps = [
  {
    icon: <Clock className="w-8 h-8 text-techcxo-green" />,
    title: "2-Minute Sign Up",
    description: "Quick and easy registration process to get you started immediately"
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-techcxo-green" />,
    title: "AI-Powered Discovery",
    description: "Our intelligent system guides you through the discovery process"
  },
  {
    icon: <Zap className="w-8 h-8 text-techcxo-green" />,
    title: "Instant Insights",
    description: "Get actionable insights and recommendations in real-time"
  }
];

export function GetStartedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Get Started in Minutes"
          subtitle="Transform your sales discovery process with three simple steps"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-techcxo-navy mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}