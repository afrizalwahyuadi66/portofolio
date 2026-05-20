
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`terminal-window flex flex-col ${className}`}
    >
      <div className="terminal-header shrink-0">
        <div className="flex gap-2">
          <button onClick={onClose} className="dot dot-red flex items-center justify-center group">
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="dot dot-yellow flex items-center justify-center group">
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="dot dot-green flex items-center justify-center group">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="opacity-30">/root/sys/</span>{title}
        </div>
        <div className="flex items-center gap-2 opacity-40">
           <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           <span className="text-[8px] font-mono">LIVE</span>
        </div>
      </div>
      <div className="p-6 relative flex-1 overflow-hidden">
        {children}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/5 to-transparent opacity-20" />
      </div>
    </motion.div>
  );
}
