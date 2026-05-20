
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Target, Cpu } from 'lucide-react';

export default function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
              <Image 
                src={profileImage?.imageUrl || "https://picsum.photos/seed/profile/800/800"} 
                alt="Pentester Profile"
                fill
                className="object-cover"
                data-ai-hint="professional man"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden lg:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-headline font-bold">120+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Engagements</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-block text-accent font-bold tracking-widest uppercase text-sm mb-4">The Identity</div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Ethical Hacker by Choice. <span className="text-muted-foreground">Architect of Security.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              With a background in software engineering and a passion for finding what's broken, I've spent the last 8 years helping Fortune 500 companies protect their digital assets. My approach combines meticulous reconnaissance with innovative exploitation techniques.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass p-5 rounded-xl">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-headline font-bold mb-1">Precision Testing</h4>
                <p className="text-sm text-muted-foreground">Detailed vulnerability assessments with zero false positives.</p>
              </div>
              <div className="glass p-5 rounded-xl">
                <Cpu className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-headline font-bold mb-1">Custom Exploit Dev</h4>
                <p className="text-sm text-muted-foreground">Building bespoke tools for specific attack surfaces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
