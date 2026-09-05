import { useState } from 'react';
import type { FC } from 'react';
import { EXPERIENCES, CERTIFICATIONS } from '../data/portfolioData';
import { Briefcase, Award, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'internships' | 'certifications'>('all');

  const workExperiences = EXPERIENCES.filter((exp) => exp.type !== 'Education');

  return (
    <section id="experience" className="py-20 relative border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Industry Work & Certifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Experience
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
            {(['all', 'internships', 'certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  activeFilter === tab
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        {(activeFilter === 'all' || activeFilter === 'internships') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {workExperiences.map((exp, idx) => (
              <div
                key={idx}
                className="minimal-card p-6 rounded-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{exp.period}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-medium text-blue-400 mt-0.5">
                      {exp.organization} • <span className="text-zinc-400">{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                        <span className="text-zinc-600 mt-1 shrink-0 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Grid */}
        {(activeFilter === 'all' || activeFilter === 'certifications') && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              <span>Verified Accreditations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="minimal-card p-5 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {cert.name}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
