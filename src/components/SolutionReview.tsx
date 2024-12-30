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

  // Utility function to remove HTML tags from strings
  // This helps clean up HTML-formatted content for plain text display
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

   // Add diagnostic logging
   React.useEffect(() => {
    console.log('SolutionReview - solutionResponse:', solutionResponse);
    console.log('SolutionReview - aiSummary:', aiSummary);
    
    // Detailed logging of solutionResponse structure
    if (solutionResponse) {
      console.log('Solution Description Keys:', Object.keys(solutionResponse.solution_description || {}));
      console.log('Testimonials Keys:', Object.keys(solutionResponse.testimonials || {}));
    }
  }, [solutionResponse, aiSummary]);
  
  return (
    <div className="space-y-8">
      {/* Current State and Future State Cards */}
      {/* This section provides a comprehensive overview of the current situation and desired future state */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State Card */}
        {/* Displays insights about the prospect's existing challenges and emotional state */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Current State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Barrier Themes Section */}
            {/* Highlights key obstacles identified during the discovery process */}
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
            {/* Explores the emotional dimensions of the current challenges */}
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
            {/* Provides context about the financial urgency of addressing current challenges */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Risk & Urgency</h4>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-gray-700">{aiSummary.currentState.urgencyStatement}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future State Card */}
        {/* Outlines the prospect's desired outcomes and potential improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Desired Future State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Outcome Themes Section */}
            {/* Highlights key objectives and desired results */}
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
            {/* Explores the emotional benefits of achieving desired outcomes */}
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
            {/* Provides context about the potential financial improvements */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Impact</h4>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-gray-700">{aiSummary.futureState.financialImpactStatement}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      

      {/* Solution Overview Section */}
      {/* Rendered only when a solution response is available */}
      {solutionResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Our Solution: Bridging the Gap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overview */}
            {/* Provides a high-level summary of the proposed solution */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="text-gray-700">
                {stripHtml(solutionResponse.solution_description?.solution_recommendation?.overview || '')}
              </p>
            </div>

            {/* Key Components */}
            {/* Breaks down the critical elements of the solution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {solutionResponse.solution_description?.solution_recommendation?.key_components
                ?.match(/<li[^>]*>(.*?)<\/li>/g)
                ?.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">
                        {stripHtml(item)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Approach Steps */}
            {/* Outlines the detailed implementation strategy */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Approach</h3>
              <div className="space-y-4">
                {solutionResponse.solution_description?.solution_recommendation?.approach
                  ?.match(/<p class='step-text'>(.*?)<\/p>/g)
                  ?.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 pt-1">
                        {stripHtml(step).replace(/^\d+\.\s*/, '')}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Value Proposition */}
            {/* Highlights the business and risk mitigation aspects of the solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Impact */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <div className="flex items-start gap-3 mb-4">
                  <Target className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900">Business Impact</h3>
                </div>
                <p className="text-gray-700">
                  {stripHtml(solutionResponse.solution_description?.value_proposition?.business_outcomes || '')}
                </p>
              </div>

              {/* Risk Mitigation */}
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900">Risk Mitigation</h3>
                </div>
                <ul className="space-y-2">
                  {solutionResponse.solution_description?.value_proposition?.risk_mitigation
                    ?.match(/<li[^>]*>(.*?)<\/li>/g)
                    ?.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{stripHtml(item)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Stories Section */}
      {/* Rendered only when a solution response is available */}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shaw Industries Case Study</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Situation</h4>
                    <p className="text-gray-700">
                      {stripHtml(solutionResponse.testimonials?.caseSituation1 || '')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Our Solution</h4>
                    <div className="space-y-2">
                      {solutionResponse.testimonials?.caseSolution1
                        ?.match(/<li[^>]*>(.*?)<\/li>/g)
                        ?.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{stripHtml(item)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact & Results</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        {solutionResponse.testimonials?.caseValue1
                          ?.match(/<li[^>]*>(.*?)<\/li>/g)
                          ?.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <MessageSquare className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{stripHtml(item)}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nexstar Case Study</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Situation</h4>
                    <p className="text-gray-700">
                      {stripHtml(solutionResponse.testimonials?.caseSituation2 || '')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Our Solution</h4>
                    <div className="space-y-2">
                      {solutionResponse.testimonials?.caseSolution2
                        ?.match(/<li[^>]*>(.*?)<\/li>/g)
                        ?.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{stripHtml(item)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact & Results</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        {solutionResponse.testimonials?.caseValue2
                          ?.match(/<li[^>]*>(.*?)<\/li>/g)
                          ?.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <MessageSquare className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{stripHtml(item)}</span>
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