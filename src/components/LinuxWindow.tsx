"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface LinuxWindowProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  delay?: number;
  onClose?: () => void;
}

export default function LinuxWindow({ children, title, className, delay = 0, onClose }: LinuxWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20, rotateX: 5 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`terminal-window flex flex-col pointer-events-auto ${className}`}
    >
      <div className="terminal-header shrink-0">
        <div className="flex gap-2">
          <button 
            onClick={onClose} 
            className="dot dot-red group"
            title="Close Protocol"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity text-black/50" />
          </button>
          <div className="dot dot-yellow flex items-center justify-center">
            <Minus className="w-2 h-2 opacity-0 text-black/50" />
          </div>
          <div className="dot dot-green flex items-center justify-center">
            <Square className="w-2 h-2 opacity-0 text-black/50" />
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="opacity-30">/root/sys/</span>{title}
        </div>
        <div className="flex items-center gap-2 opacity-40">
           <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
           <span className="text-[7px] font-mono">ENCRYPTED_STREAM</span>
        </div>
      </div>
      <div className="p-8 relative flex-1 overflow-hidden custom-scrollbar">
        {children}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/[0.02] to-transparent opacity-20" />
      </div>
    </motion.div>
  );
}