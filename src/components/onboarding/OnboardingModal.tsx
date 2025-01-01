// src/components/onboarding/OnboardingModal.tsx
import { X } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { CompanySetup } from './steps/CompanySetup';
import { TeamSetup } from './steps/TeamSetup';
import { ContentSetup } from './steps/ContentSetup';
import { WelcomeStep } from './steps/WelcomeStep';
import { 
  ONBOARDING_STEPS, 
  OnboardingStepNumber, 
  WelcomeStepProps, 
  StepProps,
  OnboardingData 
} from '../../types/onboarding';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StepConfig {
  id: OnboardingStepNumber;
  name: string;
  component: React.ComponentType<WelcomeStepProps> | React.ComponentType<StepProps>;
  isRequired?: boolean;
  validationFn?: (data: OnboardingData) => boolean;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const { onboarding, setCurrentStep, setOnboarded } = useOnboardingStore();
  
  const steps: StepConfig[] = [
    { 
      id: ONBOARDING_STEPS.WELCOME, 
      name: 'Welcome', 
      component: WelcomeStep,
      isRequired: false 
    },
    { 
      id: ONBOARDING_STEPS.COMPANY_SETUP, 
      name: 'Company Setup', 
      component: CompanySetup,
      isRequired: true,
      validationFn: (data) => !!data.companyName
    },
    { 
      id: ONBOARDING_STEPS.TEAM_SETUP, 
      name: 'Team Setup', 
      component: TeamSetup,
      isRequired: false
    },
    { 
      id: ONBOARDING_STEPS.CONTENT_SETUP, 
      name: 'Content Setup', 
      component: ContentSetup,
      isRequired: false
    },
  ];

  const currentStep = onboarding.currentStep ?? ONBOARDING_STEPS.WELCOME;

  const getNextAvailableStep = (): number => {
    for (let i = 1; i <= steps.length; i++) {
      const step = steps[i - 1];
      if (step.isRequired && step.validationFn && !step.validationFn(onboarding.data)) {
        return i;
      }
    }
    return steps.length;
  };

  const handleStepClick = (step: OnboardingStepNumber) => {
    const targetStep = steps.find(s => s.id === step);
    if (!targetStep) return;

    // Check if all previous required steps are completed
    const previousSteps = steps.slice(0, step - 1);
    const canNavigate = previousSteps.every(s => 
      !s.isRequired || !s.validationFn || s.validationFn(onboarding.data)
    );

    if (canNavigate) {
      setCurrentStep(step);
    }
  };

  const validateCurrentStep = (): boolean => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return true;
    return !step.isRequired || !step.validationFn || step.validationFn(onboarding.data);
  };

  const handleNext = () => {
    if (currentStep < steps.length && validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      const allValid = steps
        .filter(step => step.isRequired)
        .every(step => !step.validationFn || step.validationFn(onboarding.data));

      if (allValid) {
        setOnboarded(true);
        onClose();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return null;

    if (step.id === ONBOARDING_STEPS.WELCOME) {
      return <WelcomeStep onStepClick={handleStepClick} />;
    }

    const StepComponent = step.component as React.ComponentType<StepProps>;
    return <StepComponent />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {steps.find(step => step.id === currentStep)?.name}
              </h2>
              {steps.find(step => step.id === currentStep)?.isRequired && (
                <span className="text-sm text-red-500">* Required</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center focus:outline-none ${
                      step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
                    } ${step.id > getNextAvailableStep() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={step.id > getNextAvailableStep()}
                  >
                    <span className="w-8 h-8 flex items-center justify-center border-2 rounded-full hover:bg-blue-50 transition-colors">
                      {step.id}
                      {step.isRequired && <span className="text-red-500 text-xs">*</span>}
                    </span>
                    {step.id < steps.length && (
                      <div className="flex-1 h-0.5 mx-2 bg-gray-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="mt-6">
              {renderStepContent()}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {currentStep === steps.length ? 'Complete Setup' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}