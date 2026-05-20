"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 'project-1',
    title: 'VortexScanner',
    category: 'Cyber Recon',
    description: 'High-speed asynchronous port and service reconnaissance engine with ML-based fingerprinting.',
    tech: ['Rust', 'Python', 'Nmap API']
  },
  {
    id: 'project-2',
    title: 'CryptGuard SDK',
    category: 'Framework',
    description: 'Modern cryptographic standards for distributed systems, ensuring AES-256-GCM everywhere.',
    tech: ['Golang', 'OpenSSL', 'Docker']
  },
  {
    id: 'project-3',
    title: 'ThreatGrid Viz',
    category: 'Data Analysis',
    description: 'Real-time anomaly detection and movement visualization for network traffic analysis.',
    tech: ['Next.js', 'D3.js', 'Firebase']
  }
];

export default function Projects() {
  return (
    <div className="py-6 space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end border-b border-white/10 pb-6"
      >
        <div>
          <div className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-2">ACTIVE_OPERATIONS</div>
          <h2 className="font-headline text-4xl font-black tracking-tighter text-white">Project Extract.</h2>
        </div>
        <div className="hidden sm:block text-[9px] font-mono text-muted-foreground opacity-50 uppercase">
          Filter: ALL_PROJECTS // Status: LIVE
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((proj) => {
          const img = PlaceHolderImages.find(i => i.id === proj.id);
          return (
            <motion.div 
              key={proj.id} 
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -10 }}
              className="bg-white/5 p-5 group hover:bg-white/[0.08] transition-all border border-white/10 rounded-xl flex flex-col h-full"
            >
              <div className="relative aspect-video mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rounded-lg">
                <Image 
                  src={img?.imageUrl || "https://picsum.photos/seed/project/800/600"} 
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint="tech dashboard"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <motion.button whileHover={{ scale: 1.2 }} className="p-3 bg-black rounded-full"><Github className="w-5 h-5 text-white" /></motion.button>
                  <motion.button whileHover={{ scale: 1.2 }} className="p-3 bg-primary rounded-full"><ExternalLink className="w-5 h-5 text-black" /></motion.button>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-1 rounded">
                  {proj.category}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-headline text-xl font-black mb-3 text-white group-hover:text-primary transition-colors">{proj.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 flex-grow italic">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {proj.tech.map((t, ti) => (
                  <span key={ti} className="text-[8px] font-mono text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}