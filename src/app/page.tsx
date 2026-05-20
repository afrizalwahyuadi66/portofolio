
"use client";

import React, { useState } from 'react';
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
    setMinimizedWindows(prev => prev.filter(w => w !== id));
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

  return (
    <main className="relative h-screen overflow-hidden bg-[#020203]">
      <FloatingBackground />
      
      <Navigation 
        openWindows={openWindows} 
        minimizedWindows={minimizedWindows}
        onRestore={handleRestoreFromTaskbar}
        activeWindow={activeWindow}
      />
      
      <div className="container mx-auto h-full pt-16 relative flex items-center">
        
        {/* Desktop Sidebar Icons - Positioned Higher and more Compact */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-6 top-[42%] -translate-y-1/2 hidden md:grid grid-cols-1 gap-8 z-40 bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 shadow-2xl"
        >
          {folders.map((folder) => (
            <motion.button
              key={folder.id}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenWindow(folder.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-xl relative overflow-hidden",
                openWindows.includes(folder.id) && "border-primary/30 bg-primary/5"
              )}>
                <folder.icon className={`w-5 h-5 ${folder.color} relative z-10`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">
                {folder.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Hero Section / Login Terminal UI */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Hero onStart={() => handleOpenWindow('about')} />
        </div>

        {/* Dynamic Window Layer */}
        <div className="fixed inset-0 pointer-events-none z-50 pt-20 px-8 flex items-center justify-center">
          <AnimatePresence>
            {openWindows.map((winId, index) => (
              <LinuxWindow 
                key={winId}
                title={folders.find(f => f.id === winId)?.name || 'Terminal'} 
                className="w-full max-w-4xl h-[70vh]"
                onClose={() => handleCloseWindow(winId)}
                onMinimize={() => handleMinimizeWindow(winId)}
                isMinimized={minimizedWindows.includes(winId)}
                isActive={activeWindow === winId}
                onFocus={() => setActiveWindow(winId)}
                style={{ 
                  zIndex: activeWindow === winId ? 60 : 50 + index,
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

      {/* OS System Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/95 border-t border-white/10 flex items-center px-6 justify-between text-[9px] font-mono text-muted-foreground z-[100] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full animate-pulse shadow-lg bg-primary shadow-primary/50" />
            <span className="font-bold tracking-widest uppercase">SYSTEM: ONLINE</span>
          </div>
          <div className="hidden sm:block opacity-50 uppercase tracking-tighter">
            PATH: {`/root/sys/${activeWindow || 'desktop'}`}
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex gap-4">
            <span className="flex gap-1">SWAP: <span className="text-white">0.0GB</span></span>
            <span className="flex gap-1">CPU_LOAD: <span className="text-secondary">02.8%</span></span>
          </div>
          <div className="text-[10px] text-white/40 tracking-[0.4em] font-black hidden lg:block">AFRIZAL_KERNEL_X64_LTS</div>
        </div>
      </div>
    </main>
  );
}
