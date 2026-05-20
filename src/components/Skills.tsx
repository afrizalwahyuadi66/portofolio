
"use client";

import React from 'react';
import { Code2, Search, Database, Globe, Layers, ShieldCheck } from 'lucide-react';

const skillCategories = [
  {
    title: 'Offensive Security',
    icon: Search,
    skills: ['Metasploit', 'Burp Suite', 'Nmap', 'SQLmap', 'Empire']
  },
  {
    title: 'Defensive Strategy',
    icon: ShieldCheck,
    skills: ['SIEM', 'IDS/IPS', 'Endpoint Protection', 'Firewall Auditing']
  },
  {
    title: 'Development',
    icon: Code2,
    skills: ['Python', 'Golang', 'Bash', 'C++', 'React']
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Globe,
    skills: ['AWS Security', 'Azure', 'Kubernetes', 'Docker Hardening']
  },
  {
    title: 'Data & Networking',
    icon: Database,
    skills: ['PostgreSQL', 'TCP/IP Stack', 'Wireshark', 'OSI Layers']
  },
  {
    title: 'Standards',
    icon: Layers,
    skills: ['OWASP Top 10', 'PCI-DSS', 'HIPAA', 'ISO 27001']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4">Capability</div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and methodologies honed through years of practical field experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="group glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-xl mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
