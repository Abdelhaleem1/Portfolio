import { useState, useEffect } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsGrid } from './components/SkillsGrid';
import { ContactFooter } from './components/ContactFooter';
import { TerminalDrawer } from './components/TerminalDrawer';
import { Terminal } from 'lucide-react';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard shortcut: Pressing ` or Ctrl+K opens the ML terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Interactive Neural Canvas Background spanning across the entire website */}
      <NeuralBackground />

      {/* Main Content Layout in User-Specified Order */}
      <div className="relative z-10">
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
        
        <main>
          {/* 1. Overview */}
          <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

          {/* 2. Education */}
          <Education />

          {/* 3. Projects */}
          <Projects />

          {/* 4. Experience */}
          <ExperienceTimeline />

          {/* 5. Skills */}
          <SkillsGrid />
        </main>

        {/* 6. Contact */}
        <ContactFooter />
      </div>

      {/* Floating CLI Pill on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 shadow-xl backdrop-blur-md transition-all text-xs font-mono group"
          title="Open Terminal (Shortcut: Ctrl+K or `)"
        >
          <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="hidden sm:inline font-medium">Terminal</span>
          <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Interactive ML Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

    </div>
  );
}

export default App;
