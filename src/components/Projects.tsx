"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    id: 'project-1',
    title: 'VortexScanner',
    category: 'Network Operations',
    description: 'High-speed asynchronous port and service reconnaissance engine.'
  },
  {
    id: 'project-2',
    title: 'CryptGuard SDK',
    category: 'Security Framework',
    description: 'Modern cryptographic standards implementation for distributed systems.'
  },
  {
    id: 'project-3',
    title: 'ThreatGrid Viz',
    category: 'Data Analysis',
    description: 'Real-time anomaly detection and lateral movement visualization.'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-white/[0.01] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div>
            <div className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Projects</div>
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-white">Active Operations.</h2>
          </div>
          <div className="flex gap-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <Github className="w-4 h-4" /> Github.Source
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {projects.map((proj) => {
            const img = PlaceHolderImages.find(i => i.id === proj.id);
            return (
              <div key={proj.id} className="bg-background p-8 group hover:bg-white/[0.02] transition-all duration-500">
                <div className="relative aspect-[16/9] mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image 
                    src={img?.imageUrl || "https://picsum.photos/seed/project/800/600"} 
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint="tech dashboard"
                  />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{proj.category}</div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 text-white">{proj.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  {proj.description}
                </p>
                <div className="flex gap-4 border-t border-white/5 pt-6">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors cursor-pointer">Explore Alpha</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}