
"use client";

import React, { useEffect, useState } from 'react';

export default function FloatingBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float-particle ${particle.duration}s linear infinite`,
            opacity: Math.random() * 0.5,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float-particle {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, 50px); }
          50% { transform: translate(50px, 100px); }
          75% { transform: translate(-50px, 50px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>

      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
    </div>
  );
}
