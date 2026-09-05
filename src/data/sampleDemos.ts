export interface YoloDetection {
  id: string;
  label: string;
  confidence: number;
  // Bounding box in percentage coordinates (0 - 100)
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  description: string;
}

export interface YoloSampleScene {
  id: string;
  title: string;
  category: string;
  svgBackground: string; // inline SVG data URI or SVG markup
  detections: YoloDetection[];
  meta: {
    inferenceTime: string;
    resolution: string;
    model: string;
  };
}

export interface XraySample {
  id: string;
  name: string;
  anatomicalRegion: string;
  imageUrl: string;
  groundTruth: 'Fractured' | 'Normal';
  resnet50: {
    prediction: 'Fractured' | 'Normal';
    confidence: number;
    loss: number;
    gradCamHotspots: { x: number; y: number; radius: number; intensity: number }[];
  };
  customCnn: {
    prediction: 'Fractured' | 'Normal';
    confidence: number;
    loss: number;
  };
  clinicalNotes: string;
}

// Crisp inline SVGs for Traffic Sign scenes
const svgStopSignScene = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="380" viewBox="0 0 640 380">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%231e293b"/>
      <stop offset="60%" stop-color="%23334155"/>
      <stop offset="100%" stop-color="%23475569"/>
    </linearGradient>
    <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%231e222d"/>
      <stop offset="100%" stop-color="%230f141f"/>
    </linearGradient>
  </defs>
  <!-- Sky -->
  <rect width="640" height="230" fill="url(%23sky)"/>
  <!-- Distant City / Trees -->
  <path d="M0 230 L80 180 L160 210 L260 170 L340 220 L450 160 L540 210 L640 180 L640 230 Z" fill="%2318212f"/>
  <!-- Road Surface -->
  <polygon points="0,380 640,380 430,230 210,230" fill="url(%23road)"/>
  <!-- Lane markings -->
  <line x1="320" y1="230" x2="320" y2="380" stroke="%23fbbf24" stroke-width="4" stroke-dasharray="16 16"/>
  <!-- Signpost pole 1 (STOP) -->
  <rect x="155" y="110" width="8" height="150" fill="%2394a3b8"/>
  <!-- Octagonal STOP sign -->
  <polygon points="159,50 195,50 220,75 220,111 195,136 159,136 134,111 134,75" fill="%23dc2626" stroke="%23ffffff" stroke-width="4"/>
  <text x="177" y="100" fill="%23ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">STOP</text>
  <!-- Signpost pole 2 (PEDESTRIAN) -->
  <rect x="475" y="120" width="7" height="130" fill="%2394a3b8"/>
  <!-- Triangular Warning Sign -->
  <polygon points="478,65 525,145 431,145" fill="%23fbbf24" stroke="%23000000" stroke-width="4"/>
  <polygon points="478,75 515,140 441,140" fill="%23ffffff"/>
  <!-- Walking figure icon -->
  <circle cx="478" cy="98" r="5" fill="%23000000"/>
  <path d="M478 103 L478 122 M472 110 L484 110 M474 135 L478 122 L483 135" stroke="%23000000" stroke-width="3" stroke-linecap="round"/>
