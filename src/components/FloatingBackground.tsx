
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  // 1. Initialize Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Create smooth springs for organic movement
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3. Define all transforms AT THE TOP LEVEL (Rules of Hooks)
  // These must be defined before any conditional return
  const bgX = useTransform(smoothMouseX, [-1000, 1000], [40, -40]);
  const bgY = useTransform(smoothMouseY, [-1000, 1000], [40, -40]);
  const bgRotateX = useTransform(smoothMouseY, [-1000, 1000], [10, -10]);
  const bgRotateY = useTransform(smoothMouseX, [-1000, 1000], [-10, 10]);

  const gridTiltX = useTransform(smoothMouseY, [-1000, 1000], [65, 55]);
  const gridTiltY = useTransform(smoothMouseX, [-1000, 1000], [-10, 10]);

  const lightX = useTransform(mouseX, (v) => v + windowSize.width / 2 - 400);
  const lightY = useTransform(mouseY, (v) => v + windowSize.height / 2 - 400);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleMouseMove = (e: MouseEvent) => {
        // Calculate relative mouse position from center
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      // Generate tech particles for depth
      const newParticles = [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * -20,
      }));
      setParticles(newParticles);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [mouseX, mouseY]);

  // Conditional return must be AFTER all hook declarations
  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#020203]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020203] perspective-1000">
      
      {/* 1. Interactive 3D Wallpaper Layer */}
      <motion.div 
        style={{ 
          x: bgX, 
          y: bgY, 
          rotateX: bgRotateX, 
          rotateY: bgRotateY,
          scale: 1.2 // Scale up slightly to avoid seeing edges during movement
        }}
        className="absolute inset-0 z-0 transition-all duration-700"
      >
        <Image 
          src={heroBg?.imageUrl || "https://picsum.photos/seed/cyber1/1920/1080"}
          alt="Cyber Background"
          fill
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          data-ai-hint="cyber security"
        />
        {/* Deep industrial vignette to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020203]/90 via-transparent to-[#020203]/95" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 2. 3D Perspective Grid Floor */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ 
            rotateX: gridTiltX,
            rotateY: gridTiltY,
          }}
          className="w-[200vw] h-[200vh] origin-center opacity-30"
        >
          <div className="w-full h-full bg-grid-3d" />
        </motion.div>
      </div>

      {/* 3. Dynamic Mouse Light Source (Interactive Glow) */}
      <motion.div 
        style={{ x: lightX, y: lightY }}
        className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] z-20 opacity-40 mix-blend-screen pointer-events-none"
      />

      {/* 4. Floating Vertical Data Streams */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, p.opacity, 0] }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{ left: p.left, height: 300, zIndex: 15 }}
        />
      ))}

      {/* 5. CRT System Overlays (Noise & Scanlines) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="w-full h-full crt-effect opacity-20" />
      </div>

      {/* Final ambient shadow layer for contrast */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
