"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Code2, Globe } from 'lucide-react';

const skillCategories = [
  { title: 'Offensive', icon: Search, skills: ['Metasploit', 'Burp Suite', 'Nmap', 'Cobalt Strike'], color: 'text-accent' },
  { title: 'Defensive', icon: ShieldCheck, skills: ['SIEM/SOAR', 'WAF Config', 'Incident Response'], color: 'text-secondary' },
  { title: 'Development', icon: Code2, skills: ['Python', 'Golang', 'Rust', 'Secure APIs'], color: 'text-primary' },
  { title: 'Infrastruct', icon: Globe, skills: ['AWS Security', 'K8s Hardening', 'Zero Trust'], color: 'text-blue-400' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

export default function Skills() {
  return (
    <div className="space-y-12 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 gap-12 items-start"
      >
        <div className="lg:col-span-1 space-y-6">
          <div className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">SYSTEM_CAPABILITIES</div>
          <h2 className="font-headline text-4xl font-black tracking-tighter text-white leading-none">
            Tech <br />Stacks.
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed font-mono italic opacity-60">
            Scanning for compatible modules... <br /> 
            Integration potential: 99.8%
          </p>
          <div className="p-4 border border-white/10 bg-white/5 rounded-lg space-y-2">
            <div className="flex justify-between text-[8px] font-bold tracking-widest uppercase">
              <span>Security_Audit</span>
              <span className="text-primary">MASTER</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[95%] h-full bg-primary" />
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: 'rgba(0, 255, 255, 0.3)' }}
              className="p-6 border border-white/5 bg-white/[0.03] backdrop-blur-sm group transition-all"
            >
              <category.icon className={`w-6 h-6 ${category.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-4 text-white">{category.title}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="text-[10px] text-muted-foreground flex items-center gap-3">
                    <div className={`w-1 h-1 rounded-full ${category.color} opacity-40`} />
                    <span className="group-hover:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}