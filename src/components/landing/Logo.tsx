import React from 'react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <div className="h-10">
        <img 
          src="/techcxo-logo.png" 
          alt="TechCXO" 
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
}