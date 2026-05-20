
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Target, Cpu, Code } from 'lucide-react';

export default function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <div className="space-y-16 py-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-xl border border-white/10 overflow-hidden group">
            <Image 
              src={profileImage?.imageUrl || "https://picsum.photos/seed/profile/800/800"} 
              alt="Security Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              data-ai-hint="hacker profile"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 glass p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <div>
                <div className="text-xl font-black font-headline">128+</div>
                <div className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Audits</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">User Identification</div>
          <h2 className="text-4xl font-headline font-black tracking-tighter leading-tight">
            Architect of <br />Secure Systems.
          </h2>
          <p className="text-sm text-muted-foreground font-mono leading-relaxed italic border-l-2 border-primary/20 pl-4">
            "Di dunia di mana data adalah mata uang baru, saya adalah penjaga gerbang yang memastikan hanya cahaya yang boleh masuk."
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Red Teaming', icon: Target },
              { title: 'Secure Coding', icon: Code },
              { title: 'Cloud Armor', icon: Cpu },
              { title: 'Threat Lab', icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="glass p-4 group hover:bg-primary/5 transition-all">
                <item.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-[9px] uppercase tracking-widest">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
