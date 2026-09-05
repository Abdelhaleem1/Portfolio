import { useState } from 'react';
import type { FC } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Search } from 'lucide-react';

export const SkillsGrid: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillApplications: Record<string, string> = {
    'PyTorch': 'Utilized at Fly Rank AI for classification/regression pipelines & YOLO fine-tuning.',
    'TensorFlow': 'Core framework for Bone Fracture ResNet50 transfer learning & custom CNN.',
    'Keras': 'Applied for data augmentation pipelines, layer definitions & callbacks.',
    'Scikit-learn': 'Engineered tabular pipelines, cross-validation & feature preprocessors.',
    'YOLOv8': 'Built real-time 8-class traffic sign detector with 92% mAP@50.',
    'OpenCV': 'Implemented video stream processing, letterboxing & frame annotation in Streamlit.',
    'CNN Architectures': 'Trained from scratch baseline models for medical imaging benchmarks.',
    'Transfer Learning (ResNet)': 'Fine-tuned pre-trained ImageNet weights achieving 99% accuracy.',
    'Python': 'Primary language for research, automation, and full-stack ML workflows.',
    'C++': 'Deep foundation through Cairo University coursework in data structures & algorithms.',
    'SQL': 'Relational database schema modeling, queries, and data extraction pipelines.',
    'Streamlit': 'Interactive web application frontends for real-time model demonstrations.',
    'FastAPI': 'REST API development for low-latency model inference endpoints.',
    'Azure AI': 'Explored through Microsoft DEPI track for cloud MLOps and model deployment.'
  };

  return (
    <section id="skills" className="py-20 relative border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Technical Toolchain</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Skills
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850'
            }`}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat.title
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((cat) => {
            if (selectedCategory !== 'All' && selectedCategory !== cat.title) return null;

            const filteredSkills = cat.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={cat.title}
                className="minimal-card p-4 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold text-zinc-200 border-b border-zinc-850 pb-2">
                  {cat.title}
                </div>

                <div className="space-y-2">
                  {filteredSkills.map((skill) => {
                    const isSelected = activeSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setActiveSkill(isSelected ? null : skill.name)}
                        className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-zinc-900 border border-zinc-700'
                            : 'bg-zinc-950 border border-zinc-850 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium mb-1">
                          <span className={isSelected ? 'text-white font-semibold' : 'text-zinc-300'}>
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="w-full h-1 bg-zinc-850 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
                            {skillApplications[skill.name] || 'Core engineering proficiency across production projects.'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
