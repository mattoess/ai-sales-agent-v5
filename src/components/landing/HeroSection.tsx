import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';

export function HeroSection() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/discovery');
    }
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-techcxo-navy mb-6">
              Transform Your Sales Discovery with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Unlock deeper customer insights and close deals faster with our AI-powered sales discovery assistant.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-3 bg-techcxo-green text-white rounded-lg hover:bg-techcxo-green/90 flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-3 text-techcxo-navy flex items-center hover:bg-gray-50 rounded-lg">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video bg-gray-100 rounded-xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800"
                alt="AI Sales Assistant Demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-techcxo-navy/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}