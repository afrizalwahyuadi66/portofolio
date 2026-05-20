
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 150 });

  // 3D Perspective Transforms
  const rotateX = useTransform(smoothY, [-500, 500], [7, -7]);
  const rotateY = useTransform(smoothX, [-500, 500], [-7, 7]);
  const translateX = useTransform(smoothX, [-500, 500], [30, -30]);
  const translateY = useTransform(smoothY, [-500, 500], [30, -30]);

  // Lighting source position
  const lightX = useTransform(mouseX, (v) => v + 400);
  const lightY = useTransform(mouseY, (v) => v + 400);

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

  // Generate Neural Network Data
  const neurons = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      depth: 0.5 + Math.random() * 2,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -20,
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
          scale: 1.1 
        }}
        className="absolute inset-0 z-10 origin-center"
      >
        <svg className="w-full h-full opacity-40">
          <defs>
            <radialGradient id="neuronGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Synapses (Lines) */}
          {neurons.map((n, i) => {
            const next = neurons[(i + 1) % neurons.length];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${n.x}%`}
                y1={`${n.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.05, 0.2, 0.05] }}
                transition={{ duration: n.duration, repeat: Infinity, ease: "linear" }}
              />
            );
          })}

          {/* Neuron Nodes */}
          {neurons.map((n) => (
            <motion.circle
              key={n.id}
              cx={`${n.x}%`}
              cy={`${n.y}%`}
              r={n.size}
              fill="url(#neuronGradient)"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: n.duration / 2, repeat: Infinity, delay: n.delay }}
            />
          ))}
        </svg>

        {/* Central AI Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
      </motion.div>

      {/* 2. Floating Code Stream Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: "-10%" }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * -20 
            }}
            className="absolute w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-primary/50 to-transparent"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* 3. Mouse Dynamic Light */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[200px] z-30 pointer-events-none mix-blend-screen opacity-50"
      />

      {/* 4. CRT Overlay Effect */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full crt-effect opacity-10" />
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>
    </div>
  );
}
