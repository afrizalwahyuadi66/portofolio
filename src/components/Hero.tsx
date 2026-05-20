"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, ChevronRight, Shield, Cpu, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LinuxWindow from './LinuxWindow';

export default function Hero() {
  const [bootStatus, setBootStatus] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBootStatus(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-6">
      <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            Core Status: Verified // Kernel 6.2.0-secure
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9]">
            CYBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">INTELLIGENCE</span>
          </h1>
          
          <p className="max-w-xl text-lg text-muted-foreground font-mono leading-relaxed border-l border-white/10 pl-6">
            Membangun benteng digital melalui penetrasi tingkat tinggi. Ahli dalam keamanan Cloud, Audit Infrastruktur, dan Pengembangan Exploit Kustom.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary text-black font-bold hover:bg-primary/80 group rounded-none h-12">
              INIT_SESSION.sh
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-mono rounded-none h-12">
              cat README.md
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Protocol</span>
              <div className="text-sm font-mono flex items-center gap-2">
                <Lock className="w-3 h-3 text-secondary" /> AES-256
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Uptime</span>
              <div className="text-sm font-mono text-secondary">99.999%</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Threat_Level</span>
              <div className="text-sm font-mono text-accent">LOW</div>
            </div>
          </div>
        </motion.div>

        <div className="relative perspective-1000 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, rotateY: 25, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <LinuxWindow title="sys_monitor.sh" className="w-full max-w-lg mx-auto shadow-[0_0_50px_rgba(0,255,255,0.1)] crt-effect">
              <div className="font-mono text-xs space-y-4">
                <div className="flex gap-2">
                  <span className="text-secondary">[root@emergent-os]</span>
                  <span className="text-white animate-pulse"># boot --verbose</span>
                </div>
                
                <div className="space-y-1 text-muted-foreground opacity-80">
                  <div>* Starting Cyber-Security Kernel... [OK]</div>
                  <div>* Initializing Firewall Modules... [OK]</div>
                  <div>* Loading Encrypted File Systems... [OK]</div>
                  <div>* Connecting to Neural-Grid... [OK]</div>
                </div>

                <div className="py-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-primary uppercase tracking-widest text-[10px]">Boot_Sequence</span>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <div className="text-[9px] uppercase font-bold text-muted-foreground mb-1">Network traffic</div>
                    <div className="flex items-end gap-1 h-8">
                      {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                        <motion.div 
                          key={i} 
                          className="flex-1 bg-primary/40"
                          animate={{ height: [`${h}%`, `${h*0.5}%`, `${h}%`] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary animate-pulse mb-1" />
                    <span className="text-[9px] uppercase font-bold">Safe_Zone</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-accent text-[9px] animate-pulse">
                  <Cpu className="w-3 h-3" /> ATTACHING_DEBUGGER_0x83F2...
                </div>
              </div>
            </LinuxWindow>
          </motion.div>
        </div>

      </div>
    </section>
  );
}