import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Logo } from './Logo';
import { createCheckoutSession } from '../services/stripeService';

const plans = [
  {
    name: 'Basic',
    price: '$99',
    period: '/month',
    priceId: 'price_basic',
    features: [
      'Up to 10 discovery sessions per month',
      'Basic AI analysis',
      'Email support',
      'Basic reporting'
    ]
  },
  {
    name: 'Pro',
    price: '$199',
    period: '/month',
    priceId: 'price_pro',
    features: [
      'Up to 50 discovery sessions per month',
      'Advanced AI analysis',
      'Priority support',
      'Advanced reporting',
      'Custom templates'
    ]
  },
  {
    name: 'Enterprise',
    price: '$499',
    period: '/month',
    priceId: 'price_enterprise',
    features: [
      'Unlimited discovery sessions',
      'Premium AI analysis',
      'Dedicated support',
      'Custom reporting',
      'Custom templates',
      'API access'
    ]
  }
];

export const Pricing: React.FC = () => {
  const { user } = useUser();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      window.location.href = '/sign-in';
      return;
    }

    try {
      const session = await createCheckoutSession(priceId, user.id);
      window.location.href = session.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-techcxo-navy mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the perfect plan for your sales discovery needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-techcxo-navy mb-4">
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-techcxo-green flex-shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                className="w-full button-primary"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};