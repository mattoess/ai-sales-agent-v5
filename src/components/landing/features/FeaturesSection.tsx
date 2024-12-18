import React from 'react';
import { Brain, BarChart3, Target, Users } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { SectionTitle } from '../SectionTitle';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-techcxo-green" />,
    title: "AI-Powered Discovery",
    description: "Transform sales conversations with intelligent question flows and real-time insights"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-techcxo-green" />,
    title: "Smart Analytics",
    description: "Get actionable insights from every customer interaction"
  },
  {
    icon: <Target className="w-8 h-8 text-techcxo-green" />,
    title: "Guided Solutions",
    description: "AI-recommended solutions based on customer pain points"
  },
  {
    icon: <Users className="w-8 h-8 text-techcxo-green" />,
    title: "Team Collaboration",
    description: "Share insights and collaborate on opportunities seamlessly"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Powerful Features for Modern Sales Teams"
          subtitle="Everything you need to transform your sales discovery process"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}