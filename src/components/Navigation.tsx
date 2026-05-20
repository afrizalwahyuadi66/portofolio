
"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal, Briefcase, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Terminal },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: Shield },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Shield className="w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter text-glow">SYNTHWEAVE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[60px] bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-headline font-bold flex items-center gap-3 hover:text-primary transition-colors"
          >
            <link.icon className="w-6 h-6 text-accent" />
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
