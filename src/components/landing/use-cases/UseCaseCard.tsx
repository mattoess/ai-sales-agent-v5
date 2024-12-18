import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface UseCaseProps {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  index: number;
}

export function UseCaseCard({ title, industry, challenge, solution, results, index }: UseCaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      <div className="mb-4">
        <span className="text-sm font-medium text-techcxo-green">{industry}</span>
        <h3 className="text-xl font-semibold text-techcxo-navy mt-1">{title}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Challenge</h4>
          <p className="text-gray-600 mt-1">{challenge}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Solution</h4>
          <p className="text-gray-600 mt-1">{solution}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Results</h4>
          <p className="text-gray-600 mt-1">{results}</p>
        </div>
      </div>
      
      <button className="mt-6 text-techcxo-green font-medium flex items-center hover:text-techcxo-green/80">
        Learn More <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </motion.div>
  );
}