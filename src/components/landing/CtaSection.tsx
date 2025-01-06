// import React from 'react';
import { ArrowRight } from 'lucide-react';

function CtaSection() {
  return (
    <section className="py-20 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Sales Discovery?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join innovative teams already using our AI-powered platform to close deals faster
          </p>
          
          <button 
            onClick={() => console.log('Sign up clicked')}
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <p className="mt-4 text-gray-400">
            No credit card required · Free 14-day trial
          </p>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;