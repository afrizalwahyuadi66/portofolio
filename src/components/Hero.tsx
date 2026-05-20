
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LinuxWindow from './LinuxWindow';

interface HeroProps {
  onStart?: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const [bootStatus, setBootStatus] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBootStatus(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center w-full max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/5 border border-primary/20 text-[10px] font-mono font-bold tracking-[0.4em] text-primary uppercase rounded-full backdrop-blur-md">
          <Activity className="w-3 h-3 animate-pulse" />
          SESSION: ANONYMOUS // KERNEL V4.0.2
        </div>
        
        <div className="space-y-8">
          <h1 className="text-7xl md:text-9xl font-headline font-black tracking-tighter leading-[0.8] text-white">
            CYBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">INTELLIGENCE</span>
          </h1>
          
          <div className="h-1 w-32 bg-primary" />
          
          <div className="max-w-md border-l-2 border-white/10 pl-10 py-2">
            <p className="text-base text-muted-foreground font-mono leading-relaxed opacity-70">
              Membangun benteng digital melalui penetrasi tingkat tinggi. Lakukan otentikasi kernel untuk mengekstrak data src.
            </p>
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={onStart}
              size="lg" 
              className="bg-primary text-black font-black hover:bg-primary/80 group rounded-none h-16 px-12 tracking-[0.3em] shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all hover:scale-105"
            >
              LOGIN.sh
              <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Terminal View on the Right */}
      <div className="relative hidden lg:block perspective-2000">
        <motion.div
          initial={{ rotateY: 15, opacity: 0, x: 50 }}
          animate={{ rotateY: 5, opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="terminal-window bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[9px] font-mono text-white/40 tracking-widest">/ROOT/SYS/ KERNEL_BOOT.LOG</div>
            </div>
            
            <div className="p-6 font-mono text-[10px] space-y-4">
              <div className="flex gap-3 text-secondary">
                <Terminal className="w-3 h-3" />
                <span>[root@afrizal-os] # boot --verbose</span>
              </div>
              
              <div className="space-y-1.5 text-white/40 h-56 overflow-hidden">
                <div className="text-primary/70">[ 0.000000] Linux version 6.5.0-afrizal-kernel</div>
                <div>[ 0.000124] Command line: BOOT_IMAGE=/vmlinuz</div>
                <div className="text-secondary/70">[ 0.002451] x86/fpu: Supporting XSAVE feature 0x001</div>
                <div>[ 0.458210] Network: Interface up (UP_GIGA)</div>
                <div className="text-accent/70">[ 1.254821] Security: Cryptographic Modules... OK</div>
                <div className="text-primary/70">[ 2.145892] Mounting: /dev/sda1 {"->"} /root/sys</div>
                <div>[ 3.842109] Daemon: Scanning for vulnerabilities...</div>
                <div className="text-secondary/50">[ 4.125821] System: All modules verified.</div>
                <div className="animate-pulse text-primary">[ ******* ] Waiting for user authentication...</div>
              </div>

              <div className="pt-6 space-y-3 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/60">
                  <span className="text-primary">LOAD_STATUS</span>
                  <span>{bootStatus}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${bootStatus}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[140px] rounded-full -z-10" />
      </div>
    </div>
  );
}
