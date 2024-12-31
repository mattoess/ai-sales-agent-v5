// src/components/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="/techcxo-logo.svg"
      alt="TechCXO Logo"
      className={className}
    />
  );
};