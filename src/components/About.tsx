"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Target, Cpu, Code } from 'lucide-react';

export default function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            <div className="relative aspect-[4/5] rounded-none border border-white/10 overflow-hidden group">
              <Image 
                src={profileImage?.imageUrl || "https://picsum.photos/seed/profile/800/800"} 
                alt="Security Profile"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                data-ai-hint="hacker profile"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Stats Overlay */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 glass p-8 shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary/20 flex items-center justify-center text-secondary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-black font-headline">128+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Successful Audits</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">User Identification</div>
              <h2 className="text-5xl font-headline font-black tracking-tighter leading-tight mb-8">
                Architect of <br />Secure Systems.
              </h2>
              <p className="text-muted-foreground font-mono leading-relaxed mb-10 italic border-l-2 border-primary/20 pl-6">
                "Di dunia di mana data adalah mata uang baru, saya adalah penjaga gerbang yang memastikan hanya cahaya yang boleh masuk, dan kegelapan tetap di luar."
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Red Teaming', icon: Target, desc: 'Advanced offensive security simulation.' },
                { title: 'Secure Coding', icon: Code, desc: 'Hardening applications from the inside out.' },
                { title: 'Cloud Armor', icon: Cpu, desc: 'Scalable infrastructure defense strategies.' },
                { title: 'Malware Lab', icon: ShieldCheck, desc: 'Reverse engineering and threat research.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 group hover:bg-primary/5 transition-all cursor-crosshair"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}