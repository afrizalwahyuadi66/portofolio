
"use client";

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Security Consultant',
    company: 'Nexus CyberSolutions',
    period: '2021 - Present',
    location: 'Remote / London',
    description: 'Leading red team operations for international banking clients. Developing automated vulnerability management workflows and mentoring junior pentesters.'
  },
  {
    role: 'Security Engineer',
    company: 'Defend.io',
    period: '2018 - 2021',
    location: 'Austin, TX',
    description: 'Focused on cloud infrastructure security. Built custom CI/CD security scanners that reduced critical vulnerabilities by 40% over 18 months.'
  },
  {
    role: 'Junior Penetration Tester',
    company: 'StartUp Secure',
    period: '2016 - 2018',
    location: 'San Francisco, CA',
    description: 'Conducted external and internal network assessments. Managed vulnerability reporting and remediation advisory for 50+ startup clients.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <div className="inline-block text-accent font-bold tracking-widest uppercase text-sm mb-4">Evolution</div>
              <h2 className="font-headline text-4xl font-bold mb-6">Career Timeline</h2>
              <p className="text-muted-foreground">
                Charting a path through the evolving landscape of digital threats and security breakthroughs.
              </p>
            </div>
          </div>

          <div className="md:w-2/3 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-primary/20 hover:border-primary transition-colors group">
                <div className="absolute top-0 -left-[9px] w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(133,56,240,0.5)] group-hover:scale-125 transition-transform" />
                
                <div className="mb-2 flex flex-wrap items-center gap-4 text-sm font-semibold text-accent uppercase tracking-tighter">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-bold mb-2">{exp.role}</h3>
                <div className="text-xl text-primary font-medium mb-4">{exp.company}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
