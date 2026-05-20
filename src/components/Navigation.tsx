
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
  onOpenWindow: (id: any) => void;
  folders: any[];
}

export default function Navigation({ 
  openWindows, 
  minimizedWindows, 
  onRestore, 
  activeWindow,
  onOpenWindow,
  folders
}: NavigationProps) {
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
    const folder = folders.find(f => f.id === id);
    return folder ? folder.name : id;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[110] bg-black/90 backdrop-blur-xl border-b border-white/10 h-10 flex items-center px-4 overflow-hidden">
      <div className="flex items-center gap-4 lg:gap-8 w-full">
        
        {/* OS Logo & Branding */}
        <div className="flex items-center gap-2 shrink-0">
          <TerminalIcon className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] text-white whitespace-nowrap">
            AFRIZAL.OS <span className="text-primary opacity-50 hidden sm:inline">v4.0.2</span>
          </span>
        </div>

        <div className="h-4 w-px bg-white/10 hidden lg:block" />

        {/* Quick Launch Menu (from Sidebar) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0 bg-white/5 px-4 py-1 rounded-full border border-white/10">
          {folders.map((folder) => (
            <button
              key={`nav-${folder.id}`}
              onClick={() => onOpenWindow(folder.id)}
              className="group flex items-center gap-2 hover:bg-white/5 rounded px-2 transition-all"
            >
              <folder.icon className={cn("w-3 h-3", folder.color, "group-hover:scale-110 transition-transform")} />
              <span className="text-[8px] font-mono font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                {folder.name.split('.')[0]}
              </span>
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-white/10 hidden lg:block" />

        {/* Window Taskbar List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 px-2">
          <AnimatePresence>
            {openWindows.map((winId) => (
              <motion.button
                key={winId}
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                onClick={() => onRestore(winId)}
                className={cn(
                  "px-3 py-1 rounded text-[9px] font-mono border transition-all flex items-center gap-2 shrink-0",
                  activeWindow === winId && !minimizedWindows.includes(winId)
                    ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                    : minimizedWindows.includes(winId)
                      ? "bg-white/5 border-white/10 text-white/30 italic opacity-60"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                )}
              >
                <Layout className="w-3 h-3" />
                <span className="truncate max-w-[80px] lg:max-w-none">{getFolderName(winId)}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* System Tray */}
        <div className="ml-auto flex items-center gap-3 lg:gap-4 text-muted-foreground text-[10px] font-mono shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <Cpu className="w-3 h-3 text-accent" />
            <span className="text-[9px] font-bold">5.2GHz</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-primary" />
            <Battery className="w-3.5 h-3.5 text-secondary hidden sm:block" />
          </div>
          <div className="flex items-center gap-2 pl-3 lg:pl-4 border-l border-white/10">
            <Clock className="w-3 h-3 opacity-50" />
            <span className="text-white font-bold tracking-tighter w-[65px]">{time}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
