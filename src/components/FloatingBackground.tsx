
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Transforms for the 3D Parallax effect
  // These must be at the top level
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);
  const translateX = useTransform(smoothX, [-500, 500], [20, -20]);
  const translateY = useTransform(smoothY, [-500, 500], [20, -20]);

  // Transform for the 3D Grid Floor perspective
  const floorRotateX = useTransform(smoothY, [-500, 500], [62, 58]);
  const floorRotateY = useTransform(smoothX, [-500, 500], [-2, 2]);

  // Interactive light source position
  const lightX = useTransform(mouseX, (v) => v + windowSize.width / 2 - 400);
  const lightY = useTransform(mouseY, (v) => v + windowSize.height / 2 - 400);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        mouseX.set(x);
        mouseY.set(y);
      };

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [mouseX, mouseY]);

  // Generate particles only once on mount
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * -20,
      duration: 15 + Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2
    }));
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020203] z-[-2]" />;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#020203] perspective-1000">
      
      {/* 1. Main 3D Wallpaper Layer */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          scale: 1.1 
        }}
        className="absolute inset-0 z-0 origin-center"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image 
          src={heroBg?.imageUrl || "https://picsum.photos/seed/cyber1/1920/1080"}
          alt="Cyber Wallpaper"
          fill
          className="object-cover opacity-80"
          priority
          data-ai-hint="cyber background"
        />
        {/* Vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20" />
      </motion.div>

      {/* 2. Perspective 3D Grid Floor */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div 
          style={{ 
            rotateX: floorRotateX,
            rotateY: floorRotateY,
          }}
          className="w-[200vw] h-[200vh] origin-center opacity-20"
        >
          <div className="w-full h-full bg-grid-3d" />
        </motion.div>
      </div>

      {/* 3. Interactive Mouse Light Source */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] z-30 pointer-events-none opacity-40 mix-blend-screen"
      />

      {/* 4. Falling Tech Streams */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%" }}
          animate={{ y: "-10%" }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          style={{ left: p.left, opacity: p.opacity, zIndex: 15 }}
        />
      ))}

      {/* 5. CRT System Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full crt-effect opacity-10" />
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>
    </div>
  );
}
