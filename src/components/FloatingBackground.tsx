
"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  // Mouse tracking for high-fidelity parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for professional "weighty" feel
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Dynamic transforms for 3D elements
  const bgX = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const bgY = useTransform(smoothMouseY, [-500, 500], [20, -20]);
  const bgRotateX = useTransform(smoothMouseY, [-500, 500], [5, -5]);
  const bgRotateY = useTransform(smoothMouseX, [-500, 500], [-5, 5]);

  const gridTiltX = useTransform(smoothMouseY, [-500, 500], [65, 55]);
  const gridTiltY = useTransform(smoothMouseX, [-500, 500], [-10, 10]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate tech particles
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#020203]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020203] perspective-1000">
      
      {/* 1. Base Wallpaper Layer with 3D Parallax */}
      <motion.div 
        style={{ 
          x: bgX, 
          y: bgY, 
          rotateX: bgRotateX, 
          rotateY: bgRotateY,
          scale: 1.1
        }}
        className="absolute inset-0 z-0 opacity-40 grayscale"
      >
        <Image 
          src={heroBg?.imageUrl || "https://picsum.photos/seed/cyber1/1920/1080"}
          alt="Hacker Wallpaper"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay to keep UI readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020203]/80 via-transparent to-[#020203]/90" />
      </motion.div>

      {/* 2. 3D Perspective Grid Floor */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ 
            rotateX: gridTiltX,
            rotateY: gridTiltY,
          }}
          className="w-[200vw] h-[200vh] origin-center"
        >
          <div className="w-full h-full bg-grid-3d opacity-20" />
        </motion.div>
      </div>

      {/* 3. Interactive Mouse Light Source */}
      <motion.div 
        style={{ 
          x: useTransform(mouseX, (v) => v + window.innerWidth / 2 - 400),
          y: useTransform(mouseY, (v) => v + window.innerHeight / 2 - 400),
        }}
        className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] z-20 pointer-events-none opacity-60 mix-blend-screen"
      />

      {/* 4. Vertical Floating Data Streams */}
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
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          style={{ 
            left: p.left, 
            height: Math.random() * 200 + 100,
            zIndex: 15
          }}
        />
      ))}

      {/* 5. CRT Scanline & Grain Overlays */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="w-full h-full crt-effect opacity-10" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,3,0.9)_100%)] pointer-events-none" />
    </div>
  );
}