</svg>`;

const svgSpeedLimitScene = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="380" viewBox="0 0 640 380">
  <defs>
    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%230c1427"/>
      <stop offset="100%" stop-color="%231e293b"/>
    </linearGradient>
    <linearGradient id="highway" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%23242b3d"/>
      <stop offset="100%" stop-color="%23111622"/>
    </linearGradient>
  </defs>
  <rect width="640" height="210" fill="url(%23sky2)"/>
  <!-- Distant mountain hills -->
  <path d="M0 210 Q 180 120, 360 190 T 640 180 L640 210 Z" fill="%23151c2c"/>
  <!-- Multi-lane Highway -->
  <polygon points="0,380 640,380 480,210 160,210" fill="url(%23highway)"/>
  <line x1="270" y1="210" x2="190" y2="380" stroke="%23ffffff" stroke-width="3" stroke-dasharray="14 14"/>
  <line x1="370" y1="210" x2="450" y2="380" stroke="%23ffffff" stroke-width="3" stroke-dasharray="14 14"/>
  <!-- Overhead Gantry / Pole Left -->
  <rect x="110" y="80" width="8" height="160" fill="%2364748b"/>
  <!-- Speed Limit 80 Sign -->
  <circle cx="114" cy="95" r="44" fill="%23ffffff" stroke="%23ef4444" stroke-width="8"/>
  <text x="114" y="108" fill="%230f172a" font-family="Arial, sans-serif" font-weight="900" font-size="34" text-anchor="middle">80</text>
  <!-- Road Work Sign Right -->
  <rect x="520" y="130" width="8" height="120" fill="%2364748b"/>
  <!-- Diamond Shape Road Work -->
  <g transform="translate(524,95) rotate(45)">
    <rect x="-35" y="-35" width="70" height="70" rx="6" fill="%23f97316" stroke="%23ffffff" stroke-width="3"/>
  </g>
  <path d="M515 85 L533 105 M518 102 L528 88" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const svgPedestrianUrban = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="380" viewBox="0 0 640 380">
  <defs>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="%231a102f"/>
      <stop offset="60%" stop-color="%232e1065"/>
      <stop offset="100%" stop-color="%233b0764"/>
    </linearGradient>
  </defs>
  <rect width="640" height="240" fill="url(%23dusk)"/>
  <!-- City buildings silhouette -->
  <rect x="40" y="80" width="70" height="160" fill="%230f172a"/>
  <rect x="120" y="50" width="90" height="190" fill="%231e1b4b"/>
  <rect x="230" y="110" width="80" height="130" fill="%230f172a"/>
  <rect x="350" y="70" width="100" height="170" fill="%231e1b4b"/>
  <rect x="470" y="90" width="80" height="150" fill="%230f172a"/>
  <!-- Road with Zebra Crossing -->
  <polygon points="0,380 640,380 640,240 0,240" fill="%231e293b"/>
  <!-- Zebra stripes -->
  <polygon points="120,380 180,380 230,260 190,260" fill="%23e2e8f0"/>
  <polygon points="240,380 300,380 330,260 290,260" fill="%23e2e8f0"/>
  <polygon points="360,380 420,380 430,260 390,260" fill="%23e2e8f0"/>
  <polygon points="480,380 540,380 530,260 490,260" fill="%23e2e8f0"/>
  <!-- Pedestrian Crossing Sign -->
  <rect x="295" y="100" width="6" height="140" fill="%2394a3b8"/>
  <rect x="270" y="60" width="56" height="56" rx="8" fill="%230284c7" stroke="%23ffffff" stroke-width="3"/>
  <polygon points="298,68 318,104 278,104" fill="%23ffffff"/>
  <circle cx="298" cy="80" r="3" fill="%230284c7"/>
  <path d="M298 84 L298 96 M294 88 L302 88 M295 102 L298 96 L302 102" stroke="%230284c7" stroke-width="2"/>
</svg>`;

