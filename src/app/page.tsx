
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import FloatingBackground from '@/components/FloatingBackground';

export default function Home() {
  return (
    <main className="relative selection:bg-primary selection:text-white">
      <FloatingBackground />
      <Navigation />
      
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="glass px-4 py-2 rounded-full text-[10px] font-code text-accent uppercase tracking-widest flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-accent" />
          Active Session: Verified
        </div>
      </div>
    </main>
  );
}
