import { useState } from 'react';
import { SAMPLE_YOLO_SCENES } from '../data/sampleDemos';
import type { YoloSampleScene, YoloDetection } from '../data/sampleDemos';
import { Sliders, Eye, EyeOff, Layers, Info, CheckCircle2 } from 'lucide-react';

export const InteractiveYolo = () => {
  const [selectedScene, setSelectedScene] = useState<YoloSampleScene>(SAMPLE_YOLO_SCENES[0]);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.50);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredDetection, setHoveredDetection] = useState<YoloDetection | null>(null);

  const activeDetections = selectedScene.detections.filter(
    (d) => d.confidence >= confidenceThreshold
  );

  return (
    <div className="space-y-6">
      
      {/* Project Title & Metric Summary */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
              YOLOv8l • 2025
            </span>
            <span className="text-xs text-zinc-400">Streamlit & PyTorch</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Real-Time Traffic Sign Detection System
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Trained on Roboflow dataset covering 8 sign classes (Stop, Speed Limit, Pedestrian, Road Work, etc.) for 100 epochs on GPU with AdamW and mosaic augmentation.
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/Abdelhaleem1/Traffic-Sign-Detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-750 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>View Source on GitHub</span>
              <span className="text-zinc-500 ml-0.5">↗</span>
            </a>
          </div>
        </div>

        {/* Project Metrics Box */}
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3 shrink-0">
          <div className="text-center px-2.5 border-r border-zinc-800">
            <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">92%</div>
            <div className="text-[10px] text-zinc-400 font-mono">mAP@50</div>
          </div>
          <div className="text-center px-2.5 border-r border-zinc-800">
            <div className="text-lg sm:text-xl font-mono font-bold text-blue-400">93%</div>
            <div className="text-[10px] text-zinc-400 font-mono">Precision</div>
          </div>
          <div className="text-center px-2.5">
            <div className="text-lg sm:text-xl font-mono font-bold text-zinc-200">88%</div>
            <div className="text-[10px] text-zinc-400 font-mono">Recall</div>
          </div>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Visualizer Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Preset Buttons Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {SAMPLE_YOLO_SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedScene.id === scene.id
                      ? 'bg-zinc-800 text-white border border-zinc-700'
                      : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800/80'
                  }`}
                >
                  {scene.title}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-lg select-none">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative bg-zinc-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedScene.svgBackground}
                alt={selectedScene.title}
                className="w-full h-full object-cover"
              />

              {/* Bounding Boxes Layer */}
              {showBoxes && (
                <div className="absolute inset-0 pointer-events-auto">
                  {activeDetections.map((det) => {
                    const isHovered = hoveredDetection?.id === det.id;
                    return (
                      <div
                        key={det.id}
                        onMouseEnter={() => setHoveredDetection(det)}
                        onMouseLeave={() => setHoveredDetection(null)}
                        style={{
                          left: `${det.x}%`,
                          top: `${det.y}%`,
                          width: `${det.w}%`,
                          height: `${det.h}%`,
                        }}
                        className={`absolute transition-all cursor-pointer rounded border-2 ${
                          isHovered
                            ? 'border-blue-400 bg-blue-500/20 z-20 scale-[1.01]'
                            : 'border-emerald-400 bg-emerald-500/10 hover:border-blue-400 z-10'
                        }`}
                      >
                        {showLabels && (
                          <div className="absolute -top-6 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono font-medium text-white shadow-sm whitespace-nowrap">
                            <span className="text-zinc-200">{det.label}</span>
                            <span className="text-emerald-400">{(det.confidence * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* In-Frame Status Bar */}
            <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">Inference: {selectedScene.meta.inferenceTime}</span>
                <span>{selectedScene.meta.resolution}</span>
              </div>
              <span className="text-zinc-500">{selectedScene.meta.model}</span>
            </div>
          </div>

          {/* Hovered Detection Metadata Card */}
          {hoveredDetection ? (
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 text-xs">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-white font-bold">{hoveredDetection.label}</span>
                  <span className="text-emerald-400 font-mono text-[11px]">
                    Confidence: {(hoveredDetection.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5">{hoveredDetection.description}</p>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 text-[11px] text-zinc-500 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              <span>Hover over any bounding box to inspect live inference confidence and metadata.</span>
            </div>
          )}

        </div>

        {/* Controls Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Confidence Threshold</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400">
                {(confidenceThreshold * 100).toFixed(0)}%
              </span>
            </div>

            {/* Threshold Slider */}
            <div>
              <input
                type="range"
                min="0.10"
                max="0.98"
                step="0.02"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>10% (Low)</span>
                <span>{activeDetections.length} Active</span>
                <span>98% (Strict)</span>
              </div>
            </div>

            {/* Display Toggles */}
            <div className="pt-2 border-t border-zinc-850 space-y-2">
              <div className="text-[11px] font-medium text-zinc-400">Display Options</div>
              
              <button
                onClick={() => setShowBoxes(!showBoxes)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Bounding Boxes</span>
                </span>
                {showBoxes ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
              </button>

              <button
                onClick={() => setShowLabels(!showLabels)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Class Labels</span>
                </span>
                {showLabels ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
              </button>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs text-zinc-400">
            <div className="text-xs font-semibold text-zinc-200">Engineering Architecture</div>
            <ul className="space-y-1.5 text-[11px] pl-0.5">
              <li>• <strong className="text-zinc-300">Model:</strong> YOLOv8l (GPU fine-tuned)</li>
              <li>• <strong className="text-zinc-300">Optimizer:</strong> AdamW (100 Epochs)</li>
              <li>• <strong className="text-zinc-300">Augmentations:</strong> Mosaic, Flip, Rotation</li>
              <li>• <strong className="text-zinc-300">Frontend:</strong> Streamlit web application</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
