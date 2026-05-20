
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, elegant movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // 3D Perspective Transforms for the whole scene
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);
  const translateX = useTransform(smoothX, [-500, 500], [20, -20]);
  const translateY = useTransform(smoothY, [-500, 500], [20, -20]);

  // Dynamic light source following mouse
  const lightX = useTransform(smoothX, (v) => v + (typeof window !== 'undefined' ? window.innerWidth / 2 : 0));
  const lightY = useTransform(smoothY, (v) => v + (typeof window !== 'undefined' ? window.innerHeight / 2 : 0));

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate Neural Network Data with 3D Depth
  const neurons = useMemo(() => {
    return [...Array(45)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      depth: 0.2 + Math.random() * 1.5, // Used for parallax speed
      opacity: 0.1 + Math.random() * 0.4,
      duration: 5 + Math.random() * 10,
    }));
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020203] z-[-2]" />;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#020203] perspective-1000">
      
      {/* 1. Interactive 3D Neuron Layer */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          scale: 1.05 
        }}
        className="absolute inset-0 z-10 origin-center"
      >
        <svg className="w-full h-full">
          <defs>
            <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Parallax Lines (Synapses) */}
          {neurons.slice(0, 30).map((n, i) => {
            const next = neurons[(i + 1) % neurons.length];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${n.x}%`}
                y1={`${n.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="hsl(var(--primary))"
                strokeWidth={0.5 * n.depth}
                style={{ opacity: n.opacity * 0.5 }}
                animate={{ 
                  opacity: [n.opacity * 0.3, n.opacity * 0.6, n.opacity * 0.3],
                  strokeWidth: [0.5 * n.depth, 1 * n.depth, 0.5 * n.depth]
                }}
                transition={{ duration: n.duration, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}

          {/* Floating Neuron Nodes */}
          {neurons.map((n) => (
            <motion.circle
              key={n.id}
              cx={`${n.x}%`}
              cy={`${n.y}%`}
              r={n.size * n.depth}
              fill="url(#neuronGlow)"
              style={{ opacity: n.opacity }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [n.opacity, n.opacity * 2, n.opacity] 
              }}
              transition={{ duration: n.duration / 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* 2. Central 3D AI Core Object */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Pulsing Core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full"
          />
          
          {/* Rotating Rings (3D Effect) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute border border-primary/20 rounded-full"
              style={{ 
                width: 300 + i * 100, 
                height: 300 + i * 100,
                rotateX: 60 + i * 10,
                rotateY: 20 * i
              }}
            >
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary shadow-[0_0_10px_hsl(var(--primary))] rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3. Floating Digital Code Streams */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: "-20%" }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * -20 
            }}
            className="absolute w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* 4. Mouse Dynamic Light Focus */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/[0.03] rounded-full blur-[120px] z-30 pointer-events-none mix-blend-screen"
      />

      {/* 5. CRT Overlay Effects */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full crt-effect opacity-5" />
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Background Grid (Static Base) */}
      <div className="absolute inset-0 z-0 opacity-20 bg-grid-3d" />
    </div>
  );
}
