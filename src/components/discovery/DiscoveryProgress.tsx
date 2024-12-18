import React from 'react';
import { Circle, CheckCircle } from 'lucide-react';

interface DiscoveryProgressProps {
  currentStep: number;
}

const steps = [
  { label: 'Contact Info', substeps: 1 },
  { label: 'Current State', substeps: 1 },
  { label: 'Future State', substeps: 1 },
];

export function DiscoveryProgress({ currentStep }: DiscoveryProgressProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-col items-center flex-1">
          <div className="flex items-center w-full">
            {index > 0 && (
              <div
                className={`h-1 flex-1 ${
                  currentStep > index ? 'bg-[#009A4D]' : 'bg-gray-200'
                }`}
              />
            )}
            <div className="relative">
              {currentStep > index ? (
                <CheckCircle className="w-8 h-8 text-[#009A4D]" />
              ) : currentStep === index ? (
                <Circle className="w-8 h-8 text-[#009A4D] animate-pulse" />
              ) : (
                <Circle className="w-8 h-8 text-gray-300" />
              )}
              {currentStep === index && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-[#009A4D]">
                  Step {currentStep}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  currentStep > index ? 'bg-[#009A4D]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
          <span className="mt-8 text-sm font-medium text-gray-600">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}