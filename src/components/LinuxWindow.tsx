
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinuxWindowProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  delay?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
  isActive?: boolean;
  onFocus?: () => void;
  style?: React.CSSProperties;
}

export default function LinuxWindow({ 
  children, 
  title, 
  className, 
  delay = 0, 
  onClose, 
  onMinimize,
  isMinimized,
  isActive,
  onFocus,
  style
}: LinuxWindowProps) {
  
  if (isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ opacity: 0, y: 30, scale: 0.9, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "terminal-window flex flex-col pointer-events-auto fixed",
        isActive ? "z-[100] shadow-[0_0_50px_rgba(0,255,255,0.2)] ring-1 ring-primary/20" : "z-[80] grayscale-[0.5] opacity-90",
        className
      )}
      style={{ 
        ...style, 
        minWidth: '300px', 
        minHeight: '200px',
        touchAction: 'none'
      }}
    >
      {/* Window Header - Interactive Drag Handle */}
      <div className="terminal-header shrink-0 cursor-grab active:cursor-grabbing h-10 lg:h-12">
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose?.(); }} 
            className="dot dot-red group"
            title="Close Protocol"
          >
            <X className="w-2 h-2 lg:w-3 lg:h-3 opacity-0 group-hover:opacity-100 transition-opacity text-black/50" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
            className="dot dot-yellow flex items-center justify-center group"
            title="Minimize to Header"
          >
            <Minus className="w-2 h-2 lg:w-3 lg:h-3 opacity-0 group-hover:opacity-100 transition-opacity text-black/50" />
          </button>
          <div className="dot dot-green flex items-center justify-center">
            <Square className="w-2 h-2 opacity-0 text-black/50" />
          </div>
        </div>
        
        <div className="text-[8px] lg:text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-4 lg:px-8 truncate max-w-[50%]">
          <span className="opacity-30 hidden sm:inline">/root/sys/</span>{title}
        </div>
        
        <div className="flex items-center gap-2 opacity-40">
           <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
           <span className="text-[7px] font-mono hidden sm:block">ENCRYPTED_STREAM</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 lg:p-8 relative flex-1 overflow-hidden bg-black/60 backdrop-blur-3xl">
        <div className="overflow-y-auto h-full pr-2 lg:pr-4 custom-scrollbar">
          {children}
        </div>
        {/* Subtle scanline overlay for content */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/[0.03] to-transparent opacity-20" />
      </div>

      {/* Resize Handle Decoration */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize opacity-40">
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-primary/40" />
      </div>
    </motion.div>
  );
}
