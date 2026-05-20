"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Lock, Database, Terminal, Github } from 'lucide-react';

const securityFindings = [
  {
    id: 'finding-1',
    title: 'Information Exposure via Debug Endpoint',
    category: 'Security Finding',
    target: '*.polri.go.id',
    cve: 'CWE-200: Information Exposure',
    owasp: 'OWASP A05:2021',
    description: 'Mengekspos informasi sensitif pada endpoint yang tersedia di lingkungan development/production, termasuk profiling stack trace, konfigurasi runtime server.',
    tech: ['Burp Suite', 'Manual Analysis', 'Information Disclosure'],
    icon: AlertTriangle,
    severity: 'High'
  },
  {
    id: 'finding-2',
    title: 'Unprotected API Endpoint & Sensitive File Exposure',
    category: 'Security Finding',
    target: '*.kemendag.go.id',
    cve: 'CWE-200: Information Exposure',
    description: 'Technical Description: Direktori endpoint publik tanpa API terproteksi, serta file konfigurasi sensitif yang diakses publik.',
    tech: ['Directory Enumeration', 'Path Traversal', 'Information Disclosure'],
    icon: Lock,
    severity: 'Critical'
  },
  {
    id: 'finding-3',
    title: 'Insecure Cookie & Session Misconfiguration',
    category: 'Security Finding',
    target: '*.ekon.go.id',
    owasp: 'OWASP A05:2021',
    cve: 'CWE-200: Exposure of Sensitive Information',
    description: 'Technical Description: File acces bisa dibersihkan secara konfigurasi front controller untuk server Apache, sehingga dapat diakses publik.',
    tech: ['Apache Configuration', 'Cookie Security', 'Session Hijacking'],
    icon: Shield,
    severity: 'High'
  },
  {
    id: 'finding-4',
    title: 'SQL Injection (UNION-based)',
    category: 'Security Finding',
    target: '*.sulutprov.go.id',
    owasp: 'OWASP A03:2021',
    cve: 'CWE-89',
    description: 'Technical Description: Parameter pada endpoint tanpa filter input terhadap serangan SQL Injection Type UNION-based. Memanipulasi parameter tanpa pemeriksaan dari database.',
    tech: ['SQL Injection', 'Union-based', 'Sqlmap', 'Manual Exploitation'],
    icon: Database,
    severity: 'Critical'
  }
];

const personalProjects = [
  {
    id: 'nexusuite',
    title: 'Nexusuite v4.1.0',
    category: 'Personal Project',
    description: 'Platform offensive security otonom generasi terbaru yang dirancang untuk mengotomatisasi seluruh siklus hidup pengujian penetrasi (pentesting). Mengintegrasikan Kecerdasan Buatan (AI) di setiap fasenya—mulai dari perencanaan strategi serangan hingga verifikasi kerentanan yang kompleks. Dibangun dengan arsitektur asinkron berbasis FastAPI.',
    tech: ['Python', 'FastAPI', 'AI', 'SQLite', 'Offensive Security', 'Automation'],
    icon: Terminal,
    logo: 'https://raw.githubusercontent.com/afrizalwahyuadi66/Nexusuite/refs/heads/main/Nexusuite_logo.png',
    github: 'https://github.com/afrizalwahyuadi66/Nexusuite/tree/main'
  }
];

export default function Projects() {
  return (
    <div className="py-6 space-y-16">
      {/* Security Findings Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end border-b border-white/10 pb-6"
      >
        <div>
          <div className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-2">VULNERABILITY_FINDINGS</div>
          <h2 className="font-headline text-4xl font-black tracking-tighter text-white">Security Findings.</h2>
        </div>
        <div className="hidden sm:block text-[9px] font-mono text-muted-foreground opacity-50 uppercase">
          Status: REPORTED // Severity: HIGH/CRITICAL
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {securityFindings.map((proj) => {
          const isCritical = proj.severity === 'Critical';
          const badgeClass = isCritical
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-accent/20 text-accent border border-accent/30';
          
          return (
            <motion.div
              key={proj.id}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -10 }}
              className="bg-white/5 p-5 group hover:bg-white/[0.08] transition-all border border-white/10 rounded-xl flex flex-col h-full"
            >
              <div className="relative aspect-video mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rounded-lg">
                <Image
                  src={`https://picsum.photos/seed/${proj.id}/800/600`}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2 py-1 rounded text-[8px] font-bold uppercase ${badgeClass}`}>
                    {proj.severity}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-1 rounded">
                  {proj.category}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <proj.icon className="w-4 h-4 text-secondary" />
                <h3 className="font-headline text-xl font-black text-white group-hover:text-primary transition-colors">{proj.title}</h3>
              </div>

              <div className="text-[10px] text-muted-foreground mb-1">Target: <span className="text-white">{proj.target}</span></div>
              <div className="text-[10px] text-muted-foreground mb-3">
                <span className="text-primary">{proj.owasp}</span> • <span className="text-secondary">{proj.cve}</span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 flex-grow italic">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {proj.tech.map((t, ti) => (
                  <span key={ti} className="text-[8px] font-mono text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Personal Projects Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end border-b border-white/10 pb-6"
      >
        <div>
          <div className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-2">PERSONAL_PROJECTS</div>
          <h2 className="font-headline text-4xl font-black tracking-tighter text-white">Personal Projects.</h2>
        </div>
        <div className="hidden sm:block text-[9px] font-mono text-muted-foreground opacity-50 uppercase">
          Open Source // Development
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid sm:grid-cols-1 md:grid-cols-2 gap-6"
      >
        {personalProjects.map((proj) => (
          <motion.div
            key={proj.id}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ y: -10 }}
            className="bg-white/5 p-5 group hover:bg-white/[0.08] transition-all border border-white/10 rounded-xl flex flex-col h-full"
          >
            <div className="relative aspect-video mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rounded-lg">
              <Image
                src={proj.logo}
                alt={proj.title}
                fill
                className="object-contain p-8 transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary bg-secondary/10 px-2 py-1 rounded">
                {proj.category}
              </span>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground group-hover:text-secondary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-[10px]">GitHub</span>
              </a>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <proj.icon className="w-4 h-4 text-secondary" />
              <h3 className="font-headline text-xl font-black text-white group-hover:text-secondary transition-colors">{proj.title}</h3>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 flex-grow italic">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {proj.tech.map((t, ti) => (
                <span key={ti} className="text-[8px] font-mono text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
