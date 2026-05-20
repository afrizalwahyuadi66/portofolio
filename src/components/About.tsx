
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Target, Cpu } from 'lucide-react';
import LinuxWindow from './LinuxWindow';

export default function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
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
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden lg:block border border-white/10">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,128,0.3)]">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-headline font-bold">120+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Engagements</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4">The Identity</div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Ethical Hacker by Choice. <br />
              <span className="text-muted-foreground">Architect of Security.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-mono italic border-l-2 border-primary/20 pl-6">
              "Di dunia yang serba digital, privasi adalah mitos yang harus kita pertahankan dengan kode. Saya menemukan kerentanan sebelum pihak tak bertanggung jawab melakukannya."
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass p-5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-headline font-bold mb-1">Precision Testing</h4>
                <p className="text-sm text-muted-foreground">Detailed vulnerability assessments with zero false positives.</p>
              </div>
              <div className="glass p-5 rounded-xl border border-white/5 hover:border-accent/50 transition-colors">
                <Cpu className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-headline font-bold mb-1">Custom Exploit Dev</h4>
                <p className="text-sm text-muted-foreground">Building bespoke tools for specific attack surfaces.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
