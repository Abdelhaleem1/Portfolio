export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  tags: string[];
  metrics: { label: string; value: string; color: string }[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  badge: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'Internship' | 'Trainee' | 'Education';
  bullets: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; featured?: boolean }[];
}

export const PERSONAL_INFO = {
  name: "Abdelhalim Ahmed",
  title: "AI & Machine Learning Engineer",
  tagline: "Building high-performance computer vision pipelines & end-to-end deep learning models.",
  email: "abdelhalimahmed.dev@gmail.com",
  phone: "+20 112 487 4681",
  domain: "abdelhalim.dev",
  github: "https://github.com/Abdelhaleem1",
  linkedin: "https://www.linkedin.com/in/abdelhalim-ahmed-salah/",
  resumeUrl: "https://drive.google.com/file/d/1H4OpYcB7vEhT3L58ItWHEwhNKNaHZTvR/view?usp=sharing",
  location: "Cairo, Egypt",
  summary: "AI student at Cairo University with a strong foundation in Machine Learning, Data Analysis, and Artificial Intelligence. Experienced in developing end-to-end ML projects, including data preprocessing, feature engineering, model development, evaluation, and deployment. Proficient in Python and key ML libraries, with strong analytical and problem-solving skills.",
  stats: [
    { label: "University Rank", value: "#6 / 1500+", detail: "Cairo University FCAI" },
    { label: "Cumulative GPA", value: "3.74 / 4.0", detail: "Top Tier Honor" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "traffic-sign-detector",
    title: "Real-Time Traffic Sign Detection System",
    year: "2025",
    category: "Computer Vision & Object Detection",
    badge: "YOLOv8 Large Architecture",
    summary: "High-precision real-time object detector trained on 8 traffic sign classes with dynamic bounding box inference, deployed via interactive Streamlit web application with live webcam and file upload support.",
    tags: ["Python", "YOLOv8", "OpenCV", "Streamlit", "Roboflow", "PyTorch", "GPU Acceleration"],
    metrics: [
      { label: "mAP@50", value: "92%", color: "text-emerald-400" },
      { label: "Precision", value: "93%", color: "text-cyan-400" },
      { label: "Recall", value: "88%", color: "text-indigo-400" },
      { label: "Epochs", value: "100", color: "text-purple-400" },
    ],
    highlights: [
      "Trained YOLOv8l architecture on Google Colab (GPU) for 100 epochs using AdamW optimizer with custom learning rate schedules.",
      "Engineered comprehensive augmentation pipeline including mosaic, random horizontal flip, and rotation to handle complex weather/lighting conditions.",
      "Covered 8 critical traffic sign classes: Stop, Speed Limit, Pedestrian, Road Work, Yield, School Zone, No Entry, and Turn Signs.",
      "Built and deployed a zero-latency Streamlit web interface supporting both static image inspection and live webcam stream processing."
    ],
    githubUrl: "https://github.com/Abdelhaleem1/Traffic-Sign-Detector",
    demoUrl: "#traffic-sign-demo"
  },
  {
    id: "bone-fracture-detection",
    title: "Clinical Bone Fracture Diagnosis & Grad-CAM Heatmaps",
    year: "2025",
    category: "Medical AI & Deep Transfer Learning",
    badge: "ResNet50 vs Custom CNN",
    summary: "Deep learning comparative study for binary fracture detection in clinical X-ray imagery. Employs fine-tuned ResNet50 transfer learning achieving 99% test accuracy alongside Grad-CAM visual interpretability.",
    tags: ["TensorFlow", "Keras", "ResNet50", "CNN", "Transfer Learning", "Medical Imaging", "Grad-CAM"],
    metrics: [
      { label: "ResNet50 Accuracy", value: "99%", color: "text-emerald-400" },
      { label: "Test Loss", value: "0.05", color: "text-cyan-400" },
      { label: "Custom CNN Accuracy", value: "90%", color: "text-amber-400" },
      { label: "Loss Reduction", value: "-80%", color: "text-purple-400" },
    ],
    highlights: [
      "Engineered a rigorous binary classification pipeline benchmarking an initial custom multi-layer CNN against fine-tuned ResNet50 residual architecture.",
      "Applied clinical-grade data augmentation: affine rotations, horizontal/vertical shifts, shear transformations, zoom scaling, and contrast normalizations.",
      "Boosted test generalization from 90% (loss: 0.25) to 99% (loss: 0.05) by leveraging pre-trained ImageNet feature extractors and calibrated dense heads.",
      "Integrated visual interpretability (Grad-CAM) to spotlight diagnostic attention maps over hairline fractures for clinical verification."
    ],
    githubUrl: "https://www.kaggle.com/code/halimdev/bone-fracture-detection",
    demoUrl: "#bone-fracture-demo"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Machine Learning Engineer Intern",
    organization: "Fly Rank AI",
    period: "July 2026 – Present",
    location: "Cairo, Egypt (Hybrid)",
    type: "Internship",
    bullets: [
      "Develop predictive machine learning models for high-scale classification and regression tasks utilizing PyTorch, TensorFlow, and Scikit-learn.",
      "Design and implement robust end-to-end ML pipelines spanning automated data ingestion, preprocessing, feature engineering, model training, evaluation, and production deployment.",
      "Conduct hyperparameter optimization and cross-validation protocols to maximize generalization on real-world tabular and sensory datasets."
    ],
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "ML Pipelines", "Feature Engineering", "Data Modeling"]
  },
  {
    role: "Microsoft Machine Learning Engineer Trainee",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "July 2026 – Present",
    location: "Cairo, Egypt",
    type: "Trainee",
    bullets: [
      "Participating in an intensive structured Microsoft ML Engineer training program covering Python, Exploratory Data Analysis, Deep Learning, NLP, Computer Vision, Azure AI, and MLOps.",
      "Developing hands-on production-ready ML workflows including model registry, artifact versioning, and cloud inference patterns.",
      "Collaborating on complex group capstones addressing real-world problem statements under senior industry mentorship."
    ],
    skills: ["Azure AI", "MLOps", "Deep Learning", "NLP", "Computer Vision", "Python"]
  },
  {
    role: "Bachelor of Science in Artificial Intelligence",
    organization: "Cairo University — Faculty of Computing and Artificial Intelligence",
    period: "2024 – 2028",
    location: "Giza / Cairo, Egypt",
    type: "Education",
    bullets: [
      "Ranked #6 out of 1,500+ students with a cumulative GPA of 3.74 / 4.0.",
      "Core Academic Focus: Probability & Statistics, Advanced Linear Algebra, Relational & Vector Databases, Data Structures & Algorithms, Deep Learning Foundations.",
      "Active participant in competitive programming, AI study groups, and hackathons."
    ],
    skills: ["Linear Algebra", "Statistics", "Data Structures", "Algorithms", "C++", "Python", "SQL"]
  }
];

