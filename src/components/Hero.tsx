"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto md:pl-20">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 border border-primary/20 text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase rounded-full backdrop-blur-sm">
          <Activity className="w-3 h-3 animate-pulse" />
          SESSION: ANONYMOUS // KERNEL 6.5.0-EMERGENT
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-[0.85] text-white">
            CYBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">INTELLIGENCE</span>
          </h1>
          <div className="h-1 w-24 bg-primary" />
        </div>
        
        <p className="max-w-lg text-lg text-muted-foreground font-mono leading-relaxed opacity-80 border-l-2 border-white/10 pl-8">
          Membangun benteng digital melalui penetrasi tingkat tinggi. Klik folder di samping untuk mengeksplorasi data kernel.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button 
            onClick={onStart}
            size="lg" 
            className="bg-primary text-black font-black hover:bg-primary/80 group rounded-none h-14 px-10 tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            LOGIN.sh
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            SECURE_LINK: ESTABLISHED
          </div>
        </div>
      </motion.div>

      <div className="relative hidden lg:block perspective-2000">
        <motion.div
          initial={{ rotateY: 20, opacity: 0 }}
          animate={{ rotateY: 5, opacity: 1 }}
          whileHover={{ rotateY: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <LinuxWindow title="KERNEL_BOOT.SYS" className="w-full max-w-md mx-auto shadow-2xl crt-effect">
            <div className="font-mono text-[10px] space-y-4">
              <div className="flex gap-2 border-b border-white/5 pb-2">
                <Terminal className="w-3 h-3 text-secondary" />
                <span className="text-secondary">[root@emergent-os] #</span>
                <span className="text-white">boot --verbose</span>
              </div>
              
              <div className="space-y-1.5 text-muted-foreground opacity-60 h-40 overflow-hidden font-code">
                <div className="text-primary/70">[ 0.000000] Linux version 6.5.0-emergent</div>
                <div>[ 0.000124] Command line: BOOT_IMAGE=/vmlinuz</div>
                <div className="text-secondary/70">[ 0.002451] x86/fpu: Supporting XSAVE feature 0x001</div>
                <div>[ 0.458210] Freeing SMP alternatives memory...</div>
                <div className="text-accent/70">[ 1.254821] Initializing Cryptographic Modules...</div>
                <div className="text-primary/70">[ 2.145892] Mounting secure partitions... [OK]</div>
                <div>[ 3.842109] Daemon: Scanning for vulnerabilities...</div>
                <div className="animate-pulse">[ ******* ] Waiting for user authentication...</div>
              </div>

              <div className="pt-4 space-y-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-primary">LOAD_STATUS</span>
                  <span className="text-white">{bootStatus}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${bootStatus}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </LinuxWindow>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 blur-[120px] rounded-full -z-10" />
      </div>
    </div>
  );
}