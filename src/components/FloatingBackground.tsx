"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particle data only on the client
    const newParticles = [...Array(5)].map((_, i) => ({
      id: i,
      xInitial: Math.random() * 100 + "%",
      xAnimate: (Math.random() * 100 - 50) + "%",
      duration: Math.random() * 10 + 5,
      delay: i * 2,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#020203]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020203]">
      {/* 3D Animated Grid */}
      <div className="absolute inset-0 perspective-1000 origin-center scale-150">
        <motion.div 
          animate={{ 
            backgroundPositionY: ['0px', '50px'],
            rotateX: [20, 25, 20]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-grid-3d opacity-[0.1] border-t border-primary/20" 
        />
      </div>
      
      {/* Scan Line Animation */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_20px_rgba(0,255,255,0.4)] z-10"
      />

      {/* Floating High-Tech Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: p.xInitial, y: "100%" }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: "-10%",
            x: p.xAnimate 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute w-px h-20 bg-gradient-to-t from-primary/0 via-primary/40 to-primary/0"
        />
      ))}

      {/* Ambient Glow Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" 
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}