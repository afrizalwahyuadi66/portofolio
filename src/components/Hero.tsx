
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Activity, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-6">
      <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: System Information */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded border border-primary/20 bg-primary/5 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-primary shadow-[0_0_20px_rgba(0,255,255,0.1)]"
          >
            <Activity className="w-4 h-4 animate-pulse" />
            System Status: Optimal // Core Protocol Loaded
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-none"
          >
            KERNEL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary glow-text">RE-IMAGINED</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl text-lg text-muted-foreground font-mono leading-relaxed"
          >
            