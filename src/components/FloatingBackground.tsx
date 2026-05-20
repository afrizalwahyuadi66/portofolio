
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // 3D Perspective Transforms
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

  // Generate Matrix Rain Characters
  const matrixRain = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Generate Circuit Nodes
  const circuitNodes = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
    }));
  }, []);

  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  if (!mounted) return <div className="fixed inset-0 bg-[#020203] z-[-2]" />;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#020203]">
      
      {/* 1. Cyberpunk City Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020203] via-[#0a0a1a] to-[#020203]" />
      
      {/* 2. Circuit Board Pattern */}
      <motion.div 
        style={{ rotateX, rotateY, x: translateX, y: translateY, scale: 1.1 }}
        className="absolute inset-0 opacity-15"
      >
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuitGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
              <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0.5" />
              <circle cx="60" cy="60" r="3" fill="hsl(var(--primary))" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitGrid)" />
          
          {/* Random Circuit Connections */}
          {circuitNodes.map((node, i) => {
            const next = circuitNodes[(i + 3) % circuitNodes.length];
            return (
              <motion.line
                key={`conn-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="hsl(var(--secondary))"
                strokeWidth="1"
                opacity="0.2"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}
          
          {/* Circuit Nodes */}
          {circuitNodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="hsl(var(--primary))"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </motion.div>

      {/* 3. Matrix Rain */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixRain.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute top-0 font-mono text-xs md:text-sm"
            style={{ left: `${drop.left}%`, opacity: drop.opacity }}
            initial={{ y: '-100vh' }}
            animate={{ y: '200vh' }}
            transition={{ duration: drop.duration, delay: drop.delay, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex flex-col items-center gap-0.5">
              {[...Array(15)].map((_, i) => (
                <span 
                  key={i} 
                  className={i === 0 ? 'text-white' : 'text-primary/70'}
                  style={{ opacity: 1 - (i * 0.06) }}
                >
                  {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[400px] h-[400px] bg-secondary/20 blur-[120px] rounded-full"
        />
      </div>

      {/* 5. Mouse Dynamic Light */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
      />

      {/* 6. CRT Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* 7. Glitch Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <motion.div 
          className="absolute inset-0 bg-primary/5"
          animate={{ x: [-2, 2, -2], opacity: [0, 0.05, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-secondary/5"
          animate={{ x: [2, -2, 2], opacity: [0, 0.05, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
        />
      </div>

    </div>
  );
}

