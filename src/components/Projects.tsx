
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  {
    id: 'project-1',
    title: 'VortexScanner',
    tags: ['Python', 'Network', 'Automation'],
    description: 'A multi-threaded asynchronous port and service scanner designed for high-speed network reconnaissance with automated reporting.'
  },
  {
    id: 'project-2',
    title: 'CryptGuard SDK',
    tags: ['Go', 'Security', 'Library'],
    description: 'A developer-friendly encryption library that implements modern cryptographic standards with a focus on simplicity and resistance to misuse.'
  },
  {
    id: 'project-3',
    title: 'ThreatGrid Viz',
    tags: ['React', 'D3.js', 'Visualization'],
    description: 'Interactive real-time visualization tool for monitoring network traffic anomalies and potential lateral movement in corporate environments.'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4">Operations</div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Works</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            View Github <Github className="w-5 h-5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => {
            const img = PlaceHolderImages.find(i => i.id === proj.id);
            return (
              <Card key={proj.id} className="overflow-hidden border-white/5 bg-card/50 hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-56">
                  <Image 
                    src={img?.imageUrl || "https://picsum.photos/seed/project/800/600"} 
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="code dashboard"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                </div>
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-4">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-3">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors">
                      <Code className="w-4 h-4" /> Code
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
