"use client";

import React from 'react';
import { ArrowRight, Terminal, Activity, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase text-primary cinematic-reveal">
              <Activity className="w-3 h-3" />
              Neural Mesh: Active
            </div>
            
            <h1 className="font-headline text-6xl md:text-9xl font-bold tracking-[-0.04em] leading-[0.9] cinematic-reveal text-white">
              TRANSFORMING <br />
              <span className="text-primary text-cyan-glow">DIGITAL</span> DEFENSE.
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-8 cinematic-reveal leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Architecting secure infrastructures for the next evolution of the web. Specialized in advanced penetration testing and emergent security protocols.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 cinematic-reveal" style={{ animationDelay: '0.4s' }}>
              <Button className="h-14 px-8 rounded-none bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all group">
                Enter Interface
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-white cursor-pointer transition-colors">
                <Layers className="w-4 h-4" />
                View Protocols
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative side text */}
      <div className="absolute left-10 bottom-10 hidden lg:block rotate-90 origin-left text-[10px] font-bold tracking-[0.5em] uppercase text-muted-foreground/30">
        Structure // Security // Scale
      </div>
      
      <div className="absolute right-10 bottom-10 hidden lg:block text-[10px] font-mono text-muted-foreground/30 text-right">
        ID: 0x9210-FX<br />
        LOC: GLOBAL_CLUSTER_A
      </div>
    </section>
  );
}