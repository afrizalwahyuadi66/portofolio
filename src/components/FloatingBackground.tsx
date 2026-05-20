"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020203]">
      {/* 3D Animated Grid */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div 
          animate={{ 
            backgroundPositionY: ['0px', '40px'] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-grid-3d opacity-[0.15]" 
        />
      </div>
      
      {/* Dynamic Scan Line */}
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 shadow-[0_0_15px_rgba(0,255,255,0.5)] z-0"
      />

      {/* Floating Energy Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 100, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[150px]" 
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}