export const SAMPLE_YOLO_SCENES: YoloSampleScene[] = [
  {
    id: "intersection-signs",
    title: "Urban Intersection (STOP & Pedestrian)",
    category: "City Driving",
    svgBackground: svgStopSignScene,
    meta: {
      inferenceTime: "14.2 ms",
      resolution: "1280x720 (Letterbox 640x640)",
      model: "YOLOv8l-Traffic-8Class",
    },
    detections: [
      {
        id: "det-1",
        label: "Stop Sign",
        confidence: 0.96,
        x: 19.5,
        y: 11.5,
        w: 15.5,
        h: 25.5,
        color: "#ef4444",
        description: "Standard octagonal regulatory stop sign detected with pristine confidence."
      },
      {
        id: "det-2",
        label: "Pedestrian Crossing",
        confidence: 0.91,
        x: 66.0,
        y: 15.0,
        w: 16.5,
        h: 25.0,
        color: "#f59e0b",
        description: "Warning triangle alerting upcoming pedestrian right of way."
      }
    ]
  },
  {
    id: "highway-speed",
    title: "High-Speed Corridor (80 km/h & Road Work)",
    category: "Highway Logistics",
    svgBackground: svgSpeedLimitScene,
    meta: {
      inferenceTime: "13.8 ms",
      resolution: "1920x1080 (Letterbox 640x640)",
      model: "YOLOv8l-Traffic-8Class",
    },
    detections: [
      {
        id: "det-3",
        label: "Speed Limit 80",
        confidence: 0.94,
        x: 10.5,
        y: 12.0,
        w: 16.0,
        h: 27.0,
        color: "#06b6d4",
        description: "Circular speed restriction sign accurately mapped with optical digit classification."
      },
      {
        id: "det-4",
        label: "Road Work Ahead",
        confidence: 0.87,
        x: 75.0,
        y: 13.0,
        w: 15.5,
        h: 26.0,
        color: "#f97316",
        description: "Diamond hazard warning detected under varying roadside illumination."
      }
    ]
  },
  {
    id: "crosswalk-dusk",
    title: "Suburban Crosswalk at Twilight",
    category: "Adverse Lighting",
    svgBackground: svgPedestrianUrban,
    meta: {
      inferenceTime: "15.1 ms",
      resolution: "1280x720 (Letterbox 640x640)",
      model: "YOLOv8l-Traffic-8Class",
    },
    detections: [
      {
        id: "det-5",
        label: "Pedestrian Crosswalk Sign",
        confidence: 0.93,
        x: 41.5,
        y: 14.5,
        w: 11.0,
        h: 18.0,
        color: "#38bdf8",
        description: "Square pedestrian crossing priority sign isolated under low ambient twilight."
      }
    ]
  }
];

export const SAMPLE_XRAYS: XraySample[] = [
  {
    id: "xray-forearm-displaced",
    name: "Forearm Fracture (Lateral View)",
    anatomicalRegion: "Left Radius & Ulna (Displaced Fracture)",
    imageUrl: "./xray-fracture-1.png",
    groundTruth: "Fractured",
    resnet50: {
      prediction: "Fractured",
      confidence: 0.998,
      loss: 0.012,
      gradCamHotspots: [
        { x: 50, y: 52, radius: 22, intensity: 0.95 },
        { x: 47, y: 58, radius: 16, intensity: 0.82 }
      ]
    },
    customCnn: {
      prediction: "Fractured",
      confidence: 0.935,
      loss: 0.165
    },
    clinicalNotes: "Complete displaced fracture through the mid-to-distal diaphysis of the radius and ulna with posterior angulation. Grad-CAM visual heatmaps isolate the prominent cortical dislocation zone with 99.8% model confidence."
  },
  {
    id: "xray-wrist-ap",
    name: "Normal Skeletal Anatomy (AP View)",
    anatomicalRegion: "Right Hand & Wrist (Healthy / Intact)",
    imageUrl: "./xray-fracture-2.png",
    groundTruth: "Normal",
    resnet50: {
      prediction: "Normal",
      confidence: 0.994,
      loss: 0.015,
      gradCamHotspots: [
        { x: 52, y: 48, radius: 18, intensity: 0.22 }
      ]
    },
    customCnn: {
      prediction: "Normal",
      confidence: 0.912,
      loss: 0.178
    },
    clinicalNotes: "Normal bone density and intact cortical margins across the distal radius, ulna, and carpal rows. No visible fracture, dislocation, or periosteal reaction. ResNet50 correctly flags the radiograph as Normal with 99.4% confidence and zero focal pathology activation."
  }
];
