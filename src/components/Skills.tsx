"use client";

import React from 'react';
import { Search, ShieldCheck, Code2, Globe, Database, Layers } from 'lucide-react';

const skillCategories = [
  { title: 'Offensive', icon: Search, skills: ['Metasploit', 'Burp', 'Nmap', 'SQLmap'] },
  { title: 'Defensive', icon: ShieldCheck, skills: ['SIEM', 'IDS/IPS', 'EDR', 'Auditing'] },
  { title: 'Development', icon: Code2, skills: ['Python', 'Golang', 'Rust', 'C++'] },
  { title: 'Infrastructure', icon: Globe, skills: ['AWS', 'K8s', 'Docker', 'GCP'] },
  { title: 'Networking', icon: Database, skills: ['TCP/IP', 'Wireshark', 'OSI', 'BGP'] },
  { title: 'Governance', icon: Layers, skills: ['OWASP', 'PCI-DSS', 'ISO', 'SOC2'] }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-4">
            <div className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Capabilities</div>
            <h2 className="font-headline text-5xl font-bold tracking-tighter mb-6 text-white leading-tight">
              Technical <br />Architectures.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Standardized methodologies for identifying, mitigating, and neutralizing advanced persistent threats.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-1">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="p-8 border border-white/5 hover:bg-white/[0.02] transition-colors group">
                <category.icon className="w-5 h-5 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold uppercase tracking-widest text-[11px] mb-4 text-white">{category.title}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}