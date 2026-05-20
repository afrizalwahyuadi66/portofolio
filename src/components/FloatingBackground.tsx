"use client";

import React from 'react';

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="noise-overlay" />
      <div className="scanline" />
      
      {/* Dynamic Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Central Grid Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_70%)]" />
    </div>
  );
}