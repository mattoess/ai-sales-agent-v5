import { Check, Users, Building2, Briefcase } from 'lucide-react';
import { SectionTitle } from '../SectionTitle';

const useCases = [
  {
    icon: <Building2 className="w-12 h-12 text-green-600" />,
    title: "Enterprise Sales",
    description: "Close complex enterprise deals faster with AI that helps navigate multiple stakeholders, technical requirements, and procurement processes.",
    benefits: [
      "Multi-stakeholder engagement strategies",
      "Technical requirement mapping",
      "Enterprise-ready proposal generation"
    ]
  },
  {
    icon: <Users className="w-12 h-12 text-green-600" />,
    title: "Solution Consulting",
    description: "Transform technical capabilities into business value with AI that helps articulate ROI and alignment with customer objectives.",
    benefits: [
      "Value proposition customization",
      "ROI calculation assistance",
      "Technical-to-business translation"
    ]
  },
  {
    icon: <Briefcase className="w-12 h-12 text-green-600" />,
    title: "Professional Services",
    description: "Win more consulting engagements by showcasing expertise and developing tailored service proposals in real-time.",
    benefits: [
      "Expertise demonstration",
      "Scope customization",
      "Deliverable optimization"
    ]
  }
];

export default function UseCasesSection() {
  return (
    <section className="py-20 bg-gray-50" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Powerful Across All B2B Sales"
          subtitle="From enterprise software to professional services, enhance every sales conversation"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {useCase.description}
              </p>
              <ul className="space-y-3">
                {useCase.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}