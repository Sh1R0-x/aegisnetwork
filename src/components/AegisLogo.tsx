import React from 'react';

export const AegisLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Stylized 'A' with integrated fiber lines */}
    <path 
      d="M15 85L50 15L85 85" 
      stroke="url(#logoGradient)" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#glow)"
    />
    <path 
      d="M35 85H65" 
      stroke="url(#logoGradient)" 
      strokeWidth="12" 
      strokeLinecap="round"
      filter="url(#glow)"
    />
    {/* Dynamic fiber nodes */}
    <circle cx="85" cy="15" r="4" fill="#60a5fa" className="animate-pulse" />
    <circle cx="95" cy="30" r="3" fill="#60a5fa" opacity="0.6" />
    <circle cx="75" cy="5" r="3" fill="#7c3aed" opacity="0.8" />
    
    <path d="M65 35L85 15" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);
