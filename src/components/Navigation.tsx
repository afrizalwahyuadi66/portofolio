"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, Clock, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Core', href: '#about' },
  { name: 'Services', href: '#skills' },
  { name: 'Ops', href: '#projects' },
  { name: 'Comm', href: '#contact' },
];

export default function Navigation() {
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-10 flex items-center px-4">
      <div className="flex items-center gap-6 w-full max-w-7xl mx-auto">
        {/* OS Logo */}
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-white">EMERGENT.OS <span className="text-primary opacity-50">v4.0.2</span></span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="opacity-20 text-[8px]">0{navLinks.indexOf(link) + 1}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* System Tray */}
        <div className="ml-auto flex items-center gap-4 text-muted-foreground text-[10px] font-mono">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <Cpu className="w-3 h-3 text-accent" />
            <span className="text-[9px]">4.2GHz</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-primary" />
            <span className="hidden sm:inline">UP_GIGA</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3 text-green-500" />
            <span className="hidden sm:inline">100%</span>
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