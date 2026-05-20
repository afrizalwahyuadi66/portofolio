
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, ChevronRight, Shield, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LinuxWindow from './LinuxWindow';

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
            Membangun arsitektur keamanan tingkat tinggi dengan presisi kernel. 
            Penetration Testing, Cloud Security, dan Custom Exploit Development.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="rounded-none bg-primary text-black font-bold hover:bg-primary/80 group">
              INITIATE_SESSION
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-none border-white/10 hover:bg-white/5 font-mono">
              VIEW_SOURCE_CODE
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-8 pt-8 border-t border-white/5"
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Encryption</span>
              <span className="text-sm font-mono">AES-256-GCM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Uptime</span>
              <span className="text-sm font-mono">99.998%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Protocol</span>
              <span className="text-sm font-mono">TLS 1.3</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: 3D Terminal Window */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="perspective-1000"
          >
            <LinuxWindow title="terminal.sh" className="w-full max-w-lg mx-auto shadow-primary/20 shadow-2xl">
              <div className="font-mono text-sm space-y-2">
                <div className="flex gap-2 text-green-500">
                  <span>[root@emergent-os ~]#</span>
                  <span className="text-white">whoami</span>
                </div>
                <div className="text-muted-foreground">synthweave_security_expert</div>
                
                <div className="flex gap-2 text-green-500 pt-4">
                  <span>[root@emergent-os ~]#</span>
                  <span className="text-white">./scan_vulnerabilities.sh</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-primary">TCP_SCAN</span>
                      <span className="text-green-500">COMPLETE</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-primary">UDP_SCAN</span>
                      <span className="text-green-500">COMPLETE</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-primary">OS_INTEL</span>
                      <span className="text-yellow-500">PENDING</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center border border-white/5 bg-white/5 rounded">
                    <Shield className="w-12 h-12 text-primary/50" />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-[10px] text-accent animate-pulse">
                  <Cpu className="w-3 h-3" />
                  ANALYZING CORE DUMP...
                </div>
              </div>
            </LinuxWindow>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
        </div>

      </div>
    </section>
  );
}
