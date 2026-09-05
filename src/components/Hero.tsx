import type { FC } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Send, MapPin, FileText } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: FC<HeroProps> = () => {
  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Overview Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>Cairo, Egypt • Available for ML Engineering Roles</span>
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-400 mt-2">
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Core USP Callout - Minimal Linear Style */}
            <div className="border-l-2 border-blue-500 bg-zinc-900/60 pl-4 py-3 pr-4 rounded-r-xl">
              <p className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed">
                I don’t just build ML models—I focus on turning them into practical, deployable AI solutions.
              </p>
            </div>

            {/* CV Overview Summary */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              {PERSONAL_INFO.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View CV</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4 text-zinc-400" />
                <span>Get in Touch</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean Personal Photo (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="max-w-xs sm:max-w-sm w-full">
              <div className="rounded-2xl p-1.5 bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
                <div className="rounded-xl overflow-hidden aspect-[4/5] bg-zinc-950">
                  <img
                    src="./profile.jpg"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
