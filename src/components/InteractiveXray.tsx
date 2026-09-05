import { useState } from 'react';
import { SAMPLE_XRAYS } from '../data/sampleDemos';
import type { XraySample } from '../data/sampleDemos';
import { CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const InteractiveXray = () => {
  const [selectedCase, setSelectedCase] = useState<XraySample>(SAMPLE_XRAYS[0]);
  const [activeModel, setActiveModel] = useState<'resnet50' | 'customCnn'>('resnet50');
  const [gradCamBlend, setGradCamBlend] = useState<number>(65);

  const currentPrediction = activeModel === 'resnet50' ? selectedCase.resnet50 : selectedCase.customCnn;
  const isFractured = currentPrediction.prediction === 'Fractured';

  return (
    <div className="space-y-6">
      
      {/* Title & Model Selector Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
              ResNet50 vs CNN • 2025
            </span>
            <span className="text-xs text-zinc-400">TensorFlow & Keras</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Clinical Bone Fracture Diagnosis & Grad-CAM
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Binary classification benchmark comparing custom scratch CNN vs transfer learning ResNet50 with clinical data augmentations and visual activation maps.
          </p>
          <div className="pt-2">
            <a
              href="https://www.kaggle.com/code/halimdev/bone-fracture-detection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-750 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M18.825 23.859c-.022.046-.054.088-.092.123s-.084.053-.133.053h-3.418a.38.38 0 0 1-.301-.144l-4.735-6.331-1.391 1.332v4.757a.385.385 0 0 1-.385.385H5.431a.385.385 0 0 1-.385-.385V.385C5.046.172 5.218 0 5.431 0h2.939c.213 0 .385.172.385.385v14.492l5.864-5.918a.387.387 0 0 1 .275-.114h3.585c.106 0 .195.043.266.128.071.085.089.184.053.298l-5.639 5.567 6.046 8.807a.377.377 0 0 1 .02.219Z"/>
              </svg>
              <span>View Notebook on Kaggle</span>
              <span className="text-zinc-500 ml-0.5">↗</span>
            </a>
          </div>
        </div>

        {/* Model Switcher Segmented Control */}
        <div className="flex items-center p-1 bg-zinc-950 border border-zinc-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveModel('resnet50')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeModel === 'resnet50'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ResNet50 (Fine-Tuned)
          </button>
          <button
            onClick={() => setActiveModel('customCnn')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeModel === 'customCnn'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Custom CNN
          </button>
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Radiograph Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Case Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SAMPLE_XRAYS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => setSelectedCase(sample)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCase.id === sample.id
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800/80'
                }`}
              >
                {sample.name}
              </button>
            ))}
          </div>

          {/* Radiograph Viewport */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg select-none">
            <div className="w-full flex items-center justify-center bg-black/90 p-3 sm:p-5">
              <div className="relative aspect-square w-full max-w-[360px] sm:max-w-[390px] rounded-lg overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                
                {/* Real Radiograph Image */}
                <img
                  src={selectedCase.imageUrl}
                  alt={selectedCase.name}
                  className="w-full h-full object-cover select-none"
                />

                {/* Grad-CAM Heatmap Simulator */}
                {activeModel === 'resnet50' && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{ opacity: gradCamBlend / 100 }}
                  >
                    {selectedCase.resnet50.gradCamHotspots.map((spot, i) => (
                      <div
                        key={i}
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          width: `${spot.radius * 2.5}%`,
                          height: `${spot.radius * 2.5}%`,
                          transform: 'translate(-50%, -50%)',
                          background: spot.intensity > 0.4
                            ? `radial-gradient(circle, rgba(239, 68, 68, ${spot.intensity}) 0%, rgba(245, 158, 11, ${spot.intensity * 0.6}) 45%, transparent 75%)`
                            : `radial-gradient(circle, rgba(59, 130, 246, ${spot.intensity * 1.5}) 0%, rgba(14, 165, 233, ${spot.intensity}) 45%, transparent 70%)`,
                        }}
                        className="absolute rounded-full blur-md"
                      />
                    ))}
                  </div>
                )}

                {/* Diagnosis Badge */}
                <div className="absolute top-2 left-2">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 shadow-sm border ${
                    isFractured
                      ? 'bg-zinc-950/90 border-red-500/40 text-red-300 backdrop-blur-sm'
                      : 'bg-zinc-950/90 border-emerald-500/40 text-emerald-300 backdrop-blur-sm'
                  }`}>
                    {isFractured ? <AlertTriangle className="w-3 h-3 text-red-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    <span>{currentPrediction.prediction} {(currentPrediction.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-zinc-950/90 border border-zinc-800 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400">
                  Truth: <span className={selectedCase.groundTruth === 'Fractured' ? 'text-red-400 font-medium' : 'text-emerald-400 font-medium'}>{selectedCase.groundTruth}</span>
                </div>
              </div>
            </div>

            {/* Grad-CAM Heatmap Slider */}
            <div className="bg-zinc-950 px-4 py-2.5 border-t border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Grad-CAM Activation Heatmap Blend</span>
                </span>
                <span className="text-zinc-200 font-bold">{gradCamBlend}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gradCamBlend}
                disabled={activeModel !== 'resnet50'}
                onChange={(e) => setGradCamBlend(parseInt(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5 disabled:opacity-30"
              />
            </div>
          </div>

          {/* Clinical Assessment */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">Radiographic Note:</strong> {selectedCase.clinicalNotes}
          </div>

        </div>

        {/* Comparison & Metrics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="text-xs font-semibold text-zinc-200 border-b border-zinc-850 pb-2">
              Performance Benchmark
            </div>

            {/* Accuracy Comparison Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-300">Fine-Tuned ResNet50</span>
                  <span className="text-emerald-400 font-bold">99.0% Accuracy</span>
                </div>
                <div className="w-full h-2 bg-zinc-850 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Custom CNN Baseline</span>
                  <span className="text-zinc-300 font-bold">90.0% Accuracy</span>
                </div>
                <div className="w-full h-2 bg-zinc-850 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-600 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            {/* Loss Reduction */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 font-mono">ResNet50 Loss</div>
                <div className="text-lg font-mono font-bold text-emerald-400">0.05</div>
              </div>
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-400 font-mono">Custom CNN Loss</div>
                <div className="text-lg font-mono font-bold text-zinc-400">0.25</div>
              </div>
            </div>

            {/* Augmentation tags */}
            <div className="pt-2 border-t border-zinc-850 space-y-1.5">
              <div className="text-[11px] font-medium text-zinc-400">Clinical Augmentations (Keras)</div>
              <div className="flex flex-wrap gap-1">
                {['Rotation (±25°)', 'Shift (0.15)', 'Shear (0.2)', 'Zoom (0.2)', 'Horizontal Flip'].map((aug) => (
                  <span key={aug} className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-zinc-800">
                    {aug}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
