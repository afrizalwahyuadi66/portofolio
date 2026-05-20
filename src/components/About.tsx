"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Target, Cpu, Code } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-16 py-6"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants} className="relative">
          <div className="relative aspect-square rounded-xl border border-white/10 overflow-hidden group shadow-2xl">
            <Image 
              src={profileImage?.imageUrl || "https://picsum.photos/seed/profile/800/800"} 
              alt="Security Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              data-ai-hint="hacker profile"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 border-2 border-primary/20 pointer-events-none" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-4 -right-4 glass p-4 border border-white/10 shadow-[0_0_30px_rgba(39,201,63,0.2)]"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <div>
                <div className="text-xl font-black font-headline">VERIFIED</div>
                <div className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Level 7 Access</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-6">
          <motion.div variants={itemVariants} className="text-secondary font-bold tracking-[0.5em] uppercase text-[10px]">USER_BIOMETRICS</motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-headline font-black tracking-tighter leading-tight text-white">
            Architect of <br />Secure Systems.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground font-mono leading-relaxed italic border-l-2 border-primary/40 pl-4 bg-primary/5 py-2">
            "In a world where data is the new oil, I am the refinery guardian who ensures zero leaks and maximum purity."
          </motion.p>
          
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
            {[
              { title: 'Red Teaming', icon: Target, color: 'text-accent' },
              { title: 'Secure Coding', icon: Code, color: 'text-primary' },
              { title: 'Cloud Armor', icon: Cpu, color: 'text-secondary' },
              { title: 'Threat Lab', icon: ShieldCheck, color: 'text-blue-400' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="glass p-4 group hover:bg-white/5 transition-all border border-white/5 hover:border-white/20"
              >
                <item.icon className={`w-5 h-5 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                <h4 className="font-bold text-[9px] uppercase tracking-widest text-white/80">{item.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}