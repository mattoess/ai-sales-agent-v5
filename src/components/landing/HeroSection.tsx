import { ArrowRight, ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              Make Every Sales Rep Your Best Rep with AI-Powered Discovery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your entire sales team with AI that enhances discovery calls, 
              captures crucial insights, and consistently delivers winning proposals 
              for complex B2B solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-2 text-sm text-gray-600">
              <ChevronRight className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
              <ChevronRight className="w-4 h-4 text-green-600 ml-4" />
              <span>14-day free trial</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/api/placeholder/800/450"
              >
                <source src="/public/BestSalesAgentEver.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}