import React from 'react';

export function MainNav() {
  return (
    <nav className="hidden md:flex space-x-8">
      <a href="#features" className="text-gray-600 hover:text-techcxo-navy">Features</a>
      <a href="#use-cases" className="text-gray-600 hover:text-techcxo-navy">Use Cases</a>
      <a href="#pricing" className="text-gray-600 hover:text-techcxo-navy">Pricing</a>
      <a href="#about" className="text-gray-600 hover:text-techcxo-navy">About</a>
    </nav>
  );
}