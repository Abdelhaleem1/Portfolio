import { useState, useRef, useEffect } from 'react';
import type { ReactNode, FC, KeyboardEvent } from 'react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  response: ReactNode;
}

export const TerminalDrawer: FC<TerminalDrawerProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      response: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">Welcome to Abdelhalim Ahmed's Interactive ML Terminal v2.4</p>
          <p className="text-xs text-slate-400">Type <span className="text-emerald-400 font-mono">help</span> to view available commands, or click any quick command below.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let res: React.ReactNode;

    switch (trimmed) {
      case 'help':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
              <div><span className="text-emerald-400">about</span> - Summary profile</div>
              <div><span className="text-emerald-400">skills</span> - Core ML stack</div>
              <div><span className="text-emerald-400">projects</span> - View ML projects</div>
              <div><span className="text-emerald-400">yolo</span> - YOLOv8 model specs</div>
              <div><span className="text-emerald-400">resnet</span> - ResNet50 benchmark</div>
              <div><span className="text-emerald-400">edu</span> - University details</div>
              <div><span className="text-emerald-400">stats</span> - Key rankings & metrics</div>
              <div><span className="text-emerald-400">eval</span> - Run simulated test</div>
              <div><span className="text-emerald-400">contact</span> - Email & Phone</div>
              <div><span className="text-emerald-400">clear</span> - Clear terminal</div>
              <div><span className="text-emerald-400">exit</span> - Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><strong className="text-white">Name:</strong> {PERSONAL_INFO.name}</p>
            <p><strong className="text-white">Role:</strong> {PERSONAL_INFO.title}</p>
            <p><strong className="text-white">Institution:</strong> Cairo University (Rank #6 / 1500+, 3.74 GPA)</p>
            <p><strong className="text-white">Internships:</strong> Machine Learning Engineer Intern at Fly Rank AI | Microsoft Trainee (DEPI)</p>
            <p className="text-slate-400 pt-1">{PERSONAL_INFO.summary}</p>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p><span className="text-cyan-400 font-bold">Languages:</span> Python, C++, SQL, JS, Java</p>
            <p><span className="text-emerald-400 font-bold">ML/DL:</span> PyTorch, TensorFlow, Keras, Scikit-learn</p>
            <p><span className="text-indigo-400 font-bold">Vision:</span> OpenCV, YOLOv8, CNNs, ResNet50, Grad-CAM</p>
            <p><span className="text-purple-400 font-bold">Tools:</span> Git/GitHub, Streamlit, FastAPI, Jupyter, Azure AI</p>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs text-slate-300">
            {PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500 pl-2">
                <p className="font-bold text-white">{p.title} ({p.year})</p>
                <p className="text-slate-400">{p.summary}</p>
                <p className="text-cyan-400 font-mono text-[11px]">Tags: {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'yolo':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">[YOLOv8l Traffic Sign Architecture]</p>
            <p>Dataset: Roboflow 8-class (Stop, Speed Limit, Pedestrian, Road Work...)</p>
            <p>Training: 100 Epochs, Google Colab GPU, AdamW Optimizer</p>
            <p>mAP@50: <span className="text-emerald-400 font-bold">92.0%</span> | Precision: <span className="text-cyan-400 font-bold">93.0%</span> | Recall: <span className="text-indigo-400 font-bold">88.0%</span></p>
            <p>Frontend: Streamlit Web App with live webcam feed and bounding-box inference.</p>
          </div>
        );
        break;

      case 'resnet':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">[ResNet50 Transfer Learning vs Custom CNN]</p>
            <p>Custom CNN Baseline: 90% Test Accuracy | 0.25 Loss</p>
            <p>Fine-Tuned ResNet50: <span className="text-emerald-400 font-bold">99% Test Accuracy</span> | <span className="text-cyan-400 font-bold">0.05 Loss</span> (-80% error)</p>
            <p>Augmentations: Shear, Zoom, Shift, Rotation, Normalization.</p>
            <p>Interpretability: Grad-CAM attention maps over cortical hairline breaks.</p>
          </div>
        );
        break;

      case 'edu':
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">Cairo University — Faculty of Computing and Artificial Intelligence</p>
            <p>Degree: Bachelor of Science in Artificial Intelligence (2024 – 2028)</p>
            <p>Rank: <strong className="text-white">#6 among 1,500+ students</strong></p>
            <p>Cumulative GPA: <strong className="text-emerald-400">3.74 / 4.0</strong></p>
            <p className="text-slate-400">Coursework: Probability & Statistics, Advanced Linear Algebra, Relational Databases, Algorithms.</p>
          </div>
        );
        break;

      case 'stats':
        res = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {PERSONAL_INFO.stats.map((s, i) => (
              <div key={i} className="bg-white/5 p-2 rounded border border-white/5">
                <div className="text-slate-400">{s.label}:</div>
                <div className="text-cyan-400 font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'eval':
        res = (
          <div className="space-y-1 text-xs font-mono text-emerald-400">
            <p>[+] Initializing PyTorch GPU device CUDA:0...</p>
            <p>[+] Loading checkpoint weights for ResNet50_BoneClassifier.pt...</p>
            <p>[+] Running test partition batch (N=500 samples)...</p>
            <p className="text-cyan-300">========================================</p>
            <p>Test Loss: 0.048 | Accuracy: 99.2% | Inference: 8.4ms/frame</p>
            <p className="text-white font-bold">RESULT: PASS (All validation thresholds exceeded)</p>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-400 underline">{PERSONAL_INFO.email}</a></p>
            <p>Phone: <span className="text-emerald-400">{PERSONAL_INFO.phone}</span></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 underline">{PERSONAL_INFO.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></p>
            <p>Location: Cairo, Egypt</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        res = (
          <div className="text-xs text-rose-400 font-mono">
            Command not recognized: '{trimmed}'. Type <span className="text-emerald-400 font-bold">help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, response: res }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = ['help', 'about', 'yolo', 'resnet', 'stats', 'eval', 'contact'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full bg-[#09090b] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
        isMaximized ? 'h-[95vh] max-w-6xl' : 'h-[560px] max-w-3xl'
      }`}>
        
        {/* Terminal Title Bar */}
        <div className="bg-[#121215] px-4 py-3 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors" />
              <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-amber-500 transition-colors" />
              <button className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-emerald-500 transition-colors" />
            </div>
            <div className="ml-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>abdelhalim@ml-workstation:~</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title="Toggle Size"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Bar */}
        <div className="bg-[#09090b] px-4 py-2 border-b border-zinc-850 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-zinc-500 shrink-0">Quick run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs select-text">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <span className="text-zinc-500">guest@abdelhalim-ai:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.response}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <div className="p-3 bg-[#121215] border-t border-zinc-800 flex items-center gap-2">
          <span className="text-zinc-500 font-mono text-xs font-bold shrink-0">
            guest@abdelhalim-ai:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'skills', 'projects', 'yolo', 'eval'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
          <button
            onClick={() => {
              executeCommand(inputVal);
              setInputVal('');
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors"
            title="Execute Command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
