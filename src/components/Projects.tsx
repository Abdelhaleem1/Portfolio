import { useState } from 'react';
import type { FC } from 'react';
import { InteractiveYolo } from './InteractiveYolo';
import { InteractiveXray } from './InteractiveXray';
import { FolderGit2 } from 'lucide-react';

export const Projects: FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'yolo' | 'resnet'>('both');

  return (
    <section id="projects" className="py-20 relative border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <span>Machine Learning Artifacts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Projects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'both'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All (2)
            </button>
            <button
              onClick={() => setActiveTab('yolo')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'yolo'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              YOLOv8 Traffic Signs
            </button>
            <button
              onClick={() => setActiveTab('resnet')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'resnet'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ResNet50 Fracture Diagnosis
            </button>
          </div>
        </div>

        {/* Project Simulators */}
        <div className="space-y-10">
          {(activeTab === 'both' || activeTab === 'yolo') && (
            <div className="minimal-card rounded-2xl p-4 sm:p-6">
              <InteractiveYolo />
            </div>
          )}

          {(activeTab === 'both' || activeTab === 'resnet') && (
            <div className="minimal-card rounded-2xl p-4 sm:p-6">
              <InteractiveXray />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
