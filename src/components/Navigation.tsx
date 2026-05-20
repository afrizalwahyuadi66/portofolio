"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Identity', href: '#about' },
  { name: 'Protocols', href: '#skills' },
  { name: 'Operations', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "py-4" : "py-8"
    )}>
      <div className="container mx-auto px-6">
        <div className={cn(
          "flex items-center justify-between px-6 py-3 rounded-full border border-white/5 transition-all duration-500",
          scrolled ? "bg-black/40 backdrop-blur-xl border-white/10" : "bg-transparent"
        )}>
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center text-primary">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-headline font-bold text-lg tracking-widest text-white">EMERGENT.PROTO</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[11px] uppercase font-bold tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-2 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
            >
              Initialize
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}