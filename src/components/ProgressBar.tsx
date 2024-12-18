import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useDiscoveryStore } from '../store/discoveryStore';

const stages = [
  { name: 'Discovery', steps: ['Contact Info', 'Current State', 'Future State'] },
  { name: 'Themes Review' },
  { name: 'Solution Review' },
  { name: 'Final Analysis' },
];

export function ProgressBar() {
  const currentStage = useDiscoveryStore((state) => state.discovery.stage);
  const getStageNumber = (stage: number) => {
    if (stage <= 3) return 1;
    return stage - 2;
  };

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex flex-col items-center w-1/4">
            <div className="flex items-center">
              {getStageNumber(currentStage) > index + 1 ? (
                <CheckCircle className="w-8 h-8 text-[#009A4D]" />
              ) : getStageNumber(currentStage) === index + 1 ? (
                <Circle className="w-8 h-8 text-[#009A4D] animate-pulse" />
              ) : (
                <Circle className="w-8 h-8 text-gray-300" />
              )}
              {index < stages.length - 1 && (
                <div
                  className={`h-1 w-full mx-2 ${
                    getStageNumber(currentStage) > index + 1
                      ? 'bg-[#009A4D]'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 text-sm ${
                getStageNumber(currentStage) === index + 1
                  ? 'text-[#009A4D] font-medium'
                  : 'text-gray-500'
              }`}
            >
              {stage.name}
            </span>
            {stage.steps && getStageNumber(currentStage) === 1 && index === 0 && (
              <div className="mt-1 flex gap-1">
                {stage.steps.map((step, stepIndex) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full ${
                      currentStage === stepIndex + 1 ? 'bg-[#009A4D]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}