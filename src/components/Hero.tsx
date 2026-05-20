
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, Terminal, Shield, Lock, Unlock, Key, Cpu, Skull, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStart?: () => void;
  isAuthenticating?: boolean;
  onOpenWindow?: (id: any) => void;
}

type TerminalLine = {
  id: number;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
};

export default function Hero({ onStart, isAuthenticating = false, onOpenWindow }: HeroProps) {
  const [bootStatus, setBootStatus] = useState(0);
  const [authStep, setAuthStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixMode, setMatrixMode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBootStatus(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAuthenticating) {
      const steps = [0, 1, 2, 3, 4];
      steps.forEach((step, index) => {
        setTimeout(() => setAuthStep(step), index * 300);
      });
    } else {
      setAuthStep(0);
    }
  }, [isAuthenticating]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      { id: 1, type: 'info', content: 'Welcome to SYNTHWEAVE OS v4.0.2' },
      { id: 2, type: 'info', content: 'Type "help" for available commands' },
      { id: 3, type: 'info', content: '----------------------------------------' },
    ];
    setTerminalHistory(welcomeLines);
    setLineCounter(3);
  }, []);

  const authMessages = [
    { text: "INITIALIZING AUTH MODULE...", icon: Shield },
    { text: "ENCRYPTING CHANNEL...", icon: Lock },
    { text: "VERIFYING CREDENTIALS...", icon: Key },
    { text: "ACCESS GRANTED!", icon: Unlock },
    { text: "LOADING USER PROFILE...", icon: Activity }
  ];

  const commands = {
    help: () => [
      { type: 'success' as const, content: 'Available commands:' },
      { type: 'info' as const, content: '  help        - Show this help message' },
      { type: 'info' as const, content: '  about       - Open About window' },
      { type: 'info' as const, content: '  skills      - Open Skills window' },
      { type: 'info' as const, content: '  experience  - Open Experience window' },
      { type: 'info' as const, content: '  projects    - Open Projects window' },
      { type: 'info' as const, content: '  matrix      - Toggle Matrix rain mode' },
      { type: 'info' as const, content: '  whoami      - Display current user' },
      { type: 'info' as const, content: '  date        - Display current date/time' },
      { type: 'info' as const, content: '  clear       - Clear terminal' },
      { type: 'info' as const, content: '  hack        - ;)' },
    ],
    about: () => {
      onOpenWindow?.('about');
      return [{ type: 'success' as const, content: 'Opening identity.sys...' }];
    },
    skills: () => {
      onOpenWindow?.('skills');
      return [{ type: 'success' as const, content: 'Opening capabilities.lib...' }];
    },
    experience: () => {
      onOpenWindow?.('experience');
      return [{ type: 'success' as const, content: 'Opening evolution.log...' }];
    },
    projects: () => {
      onOpenWindow?.('projects');
      return [{ type: 'success' as const, content: 'Opening projects.src...' }];
    },
    matrix: () => {
      setMatrixMode(!matrixMode);
      return [{ type: 'success' as const, content: `Matrix mode ${!matrixMode ? 'ENABLED' : 'DISABLED'}` }];
    },
    whoami: () => [
      { type: 'info' as const, content: 'cipher_admin' },
      { type: 'info' as const, content: 'Privilege Level: 7 (ROOT)' },
    ],
    date: () => [
      { type: 'info' as const, content: new Date().toString() },
    ],
    clear: () => {
      setTerminalHistory([]);
      return [];
    },
    hack: () => [
      { type: 'success' as const, content: 'Initializing exploit...' },
      { type: 'info' as const, content: 'Bypassing firewall...' },
      { type: 'info' as const, content: 'Escalating privileges...' },
      { type: 'success' as const, content: 'ROOT ACCESS GRANTED!' },
      { type: 'info' as const, content: 'Just kidding! This is a portfolio website 😄' },
    ],
  };

  const [lineCounter, setLineCounter] = useState(0);
  
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd) {
      const inputId = lineCounter + 1;
      setLineCounter(inputId);
      setTerminalHistory(prev => [...prev, { id: inputId, type: 'input', content: `[root@afrizal-os] # ${cmd}` }]);
      
      if (commands[trimmedCmd as keyof typeof commands]) {
        const output = commands[trimmedCmd as keyof typeof commands]();
        output.forEach((line, i) => {
          setTimeout(() => {
            const newId = lineCounter + i + 2;
            setLineCounter(newId);
            setTerminalHistory(prev => [...prev, { id: newId, ...line }]);
          }, i * 100);
        });
      } else {
        const errorId = lineCounter + 2;
        setLineCounter(errorId);
        setTerminalHistory(prev => [...prev, { id: errorId, type: 'error', content: `Command not found: ${cmd}. Type "help" for available commands.` }]);
      }
      
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }
    
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-7xl mx-auto px-6 py-20 lg:py-0 overflow-y-auto lg:overflow-visible no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 lg:space-y-12"
      >
        <div className="inline-flex items-center gap-3 px-4 lg:px-5 py-1.5 lg:py-2 bg-primary/5 border border-primary/20 text-[8px] lg:text-[10px] font-mono font-bold tracking-[0.3em] lg:tracking-[0.4em] text-primary uppercase rounded-full backdrop-blur-md">
          <Activity className="w-3 h-3 animate-pulse" />
          {isAuthenticating ? "SESSION: AUTHENTICATING..." : "SESSION: ANONYMOUS // KERNEL V4.0.2"}
        </div>
        
        <div className="space-y-6 lg:space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-headline font-black tracking-tighter leading-[0.8] text-white">
            CYBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">INTELLIGENCE</span>
          </h1>
          
          <div className="h-1 w-20 lg:w-32 bg-primary" />
          
          <div className="max-w-md border-l-2 border-white/10 pl-6 lg:pl-10 py-1 lg:py-2">
            <p className="text-xs lg:text-base text-muted-foreground font-mono leading-relaxed opacity-70">
              Membangun benteng digital melalui penetrasi tingkat tinggi. Lakukan otentikasi kernel untuk mengekstrak data src.
            </p>
          </div>
          
          {/* Auth Sequence Display */}
          <AnimatePresence>
            {isAuthenticating && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-black/60 border border-primary/30 rounded-lg font-mono"
              >
                {authMessages.slice(0, authStep + 1).map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[10px] mb-1"
                  >
                    <msg.icon className={`w-3 h-3 ${idx === authStep ? 'text-primary animate-pulse' : idx === 3 ? 'text-secondary' : 'text-muted-foreground'}`} />
                    <span className={idx === authStep ? 'text-primary' : idx === 3 ? 'text-secondary font-bold' : 'text-muted-foreground'}>
                      {msg.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="pt-4 lg:pt-6">
            <Button 
              onClick={onStart}
              disabled={isAuthenticating}
              size="lg" 
              className="bg-primary text-black font-black hover:bg-primary/80 group rounded-none h-14 lg:h-16 px-8 lg:px-12 tracking-[0.2em] lg:tracking-[0.3em] shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isAuthenticating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">PROCESSING...</span>
                </span>
              ) : (
                <>
                  AUTH_SEQUENCE.sh
                  <ChevronRight className="ml-2 lg:ml-3 w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Draggable Terminal View on the Right - Interactive & Responsive */}
      <div className="relative hidden lg:block perspective-2000">
        <motion.div
          drag
          dragMomentum={false}
          initial={{ rotateY: 15, opacity: 0, x: 50 } as any}
          animate={{ rotateY: 5, opacity: 1, x: 0 } as any}
          whileDrag={{ rotateY: 0, scale: 1.05, zIndex: 200 } as any}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 cursor-grab active:cursor-grabbing pointer-events-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-window bg-black/25 rounded-xl overflow-hidden border border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[9px] font-mono text-white/40 tracking-widest flex items-center gap-2">
                {matrixMode ? <Skull className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
                {isAuthenticating ? "/ROOT/SYS/ AUTH_LOG.LOG" : "/ROOT/SYS/ KERNEL_BOOT.LOG"}
              </div>
            </div>
            
            <div 
              ref={terminalRef}
              className="p-4 font-mono text-[11px] space-y-1 h-[350px] overflow-y-auto custom-scrollbar"
            >
              {isAuthenticating ? (
                <>
                  <div className="flex gap-3 text-secondary mb-3">
                    <Terminal className="w-3 h-3" />
                    <span>[root@afrizal-os] # auth --level 7</span>
                  </div>
                  <div className="space-y-1 text-white/40">
                    <div className="text-accent/70">[AUTH] Initializing security context...</div>
                    <div className="text-primary/70">[AUTH] TLS 1.3 handshake complete</div>
                    <div>[AUTH] Verifying biometric hash...</div>
                    <div className="text-secondary/70">[AUTH] Token generated: XXXX-XXXX-XXXX</div>
                    <div className="text-accent/70">[AUTH] Privilege escalation: SUCCESS</div>
                    <div className="text-primary animate-pulse">[AUTH] Welcome, Cipher_Admin</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3 text-secondary mb-3">
                    <Terminal className="w-3 h-3" />
                    <span>[root@afrizal-os] # boot --verbose</span>
                  </div>
                  <div className="space-y-1 text-white/40 mb-3">
                    <div className="text-primary/70">[ 0.000000] Linux version 6.5.0-afrizal-kernel</div>
                    <div>[ 0.000124] Command line: BOOT_IMAGE=/vmlinuz</div>
                    <div className="text-secondary/70">[ 0.002451] x86/fpu: Supporting XSAVE feature 0x001</div>
                    <div>[ 0.458210] Network: Interface up (UP_GIGA)</div>
                    <div className="text-accent/70">[ 1.254821] Security: Cryptographic Modules... OK</div>
                    <div className="text-primary/70">[ 2.145892] Mounting: /dev/sda1 {"->"} /root/sys</div>
                    <div>[ 3.842109] Daemon: Scanning for vulnerabilities...</div>
                    <div className="text-secondary/50">[ 4.125821] System: All modules verified.</div>
                  </div>
                  
                  {/* Interactive Terminal History */}
                  {terminalHistory.map((line) => (
                    <div 
                      key={line.id}
                      className={
                        line.type === 'input' ? 'text-secondary' :
                        line.type === 'success' ? 'text-secondary' :
                        line.type === 'error' ? 'text-red-400' :
                        'text-muted-foreground'
                      }
                    >
                      {line.content}
                    </div>
                  ))}
                  
                  {/* Command Input */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary">
                      {matrixMode ? <Zap className="w-3 h-3 inline" /> : '>'}
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none border-none text-white placeholder-white/20"
                      placeholder="Type a command..."
                      autoFocus
                    />
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2 h-4 bg-primary"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-4 pt-0 space-y-3 border-t border-white/5">
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/60">
                <span className="text-primary">{isAuthenticating ? "AUTH_STATUS" : "LOAD_STATUS"}</span>
                <span>{isAuthenticating ? "100%" : `${bootStatus}%`}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: isAuthenticating ? "100%" : `${bootStatus}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Glow behind terminal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      </div>
    </div>
  );
}

