// src/components/onboarding/steps/WelcomeStep.tsx
import { useUser } from '@clerk/clerk-react';
import { ArrowRight, Building2, Users, FileText } from 'lucide-react';
import { 
  WelcomeStepProps, 
  ONBOARDING_STEPS, 
  OnboardingStepNumber 
} from '../../../types/onboarding';

export function WelcomeStep({ onStepClick }: WelcomeStepProps) {
  const { user } = useUser();

  const steps: Array<{
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    step: OnboardingStepNumber;
    isRequired: boolean;
  }> = [
    {
      Icon: Building2,
      title: '🏢 Set Up Your Company',
      description: 'Add your company details and branding',
      step: ONBOARDING_STEPS.COMPANY_SETUP,
      isRequired: true
    },
    {
      Icon: Users,
      title: '👥 Invite Your Team',
      description: 'Collaborate with your colleagues',
      step: ONBOARDING_STEPS.TEAM_SETUP,
      isRequired: false
    },
    {
      Icon: FileText,
      title: '📚 Upload Content',
      description: 'Add your first resources and materials',
      step: ONBOARDING_STEPS.CONTENT_SETUP,
      isRequired: false
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
        Welcome to Discovery Studio, {user?.firstName}! 🚀
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Let's get your workspace set up in just a few steps. We'll help you:
      </p>

      <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
        {steps.map(({ Icon, title, description, step, isRequired }, index) => (
          <button
            key={index}
            onClick={() => onStepClick(step)}
            className="text-left bg-blue-50 p-4 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer group w-full"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-900">
                    {title}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-blue-700">{description}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        This will only take a few minutes. You can always update these settings later.
        <br />
        <span className="text-red-500">*</span> Required steps
      </p>
    </div>
  );
}