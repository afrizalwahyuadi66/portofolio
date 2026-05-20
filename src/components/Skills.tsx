
"use client";

import React from 'react';
import { Search, ShieldCheck, Code2, Globe, Database, Layers } from 'lucide-react';

const skillCategories = [
  { title: 'Offensive', icon: Search, skills: ['Metasploit', 'Burp', 'Nmap'] },
  { title: 'Defensive', icon: ShieldCheck, skills: ['SIEM', 'EDR', 'Auditing'] },
  { title: 'Development', icon: Code2, skills: ['Python', 'Golang', 'Rust'] },
  { title: 'Infrastructure', icon: Globe, skills: ['AWS', 'K8s', 'Docker'] },
];

export default function Skills() {
  return (
    <div className="space-y-12 py-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Capabilities</div>
          <h2 className="font-headline text-4xl font-bold tracking-tighter mb-6 text-white leading-tight">
            Technical <br />Architectures.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-mono">
            Standardized methodologies for identifying, mitigating, and neutralizing advanced persistent threats (APT).
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="p-6 border border-white/5 hover:bg-white/[0.02] transition-colors group bg-white/[0.02]">
              <category.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold uppercase tracking-widest text-[9px] mb-3 text-white">{category.title}</h3>
              <div className="space-y-1">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="text-[10px] text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/40" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
