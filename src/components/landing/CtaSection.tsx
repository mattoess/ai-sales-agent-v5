import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SignUpButton } from '@clerk/clerk-react';

export function CtaSection() {
  return (
    <section className="py-20 bg-techcxo-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Sales Discovery?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join innovative teams already using our AI-powered platform to close deals faster
          </p>
          
          <SignUpButton mode="modal">
            <button className="inline-flex items-center px-8 py-3 bg-techcxo-green text-white rounded-lg hover:bg-techcxo-green/90">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </SignUpButton>
          
          <p className="mt-4 text-gray-400">
            No credit card required · Free 14-day trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}