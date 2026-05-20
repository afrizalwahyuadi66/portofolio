"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Wifi, Battery, Clock, Terminal as TerminalIcon, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  openWindows: string[];
  minimizedWindows: string[];
  onRestore: (id: string) => void;
  activeWindow: string | null;
}

export default function Navigation({ openWindows, minimizedWindows, onRestore, activeWindow }: NavigationProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getFolderName = (id: string) => {
    const names: Record<string, string> = {
      about: 'identity.sys',
      skills: 'capabilities.lib',
      experience: 'evolution.log',
      projects: 'projects.src'
    };
    return names[id] || id;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/10 h-10 flex items-center px-4">
      <div className="flex items-center gap-6 w-full max-w-[100vw] mx-auto">
        {/* OS Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <TerminalIcon className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-white">AFRIZAL.OS <span className="text-primary opacity-50">v4.0.2</span></span>
        </div>

        {/* Window Taskbar List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar ml-4 flex-1">
          <AnimatePresence>
            {openWindows.map((winId) => (
              <motion.button
                key={winId}
                initial={{ opacity: 0, w: 0 }}
                animate={{ opacity: 1, w: 'auto' }}
                exit={{ opacity: 0, w: 0 }}
                onClick={() => onRestore(winId)}
                className={cn(
                  "px-3 py-1 rounded text-[9px] font-mono border transition-all flex items-center gap-2 shrink-0",
                  activeWindow === winId && !minimizedWindows.includes(winId)
                    ? "bg-primary/20 border-primary text-primary"
                    : minimizedWindows.includes(winId)
                      ? "bg-white/5 border-white/10 text-white/40 italic"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                )}
              >
                <Layout className="w-3 h-3" />
                {getFolderName(winId)}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* System Tray */}
        <div className="ml-auto flex items-center gap-4 text-muted-foreground text-[10px] font-mono shrink-0">
          <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <Cpu className="w-3 h-3 text-accent" />
            <span className="text-[9px]">5.2GHz</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3 text-green-500" />
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <Clock className="w-3 h-3" />
            <span className="text-white font-bold">{time}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}