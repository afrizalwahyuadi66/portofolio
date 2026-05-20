"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Code2, Globe, Cpu, Lock, Terminal, Database, Network, FileCode } from 'lucide-react';

const skillCategories = [
  { 
    title: 'Web Security (VAPT)', 
    icon: Search, 
    skills: [
      'SQL Injection (Error/Boolean/Time-based, Union-based, WAF Bypass)', 
      'XSS (Stored/Reflected)', 
      'LFI/RFI', 
      'SSRF', 
      'CSRF', 
      'File Upload Vulnerability', 
      'Command Injection', 
      'Authentication Bypass', 
      'Security Misconfiguration'
    ], 
    color: 'text-accent' 
  },
  { 
    title: 'Network Security', 
    icon: Network, 
    skills: [
      'Information Gathering', 
      'Nmap Scripting', 
      'Network Enumeration', 
      'Brute Force Attack', 
      'Vulnerability Scanning', 
      'Wireless Security Assessment'
    ], 
    color: 'text-secondary' 
  },
  { 
    title: 'Security Development', 
    icon: Code2, 
    skills: [
      'Python (Otomasi Security Tools)', 
      'Bash Scripting', 
      'PHP (Analisis Shell/Malware)', 
      'Mesin Scanner Berbasis Web'
    ], 
    color: 'text-primary' 
  },
  { 
    title: 'Tools & Resources', 
    icon: Cpu, 
    skills: [
      'Burp Suite Professional', 
      'SQLMap', 
      'OWASP ZAP', 
      'Nmap', 
      'Metasploit', 
      'Dirsearch', 
      'Ffuf', 
      'Dirhunt', 
      'Nikto', 
      'Wpscan'
    ], 
    color: 'text-blue-400' 
  },
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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

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
            Technical <br />Stacks.
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed font-mono italic opacity-60">
            Keahlian teknis di bidang Cybersecurity & Penetration Testing. <br />
            Tingkat keahlian: Expert Level
          </p>
          <div className="p-4 border border-white/10 bg-white/5 rounded-lg space-y-2">
            <div className="flex justify-between text-[8px] font-bold tracking-widest uppercase">
              <span>Web_Security</span>
              <span className="text-primary">EXPERT</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-primary" />
            </div>
          </div>
          <div className="p-4 border border-white/10 bg-white/5 rounded-lg space-y-2">
            <div className="flex justify-between text-[8px] font-bold tracking-widest uppercase">
              <span>Penetration_Testing</span>
              <span className="text-secondary">MASTER</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[95%] h-full bg-secondary" />
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
          {skillCategories.map((category, idx) => {
            const isExpanded = expandedCategory === idx;
            const displaySkills = isExpanded ? category.skills : category.skills.slice(0, 6);
            const hasMore = category.skills.length > 6;
            
            return (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                whileHover={{ y: -5, borderColor: 'rgba(0, 255, 255, 0.3)' }}
                className="p-6 border border-white/5 bg-white/[0.03] backdrop-blur-sm group transition-all"
              >
                <category.icon className={`w-6 h-6 ${category.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-black uppercase tracking-widest text-[10px] mb-4 text-white">{category.title}</h3>
                <div className="space-y-2">
                  {displaySkills.map((skill, sIdx) => (
                    <motion.div 
                      key={sIdx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sIdx * 0.05 }}
                      className="text-[10px] text-muted-foreground flex items-center gap-3"
                    >
                      <div className={`w-1 h-1 rounded-full ${category.color} opacity-40`} />
                      <span className="group-hover:text-white transition-colors">{skill}</span>
                    </motion.div>
                  ))}
                </div>
                {hasMore && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className={`text-[9px] ${category.color} mt-2 hover:${category.color}/80 transition-colors cursor-pointer flex items-center gap-1`}
                  >
                    {isExpanded ? 'Show less' : `+${category.skills.length - 6} more...`}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      
      {/* Certifications & Contributions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-white/10"
      >
        <div className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">SERTIFIKASI & KONTRIBUSI</div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { 
              title: 'Certified Web Penetration Tester', 
              org: 'Cyber Academy', 
              id: 'BWH01103260498',
              date: '2026' 
            },
            { 
              title: 'Penulis - hackaja.my.id', 
              org: 'Publikasi riset Offensive Security, teknik VAPT, dan mitigasi serangan jaringan secara etis.', 
              date: 'Active' 
            },
            { 
              title: 'Security Platforms', 
              org: 'TryHackMe (Intermediate), Hack The Box, & PortSwigger Academy.', 
              date: 'Active' 
            },
          ].map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
            >
              <div className="text-xs font-bold text-white mb-1">{cert.title}</div>
              <div className="text-[10px] text-muted-foreground mb-1">{cert.org}</div>
              {cert.id && <div className="text-[9px] text-secondary">ID: {cert.id}</div>}
              <div className="text-[9px] text-primary mt-1">{cert.date}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
