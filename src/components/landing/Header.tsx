import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Logo } from './Logo';
import { MainNav } from './MainNav';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Logo />
            <MainNav />
          </div>
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-techcxo-navy border border-techcxo-navy rounded-lg hover:bg-gray-50">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-techcxo-navy text-white rounded-lg hover:bg-techcxo-navy/90">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </header>
  );
}