export const CERTIFICATIONS = [
  {
    name: "HCIA-AI (Huawei Certified ICT Associate – Artificial Intelligence)",
    issuer: "Huawei",
    date: "Certified",
    badgeColor: "from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30",
    description: "Comprehensive verification of AI technologies, machine learning algorithms, deep learning neural networks, and Huawei Ascend AI computing platforms."
  },
  {
    name: "Star Union AI Workshop",
    issuer: "Star Union",
    date: "Certified",
    badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30",
    description: "Hands-on specialized workshop in cutting-edge neural architectures, practical machine learning model lifecycles, and applied AI systems."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "ML / DL Frameworks",
    iconName: "Cpu",
    skills: [
      { name: "PyTorch", level: 90, featured: true },
      { name: "TensorFlow", level: 92, featured: true },
      { name: "Keras", level: 95, featured: true },
      { name: "Scikit-learn", level: 94, featured: true },
    ]
  },
  {
    title: "Computer Vision",
    iconName: "Eye",
    skills: [
      { name: "YOLOv8", level: 95, featured: true },
      { name: "OpenCV", level: 90, featured: true },
      { name: "CNN Architectures", level: 92, featured: true },
      { name: "Transfer Learning (ResNet)", level: 94, featured: true },
      { name: "Data Augmentation", level: 90 },
      { name: "Grad-CAM", level: 88 },
    ]
  },
  {
    title: "Programming Languages",
    iconName: "Code",
    skills: [
      { name: "Python", level: 96, featured: true },
      { name: "C++", level: 85, featured: true },
      { name: "SQL", level: 88, featured: true },
      { name: "JavaScript", level: 82 },
      { name: "Java", level: 80 },
    ]
  },
  {
    title: "Tools & MLOps",
    iconName: "Wrench",
    skills: [
      { name: "Git / GitHub", level: 92, featured: true },
      { name: "Streamlit", level: 95, featured: true },
      { name: "FastAPI", level: 85, featured: true },
      { name: "Jupyter Notebooks", level: 95 },
      { name: "Azure AI", level: 82 },
      { name: "Roboflow", level: 90 },
    ]
  }
];
