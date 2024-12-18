import React from 'react';

interface IconProps {
  className?: string;
}

export function DropboxIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L12 6L6 10L0 6L6 2Z" fill="#0061FF"/>
      <path d="M18 2L24 6L18 10L12 6L18 2Z" fill="#0061FF"/>
      <path d="M12 10L18 14L12 18L6 14L12 10Z" fill="#0061FF"/>
      <path d="M12 20.236L18 16.236L12 12.236L6 16.236L12 20.236Z" fill="#0061FF"/>
    </svg>
  );
}