
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform values for parallax layers
  const gridRotateX = useTransform(smoothMouseY, [-500, 500], [25, 15]);
  const gridRotateY = useTransform(smoothMouseX, [-500, 500], [-5, 5]);
  const blobX1 = useTransform(smoothMouseX, [-500, 500], [50, -50]);
  const blobY1 = useTransform(smoothMouseY, [-500, 500], [50, -50]);
  const blobX2 = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const blobY2 = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate particle data
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      xInitial: Math.random() * 100 + "%",
      xAnimate: (Math.random() * 10 - 5) + "%",
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      height: Math.random() * 100 + 50,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#020203]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020203]">
      {/* 3D Animated Grid Layer with Parallax */}
      <motion.div 
        style={{ 
          rotateX: gridRotateX,
          rotateY: gridRotateY,
        }}
        className="absolute inset-0 perspective-2000 origin-center scale-[1.6]"
      >
        <motion.div 
          animate={{ 
            backgroundPositionY: ['0px', '100px'],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-grid-3d opacity-[0.15] border-t border-primary/20" 
        />
      </motion.div>
      
      {/* Dynamic Scan Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_15px_rgba(0,255,255,0.3)] z-10 opacity-50"
      />

      {/* Floating High-Tech Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: p.xInitial, y: "110%" }}
          animate={{ 
            opacity: [0, p.opacity, 0],
            y: "-20%",
            x: `calc(${p.xInitial} + ${p.xAnimate})` 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute w-px bg-gradient-to-t from-primary/0 via-primary/60 to-primary/0"
          style={{ height: p.height }}
        />
      ))}

      {/* Interactive Ambient Glow Blobs */}
      <motion.div 
        style={{ x: blobX1, y: blobY1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[180px]" 
      />
      
      <motion.div 
        style={{ x: blobX2, y: blobY2 }}
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[180px]" 
      />

      {/* Vignette & Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.8)_100%)]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}
