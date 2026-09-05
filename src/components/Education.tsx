import type { FC } from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Education: FC = () => {
  const coursework = [
    { title: 'Probability & Statistics', desc: 'Hypothesis testing, distributions, Bayesian inference for ML modeling' },
    { title: 'Advanced Linear Algebra', desc: 'Matrix decompositions, eigenvalues/vectors, PCA, tensor operations' },
    { title: 'Database Systems & SQL', desc: 'Relational schema design, query optimization, indexing & ACID compliance' },
    { title: 'Data Structures & Algorithms', desc: 'C++ implementation of asymptotic complexities, trees, graphs, and dynamic programming' },
  ];

  return (
    <section id="education" className="py-20 relative border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Education
          </h2>
        </div>

        {/* University Main Card */}
        <div className="minimal-card p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono">
                  B.Sc. in Artificial Intelligence
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>2024 – 2028</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Cairo, Egypt</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Cairo University
                </h3>
                <p className="text-sm font-medium text-zinc-300 mt-0.5">
                  Faculty of Computing and Artificial Intelligence (FCAI)
                </p>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Competitive curriculum spanning theoretical mathematics, discrete structures, algorithm design, and modern deep learning methodologies.
              </p>
            </div>

            {/* Academic Standout Numbers */}
            <div className="grid grid-cols-2 gap-3 shrink-0 sm:w-72">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-mono font-bold text-white">#6</div>
                <div className="text-xs font-medium text-zinc-300 mt-0.5">Rank among 1,500+</div>
                <div className="text-[10px] text-zinc-500 font-mono">Top Tier Honor</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-300">
                  <span className="text-xs font-bold text-emerald-400">GPA</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">3.74</div>
                <div className="text-xs font-medium text-zinc-300 mt-0.5">Cumulative / 4.0</div>
                <div className="text-[10px] text-zinc-500 font-mono">Distinction</div>
              </div>
            </div>

          </div>

          {/* Relevant Coursework */}
          <div className="pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>Relevant Coursework</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {coursework.map((course, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{course.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {course.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
