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
import { Folder, User, Cpu, BarChart3, Briefcase } from 'lucide-react';

type WindowID = 'about' | 'skills' | 'experience' | 'projects' | null;

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<WindowID>(null);

  const folders = [
    { id: 'about', name: 'identity.sys', icon: User, color: 'text-primary' },
    { id: 'skills', name: 'capabilities.lib', icon: Cpu, color: 'text-secondary' },
    { id: 'experience', name: 'evolution.log', icon: BarChart3, color: 'text-accent' },
    { id: 'projects', name: 'projects.src', icon: Briefcase, color: 'text-blue-400' },
  ];

  return (
    <main className="relative h-screen overflow-hidden bg-[#020203]">
      <FloatingBackground />
      <Navigation />
      
      <div className="container mx-auto h-full pt-16 relative flex items-center">
        
        {/* Desktop Sidebar Icons - Fixed and Z-indexed to be always accessible but not overlapping */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:grid grid-cols-1 gap-12 z-40 bg-black/20 backdrop-blur-md p-4 rounded-3xl border border-white/5">
          {folders.map((folder) => (
            <motion.button
              key={folder.id}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveWindow(folder.id as WindowID)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-xl relative overflow-hidden`}>
                <folder.icon className={`w-6 h-6 ${folder.color} relative z-10`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">
                {folder.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Hero Section */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!activeWindow && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Hero onStart={() => setActiveWindow('about')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Windows Manager */}
        <AnimatePresence>
          {activeWindow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 lg:p-24 bg-black/80 backdrop-blur-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-6xl h-full relative"
              >
                <LinuxWindow 
                  title={folders.find(f => f.id === activeWindow)?.name || 'Terminal'} 
                  className="w-full h-full border-primary/20 shadow-[0_0_50px_rgba(0,255,255,0.1)]"
                  onClose={() => setActiveWindow(null)}
                >
                  <div className="overflow-y-auto h-full pr-4 custom-scrollbar perspective-1000">
                    {activeWindow === 'about' && <About />}
                    {activeWindow === 'skills' && <Skills />}
                    {activeWindow === 'experience' && <Experience />}
                    {activeWindow === 'projects' && <Projects />}
                  </div>
                </LinuxWindow>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* OS System Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/95 border-t border-white/10 flex items-center px-6 justify-between text-[9px] font-mono text-muted-foreground z-[60] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
            <span className="font-bold tracking-widest">SYSTEM: READY</span>
          </div>
          <div className="hidden sm:block opacity-50 uppercase tracking-tighter">
            PATH: /root/sys/{activeWindow || 'desktop'}
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex gap-4">
            <span className="flex gap-1">MEM: <span className="text-white">1.2GB</span></span>
            <span className="flex gap-1">CPU: <span className="text-secondary">04.1%</span></span>
          </div>
          <div className="text-[10px] text-white/40 tracking-[0.4em] font-black hidden lg:block">EMERGENT_KERNEL_4.0_LTS</div>
        </div>
      </div>
      
      {/* Mobile Folder Dock */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 md:hidden flex gap-4 p-2 glass rounded-full border border-white/10 shadow-2xl">
         {folders.map((folder) => (
           <button 
             key={folder.id} 
             onClick={() => setActiveWindow(folder.id as WindowID)}
             className={`p-3 rounded-full ${folder.color} bg-white/5 border border-white/10 active:scale-90 transition-transform`}
           >
             <folder.icon className="w-5 h-5" />
           </button>
         ))}
      </div>
    </main>
  );
}