
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // 3D Perspective Transforms for the scene
  const rotateX = useTransform(smoothY, [-500, 500], [7, -7]);
  const rotateY = useTransform(smoothX, [-500, 500], [-7, 7]);
  const translateX = useTransform(smoothX, [-500, 500], [25, -25]);
  const translateY = useTransform(smoothY, [-500, 500], [25, -25]);

  // Lighting transforms
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
    return [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      depth: 0.3 + Math.random() * 2, 
      opacity: 0.15 + Math.random() * 0.45,
      duration: 6 + Math.random() * 12,
    }));
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020203] z-[-2]" />;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#020203] perspective-1000">
      
      {/* 1. Base Wallpaper Layer with 3D Tilt */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          scale: 1.15
        }}
        className="absolute inset-0 z-0 origin-center opacity-40"
      >
        <Image 
          src={heroImage?.imageUrl || "https://picsum.photos/seed/cyber/1920/1080"} 
          alt="Cyber Background"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      {/* 2. Interactive 3D Neuron Layer */}
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
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Parallax Lines (Synapses) */}
          {neurons.slice(0, 35).map((n, i) => {
            const next = neurons[(i + 1) % neurons.length];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${n.x}%`}
                y1={`${n.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="hsl(var(--primary))"
                strokeWidth={0.8 * n.depth}
                style={{ opacity: n.opacity * 0.6 }}
                animate={{ 
                  opacity: [n.opacity * 0.4, n.opacity * 0.8, n.opacity * 0.4],
                  strokeWidth: [0.8 * n.depth, 1.5 * n.depth, 0.8 * n.depth]
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
                scale: [1, 1.3, 1],
                opacity: [n.opacity, n.opacity * 2, n.opacity] 
              }}
              transition={{ duration: n.duration / 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* 3. Central 3D AI Core Object */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full"
          />
          
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
              className="absolute border border-primary/30 rounded-full"
              style={{ 
                width: 350 + i * 120, 
                height: 350 + i * 120,
                rotateX: 65 + i * 15,
                rotateY: 25 * i
              }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary shadow-[0_0_15px_hsl(var(--primary))] rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 4. Mouse Dynamic Light Focus */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-primary/[0.05] rounded-full blur-[150px] z-30 pointer-events-none mix-blend-screen"
      />

      {/* 5. CRT Overlay Effects */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full crt-effect opacity-10" />
        <div className="w-full h-full bg-grid-3d opacity-20" />
      </div>
    </div>
  );
}
