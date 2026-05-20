"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LinuxWindowProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  delay?: number;
}

export default function LinuxWindow({ children, title, className, delay = 0 }: LinuxWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`terminal-window ${className}`}
    >
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="opacity-50">/var/log/</span>{title}
        </div>
        <div className="w-12" />
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}