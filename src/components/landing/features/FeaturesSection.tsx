// import React from 'react';
import { 
  Brain, 
  LineChart, 
  Lightbulb,
  MessageSquareText, 
  FileText, 
  Zap 
} from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Discovery Sessions",
    description: "Real-time AI guidance helps your reps ask the right questions, uncover pain points, and navigate complex B2B conversations like your most experienced seller.",
  },
  {
    icon: <MessageSquareText className="w-8 h-8" />,
    title: "Live Conversation Intelligence",
    description: "AI analyzes prospect responses in real-time, focusing on delivering desire outcomes, and maximizing relevence.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Smart Solution Matching",
    description: "Perfectlly matches your products and services to prospect needs, pulling pricing, relevant case studies and ROI data during live conversations.",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Automated Proposal Generation",
    description: "Instantly creates personalized proposals that perfectly align your solutions with discovered customer needs and pain points.",
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Performance Analytics",
    description: "Track improvement in discovery effectiveness, conversion rates, and deal velocity across your entire sales team.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Rapid Knowledge Transfer",
    description: "New reps immediately leverage your best sales practices and company knowledge, dramatically reducing ramp-up time.",
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Every Rep's AI-Powered Secret Weapon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your entire sales team with AI that makes every discovery call as effective as your top performer's best day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-green-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;