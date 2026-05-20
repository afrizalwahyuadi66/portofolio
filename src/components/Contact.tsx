
"use client";

import React from 'react';
import { Mail, Github, Linkedin, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <footer id="contact" className="pt-24 pb-12 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="inline-block text-accent font-bold tracking-widest uppercase text-sm mb-4">Contact</div>
            <h2 className="font-headline text-5xl font-bold mb-8">Initiate Protocol</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-md">
              Ready to secure your digital future? Reach out for collaboration or consulting.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:contact@synthweave.io" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary transition-colors group-hover:text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Email</div>
                  <div className="text-lg font-medium">contact@synthweave.io</div>
                </div>
              </a>
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-muted-foreground hover:text-primary">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-muted-foreground hover:text-accent">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input placeholder="Cipher Knight" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input type="email" placeholder="ck@secure.com" className="bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea placeholder="How can I assist you today?" className="min-h-[150px] bg-white/5 border-white/10" />
              </div>
              <Button className="w-full rounded-xl h-12 font-bold group">
                Send Message
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 text-sm text-muted-foreground">
          <div>© 2025 Synthweave Portfolio. All rights reserved.</div>
          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download CV (PDF)
            </a>
            <div className="text-xs font-code opacity-50"># encryption: AES-256-GCM</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
