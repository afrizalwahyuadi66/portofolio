
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import FloatingBackground from '@/components/FloatingBackground';
import LinuxWindow from '@/components/LinuxWindow';
import { User, Cpu, BarChart3, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

type WindowID = 'about' | 'skills' | 'experience' | 'projects';

export default function Home() {
  const [openWindows, setOpenWindows] = useState<WindowID[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowID[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowID | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const folders = [
    { id: 'about' as WindowID, name: 'identity.sys', icon: User, color: 'text-primary' },
    { id: 'skills' as WindowID, name: 'capabilities.lib', icon: Cpu, color: 'text-secondary' },
    { id: 'experience' as WindowID, name: 'evolution.log', icon: BarChart3, color: 'text-accent' },
    { id: 'projects' as WindowID, name: 'projects.src', icon: Briefcase, color: 'text-blue-400' },
  ];

  const handleOpenWindow = (id: WindowID) => {
    if (!openWindows.includes(id)) {
      setOpenWindows(prev => [...prev, id]);
    }
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    }
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: WindowID) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    minimizedWindows.includes(id) && setMinimizedWindows(prev => prev.filter(w => w !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const handleMinimizeWindow = (id: WindowID) => {
    if (!minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => [...prev, id]);
    }
    setActiveWindow(null);
  };

  const handleRestoreFromTaskbar = (id: string) => {
    const winId = id as WindowID;
    if (minimizedWindows.includes(winId)) {
      setMinimizedWindows(prev => prev.filter(w => w !== winId));
    }
    setActiveWindow(winId);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <FloatingBackground />
      
      <Navigation 
        openWindows={openWindows} 
        minimizedWindows={minimizedWindows}
        onRestore={handleRestoreFromTaskbar}
        activeWindow={activeWindow}
        onOpenWindow={handleOpenWindow}
        folders={folders}
      />
      
      <div className="container mx-auto h-screen relative z-10 pointer-events-none">
        
        {/* Sidebar Navigasi - Presisi Kiri */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "fixed z-[60] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-500 flex pointer-events-auto",
            // Desktop: Locked Left Center
            "lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-6 lg:p-5 lg:rounded-[3rem] lg:w-auto",
            // Mobile: Bottom horizontal dock
            "left-4 right-4 bottom-14 flex-row justify-around gap-2 p-3 rounded-2xl lg:bottom-auto lg:right-auto"
          )}
        >
          {folders.map((folder) => (
            <motion.button
              key={folder.id}
              whileHover={{ scale: 1.15, x: isMobile ? 0 : 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenWindow(folder.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "p-3.5 lg:p-5 rounded-2xl lg:rounded-[2rem] bg-white/[0.03] border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all",
                openWindows.includes(folder.id) && !minimizedWindows.includes(folder.id) && "border-primary/40 bg-primary/5 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              )}>
                <folder.icon className={cn("w-6 h-6 lg:w-8 lg:h-8", folder.color)} />
              </div>
              <span className="text-[7px] lg:text-[9px] font-mono font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-primary transition-colors whitespace-nowrap">
                {folder.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Hero Section */}
        <div className="w-full h-full flex items-center justify-center lg:pl-32 px-6 pointer-events-none">
          <Hero onStart={() => handleOpenWindow('about')} />
        </div>

        {/* Window Layer */}
        <div className="fixed inset-0 pointer-events-none z-[70]">
          <AnimatePresence>
            {openWindows.map((winId, index) => (
              <LinuxWindow 
                key={winId}
                title={folders.find(f => f.id === winId)?.name || 'Terminal'} 
                className={cn(
                  "w-[95vw] lg:w-full lg:max-w-5xl h-[65vh] lg:h-[75vh]",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
                onClose={() => handleCloseWindow(winId)}
                onMinimize={() => handleMinimizeWindow(winId)}
                isMinimized={minimizedWindows.includes(winId)}
                isActive={activeWindow === winId}
                onFocus={() => setActiveWindow(winId)}
                style={{ 
                  zIndex: activeWindow === winId ? 100 : 80 + index,
                }}
              >
                {winId === 'about' && <About />}
                {winId === 'skills' && <Skills />}
                {winId === 'experience' && <Experience />}
                {winId === 'projects' && <Projects />}
              </LinuxWindow>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* System Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/90 border-t border-white/10 flex items-center px-4 lg:px-6 justify-between text-[8px] lg:text-[9px] font-mono text-muted-foreground z-[100] backdrop-blur-md">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-bold tracking-widest uppercase">KERNEL_STATUS: ACTIVE</span>
          </div>
          <div className="hidden sm:block opacity-40 uppercase tracking-widest truncate max-w-[150px]">
            PATH: {`/root/sys/${activeWindow || 'desktop'}`}
          </div>
        </div>
        
        <div className="flex gap-4 lg:gap-8 items-center">
          <div className="flex gap-3 lg:gap-4 opacity-70">
            <span className="flex gap-1">MEM: <span className="text-white">12%</span></span>
            <span className="flex gap-1">CPU: <span className="text-secondary">04.1%</span></span>
          </div>
          <div className="text-[10px] text-white/40 tracking-[0.2em] font-black hidden lg:block uppercase">Afrizal OS v4.0.2</div>
        </div>
      </div>
    </main>
  );
}
