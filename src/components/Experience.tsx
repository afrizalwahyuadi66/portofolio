"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Terminal, ArrowRight } from 'lucide-react';

const experience = [
  {
    id: 1,
    role: 'Security Researcher - GOVERNMENT & Authorized Testing',
    company: 'Kolaborasi Strategis dengan Pemerintah dan Instansi Pemerintah',
    period: 'Desember 2025 - Sekarang',
    description: 'Melaksanakan Penetration Testing legal pada infrastruktur digital kementerian dan lembaga pemerintah di Indonesia.',
    bulletPoints: [
      'Melakukan Penetration Testing legal pada infrastruktur digital kementerian dan lembaga pemerintah di Indonesia.',
      'Menyusun laporan otentis dengan konteks profesional: PoC (Proof of Concept) yang mencakup temuan, bukti eksploitasi (PoC), dan langkah-langkah mitigasi vulnerability assessment.',
      'Temuan Keamanan tidaklah disengaja (Kolaborasi) dan telah konfirmasi bersama POLRI & Lembaga Pencegahan.'
    ]
  },
  {
    id: 2,
    role: 'Lead Developer & Security Researcher',
    company: 'Proyek: protektif.stmik-dci.ac.id',
    period: 'November 2025 - Januari 2026',
    description: 'Merancang dan mengembangkan Security Engine otomatis untuk mendeteksi Backdoor/Webshell serta konten illegal (pornografi) secara direk online.',
    bulletPoints: [
      'Merancang dan mengembangkan Security Engine otomatis untuk mendeteksi Backdoor/Webshell serta konten illegal (pornografi) secara direk online.',
      'Melakukan code review untuk memastikan keamanan sebelum rilis dan penempatan publik (behavioral).',
      'Mengoptimalkan sistem deteksi untuk meminimalkan false positive pada proses scanning berkas.'
    ]
  },
  {
    id: 3,
    role: 'Independent Security Researcher & Bug Bounty',
    company: 'Platform: siak.stmik-dci.ac.id',
    period: 'Januari 2025',
    description: 'Vulnerability Disclosure - KKN DCI.',
    bulletPoints: [
      'Menemukan kerentanan Blind SQL Injection (Time-based) pada siak.stmik-dc.ac.id serta celah keamanan pada beberapa sistem internal kampus.',
      'Memberikan rekomendasi security har seperti Parameterized Query, WAF hardening, dan konfigurasi server.',
      'Melakukan validasi dampak risiko secara etis kepada manajemen IT.'
    ]
  }
];

export default function Experience() {
  return (
    <div className="space-y-12 py-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">PROFESSIONAL_JOURNEY</div>
          <h2 className="font-headline text-4xl font-black tracking-tighter text-white">Work Experience.</h2>
        </div>
        <div className="hidden sm:flex gap-4">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                SYSTEM_RUNNING
            </div>
        </div>
      </div>

      <div className="relative border-l border-white/20 ml-4 space-y-12">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-12"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-accent rounded-full z-10 shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
            
            <div className="bg-white/5 p-8 border border-white/10 hover:border-accent/50 transition-colors backdrop-blur-sm rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1 flex items-center gap-2">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-mono text-sm">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {exp.description}
              </p>
              
              <ul className="space-y-2">
                {exp.bulletPoints.map((point, i) => (
                  <li key={i} className="text-xs text-white/70 flex items-start gap-3">
                    <ArrowRight className="w-3 h-3 text-accent mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metodologi Pengujian Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-white/10"
      >
        <div className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">METODOLOGI PENGUJIAN & ALUR KERJA TEKNIK</div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Black Box Method */}
          <div className="p-6 border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-lg">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent" />
              Metode Black Box (Pengujian Eksternal tanpa Informasi Internal)
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">1.</span>
                <div>
                  <span className="text-white font-bold">Reconnaissance:</span> Pengumpulan informasi dari sumber terbuka, pemetaan subdomain, scanning port, dan identifikasi teknologi yang digunakan.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">2.</span>
                <div>
                  <span className="text-white font-bold">Vulnerability Assessment:</span> Fuzzing pada parameter dan endpoint, serta penggunaan scanner otomatis untuk menemukan celah potensial.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">3.</span>
                <div>
                  <span className="text-white font-bold">Exploitation & Validation:</span> Simulasi serangan (SQL Injection, WAF bypass, dll.) dan pembuatan bukti eksploitasi (PoC) untuk menunjukkan dampak nyata.
                </div>
              </li>
            </ol>
          </div>

          {/* White Box Method */}
          <div className="p-6 border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-lg">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-secondary" />
              Metode White Box (Pengujian Internal dengan Informasi Lengkap)
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">1.</span>
                <div>
                  <span className="text-white font-bold">Internal Architecture Analysis:</span> Analisis alur logika aplikasi dengan akses pengguna terbatas untuk memetakan struktur internal dan potensi eskalasi.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">2.</span>
                <div>
                  <span className="text-white font-bold">Privilege Escalation & Logic Bugs:</span>
                  <ul className="mt-2 ml-4 space-y-2 text-xs">
                    <li><span className="text-accent">a. Vertical Escalation:</span> Menguji kerentanan di mana pengguna level rendah dapat memperoleh hak akses administratif (Admin/Superuser).</li>
                    <li><span className="text-accent">b. Horizontal Escalation (IDOR):</span> Menguji kemampuan pengguna untuk mengakses atau memanipulasi data milik pengguna lain pada level hak akses yang sama melalui parameter manipulasi.</li>
                    <li><span className="text-accent">c. Logic Bug Testing:</span> Eksploitasi celah pada alur bisnis aplikasi yang tidak dapat dideteksi oleh alat pemindaian otomatis.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">3.</span>
                <div>
                  <span className="text-white font-bold">Deep Exploitation:</span> Ekstraksi data terstruktur menggunakan teknik Blind SQL Injection (Time-based/Boolean) tanpa mengganggu stabilitas operasional sistem.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
