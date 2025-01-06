import { CheckCircle2, Clock, Zap } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const steps = [
  {
    icon: <Clock className="w-8 h-8 text-green-600" />,
    title: "2-Minute Sign Up",
    description: "Quick and easy registration process to get you started immediately"
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
    title: "AI-Powered Discovery",
    description: "Our intelligent system guides you through the discovery process"
  },
  {
    icon: <Zap className="w-8 h-8 text-green-600" />,
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
          {steps.map((step) => (
            <div
              key={step.title}
              className="text-center transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}