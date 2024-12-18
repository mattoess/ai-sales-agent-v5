import React from 'react';
import { Brain, Sliders, MessageSquare, Zap } from 'lucide-react';
import { Switch } from '../common/Switch';

const aiSettings = [
  {
    id: 'advanced-analysis',
    title: 'Advanced Analysis',
    description: 'Enable deeper AI analysis of discovery sessions',
    icon: Brain,
  },
  {
    id: 'auto-suggestions',
    title: 'Smart Suggestions',
    description: 'Receive AI-powered recommendations during sessions',
    icon: MessageSquare,
  },
  {
    id: 'real-time-insights',
    title: 'Real-time Insights',
    description: 'Get instant AI analysis during discovery sessions',
    icon: Zap,
  },
  {
    id: 'custom-model',
    title: 'Custom AI Model',
    description: 'Use your own trained AI model for analysis',
    icon: Sliders,
  },
];

export function AISettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">AI Assistant Configuration</h3>
          <p className="mt-1 text-sm text-gray-500">
            Customize how the AI assistant analyzes and assists during discovery sessions
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {aiSettings.map((setting) => (
            <div key={setting.id} className="px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-2 bg-[#009A4D]/10 rounded-lg">
                    <setting.icon className="w-5 h-5 text-[#009A4D]" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      {setting.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Switch id={setting.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Language Model</h3>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                AI Model
              </label>
              <select
                id="model"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#009A4D] focus:border-[#009A4D] rounded-md"
              >
                <option>GPT-4 (Recommended)</option>
                <option>GPT-3.5 Turbo</option>
                <option>Custom Model</option>
              </select>
            </div>

            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                Temperature (Creativity)
              </label>
              <input
                type="range"
                id="temperature"
                min="0"
                max="100"
                defaultValue="70"
                className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}