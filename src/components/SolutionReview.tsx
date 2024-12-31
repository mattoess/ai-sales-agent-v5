import React from 'react';
import { useDiscoveryStore } from '../store/discoveryStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, ArrowRight, Check, Target, Shield } from 'lucide-react';

export const SolutionReview: React.FC = () => {
  // Extract AI summary and solution response from the discovery store
  const { aiSummary, solutionResponse } = useDiscoveryStore((state) => ({
    aiSummary: state.discovery.aiSummary,
    solutionResponse: state.discovery.solutionResponse,
  }));

  // Add diagnostic logging
  React.useEffect(() => {
    console.log('SolutionReview - solutionResponse:', solutionResponse);
    console.log('SolutionReview - aiSummary:', aiSummary);
  }, [solutionResponse, aiSummary]);
  
  return (
    <div className="space-y-8">
      {/* Current State and Future State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Current State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Barrier Themes Section */}
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

            {/* Personal Impact Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact (if barriers persist)</h4>
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

        {/* Future State Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Desired Future State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Outcome Themes Section */}
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

            {/* Personal Impact Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Impact (when barriers are gone)</h4>
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
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Impact (when success happens!)</h4>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-gray-700">{aiSummary.futureState.financialImpactStatement}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solution Overview Section */}
      {solutionResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Our Solution: Bridging the Gap from Current State to Future State
            </CardTitle>  
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Transformation Journey */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Your Transformation Journey</h3>
              
              {/* Current Situation */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h4 className="text-base font-medium text-gray-900 mb-3">Current Situation</h4>
                <p className="text-gray-700">
                  {solutionResponse.solution_description.transformation_journey.current_situation}
                </p>
                
                <h4 className="text-base font-medium text-gray-900 mt-4 mb-3">Key Challenges</h4>
                <div className="space-y-2">
                  {solutionResponse.solution_description.transformation_journey.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h4 className="text-base font-medium text-gray-900 mb-3">Future Vision</h4>
                <p className="text-gray-700">
                  {solutionResponse.solution_description.transformation_journey.vision}
                </p>
              </div>
            </div>

            {/* Solution Recommendation */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Our Recommended Solution</h3>
              
              {/* Overview */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-gray-700">
                  {solutionResponse.solution_description.solution_recommendation.overview}
                </p>
              </div>

              {/* Key Components */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solutionResponse.solution_description.solution_recommendation.key_components.map((component, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{component}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Approach Steps */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-base font-medium text-gray-900 mb-4">Implementation Approach</h4>
                <div className="space-y-4">
                  {solutionResponse.solution_description.solution_recommendation.approach.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

 {/* Value Proposition */}
 <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Value & Benefits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Business Outcomes */}
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                  <div className="flex items-start gap-3 mb-4">
                    <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <h4 className="text-base font-medium text-gray-900">Business Outcomes</h4>
                  </div>
                  <p className="text-gray-700">
                    {solutionResponse.solution_description.value_proposition.business_outcomes}
                  </p>
                </div>

                {/* Personal Benefits */}
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <div className="flex items-start gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <h4 className="text-base font-medium text-gray-900">Personal Benefits</h4>
                  </div>
                  <ul className="space-y-2">
                    {solutionResponse.solution_description.value_proposition.personal_benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Mitigation */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <h4 className="text-base font-medium text-gray-900">Risk Mitigation</h4>
                  </div>
                  <ul className="space-y-2">
                    {solutionResponse.solution_description.value_proposition.risk_mitigation.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Investment & Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pricing Model */}
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Pricing Structure</h4>
                  <p className="text-gray-700">
                    {solutionResponse.solution_description.investment_summary.pricing_model}
                  </p>
                </div>

                {/* ROI Analysis */}
                <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
                  <h4 className="text-base font-medium text-gray-900 mb-3">ROI Analysis</h4>
                  <p className="text-gray-700">
                    {solutionResponse.solution_description.investment_summary.roi_analysis}
                  </p>
                </div>

                {/* Timeline */}
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Implementation Timeline</h4>
                  <div className="space-y-2">
                    {solutionResponse.solution_description.investment_summary.timeline.map((phase, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Stories Section */}
      {solutionResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Success Stories: How We've Helped Others
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Case Study 1 */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Study 1</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Situation</h4>
                    <p className="text-gray-700">
                      {solutionResponse.testimonials.caseSituation1}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Solution</h4>
                    <div className="space-y-2">
                      {solutionResponse.testimonials.caseSolution1.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact & Results</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        {solutionResponse.testimonials.caseValue1.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Study 2</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Situation</h4>
                    <p className="text-gray-700">
                      {solutionResponse.testimonials.caseSituation2}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Solution</h4>
                    <div className="space-y-2">
                      {solutionResponse.testimonials.caseSolution2.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact & Results</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        {solutionResponse.testimonials.caseValue2.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
  );
};