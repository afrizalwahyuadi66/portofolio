
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Wifi, Battery, Clock, Terminal as TerminalIcon, Layout, ChevronRight, Power, Settings, Search } from 'lucide-react';
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
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartMenuOpen(false);
      }
    };
    if (isStartMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartMenuOpen]);

  const getFolderName = (id: string) => {
    const folder = folders.find(f => f.id === id);
    return folder ? folder.name : id;
  };

  const toggleStartMenu = () => setIsStartMenuOpen(!isStartMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-black/90 backdrop-blur-xl border-b border-white/10 h-10 flex items-center px-4 overflow-hidden">
        <div className="flex items-center gap-4 lg:gap-8 w-full h-full">
          
          {/* OS Logo & Start Button (Inspired by Windows) */}
          <button 
            onClick={toggleStartMenu}
            className={cn(
              "flex items-center gap-2 shrink-0 px-3 h-full transition-all group",
              isStartMenuOpen ? "bg-primary/20 border-x border-primary/20" : "hover:bg-white/5"
            )}
          >
            <div className="relative">
              <TerminalIcon className={cn(
                "w-4 h-4 transition-all duration-300",
                isStartMenuOpen ? "text-primary scale-110 rotate-12" : "text-primary/70 group-hover:text-primary"
              )} />
              {isStartMenuOpen && (
                <motion.div 
                  layoutId="startGlow"
                  className="absolute inset-0 bg-primary/40 blur-md rounded-full -z-10"
                />
              )}
            </div>
            <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] text-white whitespace-nowrap">
              AFRIZAL.OS <span className="text-primary opacity-50 hidden sm:inline">v4.0.2</span>
            </span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          {/* Window Taskbar List */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 px-2 h-full py-1">
            <AnimatePresence>
              {openWindows.map((winId) => (
                <motion.button
                  key={winId}
                  initial={{ opacity: 0, scale: 0.9, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -10 }}
                  onClick={() => onRestore(winId)}
                  className={cn(
                    "px-3 py-1 rounded text-[9px] font-mono border transition-all flex items-center gap-2 shrink-0 h-full",
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
          <div className="ml-auto flex items-center gap-3 lg:gap-4 text-muted-foreground text-[10px] font-mono shrink-0 h-full">
            <div className="hidden md:flex items-center gap-1.5 px-2 h-full opacity-60">
              <Cpu className="w-3 h-3 text-accent" />
              <span className="text-[9px] font-bold">5.2GHz</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <Battery className="w-3.5 h-3.5 text-secondary hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 pl-3 lg:pl-4 border-l border-white/10 h-full">
              <Clock className="w-3 h-3 opacity-50" />
              <span className="text-white font-bold tracking-tighter w-[65px]">{time}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Start Menu Overlay (Inspired by Windows Start) */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <div className="fixed inset-0 z-[105] pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsStartMenuOpen(false)}
            />
            
            <motion.div
              ref={startMenuRef}
              initial={{ opacity: 0, scale: 0.95, y: -20, x: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 10 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, x: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="absolute top-12 left-0 w-[95vw] sm:w-[400px] h-[500px] bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Menu Header / Search */}
              <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search modules, logs, systems..." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-[11px] font-mono outline-none focus:border-primary/50 transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {/* Grid Area - The "Apps" */}
              <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50 px-2">Pinned Modules</div>
                <div className="grid grid-cols-3 gap-4">
                  {folders.map((folder) => (
                    <motion.button
                      key={folder.id}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onOpenWindow(folder.id);
                        setIsStartMenuOpen(false);
                      }}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl border border-transparent hover:border-white/10 transition-all group"
                    >
                      <div className={cn(
                        "p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all",
                        openWindows.includes(folder.id) && "ring-1 ring-primary/40"
                      )}>
                        <folder.icon className={cn("w-6 h-6", folder.color)} />
                      </div>
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white/60 group-hover:text-primary text-center">
                        {folder.name.split('.')[0]}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50 px-2">Recent Logs</div>
                  <div className="space-y-1">
                    {['kernel_boot.log', 'network_traffic.sys', 'auth_success.sh'].map((log, i) => (
                      <button key={i} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-3 group transition-all">
                        <TerminalIcon className="w-3 h-3 text-white/30 group-hover:text-primary" />
                        <span className="text-[10px] font-mono text-white/40 group-hover:text-white">{log}</span>
                        <ChevronRight className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-40" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-4 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                    <Settings className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-tighter">Cipher_Admin</div>
                    <div className="text-[8px] text-muted-foreground uppercase">Privilege: Level 7</div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsStartMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-all"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
