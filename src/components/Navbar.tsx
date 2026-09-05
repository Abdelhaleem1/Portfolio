import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Terminal, FileText, Send, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 py-3.5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-950/30 border border-blue-500/40 flex items-center justify-center p-1.5 group-hover:border-blue-400 group-hover:bg-blue-900/30 transition-all shadow-[0_0_10px_rgba(59,130,246,0.15)]">
            <svg className="w-full h-full text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="4.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
              <circle cx="4.5" cy="18.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
              <circle cx="19.5" cy="18.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
              <line x1="12" y1="7" x2="6" y2="16" />
              <line x1="12" y1="7" x2="18" y2="16" />
              <line x1="7" y1="18.5" x2="17" y2="18.5" strokeDasharray="2 2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                Abdelhalim Ahmed
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">AI & ML Engineer</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121215]/80 border border-zinc-800 rounded-full px-4 py-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Terminal button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
            title="Open ML Console (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>terminal</span>
          </button>

          {/* CV Button with Drive Link */}
          <a
            href="https://drive.google.com/file/d/1H4OpYcB7vEhT3L58ItWHEwhNKNaHZTvR/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors bg-zinc-900 hover:bg-zinc-800"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>CV</span>
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg text-xs"
          >
            <Terminal className="w-4 h-4 text-zinc-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg bg-zinc-900"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-zinc-800">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Abdelhalim</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
