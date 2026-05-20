
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import FloatingBackground from '@/components/FloatingBackground';
import LinuxWindow from '@/components/LinuxWindow';
import { Folder, User, Cpu, BarChart3, Briefcase, X } from 'lucide-react';

type WindowID = 'about' | 'skills' | 'experience' | 'projects' | 'hero' | null;

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<WindowID>(null);

  const folders = [
    { id: 'about', name: 'identity.sys', icon: User, color: 'text-primary' },
    { id: 'skills', name: 'capabilities.lib', icon: Cpu, color: 'text-secondary' },
    { id: 'experience', name: 'evolution.log', icon: BarChart3, color: 'text-accent' },
    { id: 'projects', name: 'projects.src', icon: Briefcase, color: 'text-blue-400' },
  ];

  return (
    <main className="relative h-screen overflow-hidden selection:bg-primary selection:text-white">
      <FloatingBackground />
      <Navigation />
      
      {/* Desktop Grid Area */}
      <div className="container mx-auto h-full pt-16 px-6 relative">
        
        {/* Desktop Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8 w-fit py-10">
          {folders.map((folder) => (
            <motion.button
              key={folder.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveWindow(folder.id as WindowID)}
              className="flex flex-col items-center gap-2 group w-24"
            >
              <div className={`p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-lg`}>
                <folder.icon className={`w-8 h-8 ${folder.color}`} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70 group-hover:text-primary transition-colors">
                {folder.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Hero is always visible in the background or as a starting point */}
        {!activeWindow && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <Hero onStart={() => setActiveWindow('about')} />
            </div>
          </div>
        )}

        {/* Windows Manager */}
        <AnimatePresence>
          {activeWindow && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-10 bg-black/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-5xl h-[80vh] relative"
              >
                <LinuxWindow 
                  title={folders.find(f => f.id === activeWindow)?.name || 'Terminal'} 
                  className="w-full h-full shadow-2xl border-primary/20 overflow-hidden flex flex-col"
                  onClose={() => setActiveWindow(null)}
                >
                  <div className="overflow-y-auto h-full pr-2 custom-scrollbar">
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

      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="glass px-4 py-2 rounded-full text-[10px] font-code text-accent uppercase tracking-widest flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-accent" />
          System: Stable // Mode: Interactive
        </div>
      </div>

      {/* Footer is part of contact or system status */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-black/80 border-t border-white/10 flex items-center px-6 justify-between text-[10px] font-mono text-muted-foreground z-50">
        <div>PATH: /home/user/{activeWindow || 'desktop'}</div>
        <div className="flex gap-4">
          <span>MEM: 1.2GB/16GB</span>
          <span className="text-primary">CPU: 12%</span>
        </div>
      </div>
    </main>
  );
}
