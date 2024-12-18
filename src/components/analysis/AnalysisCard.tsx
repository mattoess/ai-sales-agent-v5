import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, children, className = '' }) => {
  return (
    <motion.div
      className={`bg-white p-6 rounded-lg shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
};