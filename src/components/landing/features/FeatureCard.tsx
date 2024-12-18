import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-techcxo-navy mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}