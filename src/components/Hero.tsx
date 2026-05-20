
"use client";

import React from 'react';
import { ChevronDown, ShieldAlert, Terminal, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6 cinematic-reveal">
          <Terminal className="w-3 h-3" />
          System Status: Operational
        </div>
        
        <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none cinematic-reveal">
          SECURE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">UNSEEN</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 cinematic-reveal" style={{ animationDelay: '0.2s' }}>
          Expert Penetration Tester dedicated to identifying vulnerabilities before they become liabilities. Weaving digital resilience through sophisticated offensive security strategies.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 cinematic-reveal" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold group shadow-xl shadow-primary/20">
            Explore Operations
            <ShieldAlert className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-semibold border-white/10 hover:bg-white/5 transition-all">
            Download CV
            <Lock className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-1/3 left-10 md:left-20 floating opacity-20 pointer-events-none">
        <div className="w-16 h-16 border-2 border-primary rounded-xl rotate-45" />
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-20 floating opacity-20 pointer-events-none" style={{ animationDelay: '1s' }}>
        <div className="w-24 h-24 border-2 border-accent rounded-full border-dashed" />
      </div>
    </section>
  );
}
