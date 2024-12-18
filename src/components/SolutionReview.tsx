import React from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare } from 'lucide-react';

export const SolutionReview: React.FC = () => {
  const { aiSummary } = useDiscoveryStore((state) => ({
    aiSummary: state.discovery.aiSummary,
  }));

  return (
    <div className="space-y-8">
      {/* Current State and Future State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Current State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Barrier Themes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Barrier Themes</h4>
              <ul className="space-y-2">
                {aiSummary.currentState.barrierThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Impact */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact</h4>
              <ul className="space-y-2">
                {aiSummary.currentState.emotionalThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financial Risk Statement */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Risk & Urgency</h4>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-gray-700">{aiSummary.currentState.urgencyStatement}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Desired Future State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Outcome Themes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Outcome Themes</h4>
              <ul className="space-y-2">
                {aiSummary.futureState.outcomeThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Impact */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact</h4>
              <ul className="space-y-2">
                {aiSummary.futureState.emotionalImpactThemes.map((theme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financial Impact Statement */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Impact</h4>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-gray-700">{aiSummary.futureState.financialImpactStatement}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bridge the Gap Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            How we Bridge the Gap from Current State to Future State
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            {aiSummary.solution?.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            How we Helped other Clients in Situations Similar to Yours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiSummary.solution?.testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="flex gap-4 bg-green-50 p-4 rounded-lg border border-green-100"
              >
                <MessageSquare className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="text-gray-700 whitespace-pre-line">{testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};