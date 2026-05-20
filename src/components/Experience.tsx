
"use client";

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Security Consultant',
    company: 'Nexus CyberSolutions',
    period: '2021 - Present',
    description: 'Leading red team operations for international banking clients.'
  },
  {
    role: 'Security Engineer',
    company: 'Defend.io',
    period: '2018 - 2021',
    description: 'Focused on cloud infrastructure security and automated scanning.'
  },
  {
    role: 'Junior Penetration Tester',
    company: 'StartUp Secure',
    period: '2016 - 2018',
    description: 'Conducted network assessments and vulnerability reporting.'
  }
];

export default function Experience() {
  return (
    <div className="py-6 space-y-10">
      <div className="inline-block text-accent font-bold tracking-widest uppercase text-[10px] mb-2">Evolution</div>
      <h2 className="font-headline text-3xl font-bold mb-8">Career Timeline</h2>
      
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors group">
            <div className="absolute top-0 -left-[9px] w-4 h-4 bg-primary rounded-full group-hover:scale-125 transition-transform" />
            
            <div className="mb-1 flex items-center gap-3 text-[9px] font-bold text-accent uppercase tracking-tighter">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.period}</span>
            </div>

            <h3 className="font-headline text-xl font-bold mb-1">{exp.role}</h3>
            <div className="text-primary text-sm font-medium mb-2">{exp.company}</div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
