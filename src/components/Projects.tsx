
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    id: 'project-1',
    title: 'VortexScanner',
    category: 'Network Ops',
    description: 'High-speed asynchronous port and service reconnaissance engine.'
  },
  {
    id: 'project-2',
    title: 'CryptGuard SDK',
    category: 'Framework',
    description: 'Modern cryptographic standards for distributed systems.'
  },
  {
    id: 'project-3',
    title: 'ThreatGrid Viz',
    category: 'Analysis',
    description: 'Real-time anomaly detection and movement visualization.'
  }
];

export default function Projects() {
  return (
    <div className="py-6 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Projects</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-white">Active Operations.</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const img = PlaceHolderImages.find(i => i.id === proj.id);
          return (
            <div key={proj.id} className="bg-white/5 p-4 group hover:bg-white/10 transition-all border border-white/5 rounded-lg">
              <div className="relative aspect-video mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rounded">
                <Image 
                  src={img?.imageUrl || "https://picsum.photos/seed/project/800/600"} 
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="tech dashboard"
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">{proj.category}</div>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-headline text-lg font-bold mb-2 text-white">{proj.title}</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {proj.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
