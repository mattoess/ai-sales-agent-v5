// import React from 'react';
import { Quote } from 'lucide-react';

const stories = [
  {
    company: "TechScale Solutions",
    industry: "Enterprise Software",
    quote: "Our new reps are now performing at the same level as 5-year veterans within weeks. Deal velocity increased by 40% and our average contract value is up 65%.",
    author: "Sarah Chen",
    title: "VP of Sales",
    metrics: [
      { label: "Increase in Deal Size", value: "65%" },
      { label: "Faster Sales Cycle", value: "40%" },
      { label: "Rep Ramp-up Time", value: "-75%" }
    ]
  },
  {
    company: "CloudServe Pro",
    industry: "Cloud Services",
    quote: "The AI's ability to match our complex solution portfolio to customer needs in real-time has transformed our discovery calls. Our conversion rate from discovery to proposal has doubled.",
    author: "Michael Torres",
    title: "Chief Revenue Officer",
    metrics: [
      { label: "Discovery Conversion", value: "2x" },
      { label: "Revenue Per Rep", value: "+85%" },
      { label: "Win Rate", value: "+45%" }
    ]
  }
];

export function SuccessStories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Transform Your Sales Team's Performance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how leading B2B companies are using AI to elevate their entire sales organization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {stories.map((story) => (
            <div key={story.company} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="w-8 h-8 text-green-600 flex-shrink-0" />
                <p className="text-lg text-gray-600 italic">{story.quote}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="mb-6">
                  <p className="font-semibold text-blue-900">{story.author}</p>
                  <p className="text-gray-600">{story.title}</p>
                  <p className="text-sm text-gray-500">{story.company} • {story.industry}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {story.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="text-2xl font-bold text-green-600">{metric.value}</p>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;