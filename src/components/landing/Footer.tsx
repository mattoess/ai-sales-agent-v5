import React from 'react';
import { FooterSection } from './FooterSection';

const sections = {
  Product: ['Features', 'Pricing', 'Use Cases'],
  Company: ['About', 'Contact', 'Careers'],
  Resources: ['Blog', 'Documentation', 'Support'],
  Legal: ['Privacy', 'Terms', 'Security']
};

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(sections).map(([title, links]) => (
            <FooterSection key={title} title={title} links={links} />
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-center">
            © 2024 TechCXO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}