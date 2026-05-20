
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, ChevronRight, Shield, Cpu, Lock } from 'lucide-react';
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
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center py-10">
      <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            Session: Anonymous // Kernel 6.5.0-emergent
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-[0.9]">
            CYBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">INTELLIGENCE</span>
          </h1>
          
          <p className="max-w-xl text-md text-muted-foreground font-mono leading-relaxed border-l border-white/10 pl-6">
            Membangun benteng digital melalui penetrasi tingkat tinggi. Klik folder di samping untuk mengeksplorasi data kernel.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              onClick={onStart}
              size="lg" 
              className="bg-primary text-black font-bold hover:bg-primary/80 group rounded-none h-12 pointer-events-auto"
            >
              LOGIN.sh
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <div className="relative perspective-1000 hidden lg:block">
          <motion.div
            animate={{ 
              rotateY: [0, 5, 0],
              rotateX: [0, -2, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <LinuxWindow title="kernel_boot.sys" className="w-full max-w-md mx-auto shadow-[0_0_50px_rgba(0,255,255,0.1)] crt-effect">
              <div className="font-mono text-[10px] space-y-3">
                <div className="flex gap-2">
                  <span className="text-secondary">[root@emergent-os]</span>
                  <span className="text-white animate-pulse"># boot --verbose</span>
                </div>
                
                <div className="space-y-1 text-muted-foreground opacity-80 h-32 overflow-hidden">
                  <div>[ 0.000000] Linux version 6.5.0-emergent</div>
                  <div>[ 0.000124] Command line: BOOT_IMAGE=/vmlinuz</div>
                  <div>[ 0.002451] x86/fpu: Supporting XSAVE feature 0x001</div>
                  <div>[ 0.458210] Freeing SMP alternatives memory...</div>
                  <div>[ 1.254821] Initializing Cryptographic Modules...</div>
                  <div>[ 2.145892] Mounting secure partitions... [OK]</div>
                </div>

                <div className="py-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-primary uppercase tracking-widest text-[9px]">Load_Status</span>
                    <span className="text-primary">{bootStatus}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${bootStatus}%` }}
                    />
                  </div>
                </div>
              </div>
            </LinuxWindow>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
