"use client";
import React from "react";
import Image from "next/image";
import { ExternalLink, Sparkles, X, Layers, Cpu, CheckCircle2, AlertCircle, Shield, Terminal, ArrowUpRight } from "lucide-react";
import { GithubIcon, FramerIcon } from "./Icons";

const projectDetails = {
  framershowcase: {
    title: "Framer Interactive & WebGL Components Lab",
    category: "WebGL, 3D Shaders, Kinetic Typography & Motion Systems",
    badges: ["Three.js", "WebGL", "GLSL Shaders", "Framer Motion", "Spring Physics", "Canvas 2D", "Tailwind CSS"],
    image: "/framer.png",
    overview: "Curated suite of 10 production-grade WebGL, Three.js shaders, Perlin noise typography, and spring physics Framer smart components. Featuring an architectural light-mode showcase, live multi-device viewport simulator (Desktop, Tablet, Mobile), and hot reload.",
    role: "Creative Technologist & Frontend Motion Architect",
    impact: "Engineered 10 high-performance smart components with smooth 60 FPS frame budgets, hardware-accelerated vertex displacement, dynamic audio-reactive and cursor-reactive animations, fully published and interactive live.",
    liveUrl: "https://framer-showcase-two.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21",
    framerUrl: "https://www.framer.com/@shakil-ur-rehman/",
    keyChallenges: [
      "Optimizing Three.js rendering pipelines & Simplex noise shaders to guarantee steady 60 FPS on mobile and low-power devices.",
      "Building seamless Framer Smart Component property controls allowing zero-code tuning directly in the Framer canvas.",
      "Implementing Perlin noise particle dispersion (Pixel-Burst & Ghost Text) with responsive Canvas 2D math and zero memory leaks."
    ],
    highlights: [
      "10 standalone production components: Scroll Bloom, Cascade Drift, Ghost Text, Quantum Mesh, Ocean Scroll Shader, Pixel-Burst Slider, Chat Popup, Bookscape Gallery, Spinning Text, and Smart AI Support.",
      "Live device preview simulator supporting Desktop (1200px), Tablet (768px), and Mobile (390px) viewports with live reload.",
      "Zero cumulative layout shift (CLS) architecture and strict sub-50KB individual bundle optimizations."
    ]
  },
  repolens: {
    title: "RepoLens – AI Code Intelligence & 360° Repo Diagnostics",
    category: "Automated Architectural Audits & AST Vulnerability Scanner",
    badges: ["Next.js 14", "Groq LPU", "Neon PostgreSQL", "Drizzle ORM", "Clerk", "GitHub Webhooks"],
    image: "/repolens.png",
    overview: "Modern, production-grade code intelligence SaaS scanning repositories with high-throughput LPU-accelerated AI models to identify architectural flaws, detect security vulnerabilities, calculate technical debt indexes, and post automated AI code reviews on GitHub Pull Requests.",
    role: "Lead Full Stack & AI Pipeline Architect",
    impact: "Constructed an automated 5-stage AST code audit pipeline achieving <2s full repository scans, automated PR reviews via GitHub Webhooks, and interactive Recharts risk dashboards.",
    liveUrl: "https://repo-lens-sooty.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/Repo_Lens",
    keyChallenges: [
      "Building a multi-stage parser (AST, Security, Scalability, Code Smells, Tech Debt Index) that processes multi-file repositories within strict token limits.",
      "Safely parsing and scoring non-deterministic LLM JSON payloads with weighted algorithmic normalization.",
      "Securing webhook-driven PR bot actions with HMAC SHA-256 verification and zero source code retention."
    ],
    highlights: [
      "Ultra-fast Groq LPU inference completing 360° repository audits in 1.8 seconds.",
      "Automated GitHub PR bot commenting actionable code diff recommendations directly on pull requests.",
      "Electric lime interactive dashboard featuring radial score gauges, debt matrices, and public shareable inspection links."
    ]
  },
  digitalmemoryvault: {
    title: "Digital Memory Vault – Behavioral Decision Intelligence",
    category: "Mathematical Calibration Engine & Cognitive Bias Analytics",
    badges: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk Auth", "Brier Calibration"],
    image: "/digital-memory-vault.png",
    overview: "Behavioral analytics and decision intelligence platform for founders, quants, and executives. Enforces pre-commitment logging (confidence, risk, emotional state) at T=0, computes mathematical Brier calibration scores against actual outcomes, and detects cognitive bias patterns.",
    role: "Full Stack Software Engineer & Quantitative Model Developer",
    impact: "Built a mathematical Brier calibration scoring engine, pre-commitment state machines, and real-time cognitive bias detectors that measure strategic judgment without hindsight revisionism.",
    liveUrl: "https://digital-memory-vault-weld.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/digital-memory-vault",
    keyChallenges: [
      "Eliminating hindsight bias by locking down hypotheses, confidence levels, and psychological states at T=0 before outcomes occur.",
      "Calculating empirical Brier calibration curves (Score: 100 - |confidence - outcome| * 10) across high-risk strategic bets.",
      "Detecting cognitive bias vectors (optimism bias, panic reactions, timeline distortions) from post-mortem reflections."
    ],
    highlights: [
      "Pre-commitment decision registry with contextual immutable timestamping.",
      "Calibration scatter plot and monthly trend visualizer measuring judgment accuracy.",
      "Executive PDF dossier generator for board reviews and strategy post-mortems."
    ]
  },
  crashledger: {
    title: "CrashLedger – Operational Failure & Incident Intelligence",
    category: "High-Availability SRE Incident Lifecycle Platform",
    badges: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk Auth", "Recharts"],
    image: "/crashledger.png",
    overview: "Enterprise incident management platform that enforces root cause analysis (RCA), tracks operational failure risk scores, and calculates automated MTTR/MTBF metrics across multi-tenant workspaces.",
    role: "Full Stack Engineer & Database Architect",
    impact: "Architected a strict 4-stage incident lifecycle engine (open → investigating → resolved → archived), automated recurring pattern detection, and designed a normalized 10-table PostgreSQL schema.",
    liveUrl: "https://crash-ledger.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/CrashLedger",
    keyChallenges: [
      "Enforcing strict database state machine transitions to prevent closing incidents without documented root cause analysis.",
      "Calculating rolling MTTR (Mean Time to Resolution) and MTBF metrics across high-velocity microservices.",
      "Designing multi-tenant workspace isolation with role-based access control (owner, admin, engineer, viewer)."
    ],
    highlights: [
      "Automated failure recurrence algorithm that flags chronic component breakdowns before outages spread.",
      "Chronological incident event timeline logging detection, acknowledgment, mitigation, and resolution steps.",
      "Interactive analytics dashboard with flame orange UI telemetry and risk distribution charts."
    ]
  },
  coursegen: {
    title: "CourseGen AI – Autonomous Curriculum & Video Platform",
    category: "Autonomous AI Curriculum & Video Synthesis Platform",
    badges: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM", "Clerk Auth"],
    image: "/coursegen-ai.png",
    overview: "Production-grade SaaS platform transforming raw educational topics into comprehensive, multi-chapter curricula with integrated YouTube educational search, Neon PostgreSQL & Clerk.",
    role: "Full Stack Engineer & AI Pipeline Architect",
    impact: "Built an end-to-end curriculum generator featuring dynamic chapter generation with Gemini, automated YouTube educational video pairing, and Clerk authentication.",
    liveUrl: "https://course-gen-ai-ten.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/CourseGen_AI",
    keyChallenges: [
      "Handling Gemini token rate limits and model deprecations with automated fallback chains.",
      "Parsing non-deterministic LLM JSON outputs reliably without breaking runtime UI state.",
      "Suppressing YouTube Data API v3 quota exhausts gracefully without halting chapter synthesis."
    ],
    highlights: [
      "Automated multi-tier fallback between gemini-flash-latest and lite variants.",
      "Normalized Neon PostgreSQL relational schema for courses and sequential chapters using Drizzle ORM.",
      "Firebase Cloud Storage asset integration for custom banner uploads and public shareable study links."
    ]
  },
  syncworld: {
    title: "SyncWorld – Distributed Real-Time Workspace & Sandbox",
    category: "Real-Time Distributed Collaborative Workspace & Compiler Sandbox",
    badges: ["WebSockets", "Node.js", "Vector Canvas", "Compiler Diagnostics", "Docker"],
    image: "/syncworld.png",
    overview: "High-performance collaborative platform combining a multi-tenant vector whiteboard, a multi-language IDE with compiler diagnostics, and an immutable audit trail.",
    role: "Distributed Systems & Full Stack Engineer",
    impact: "Engineered sub-60ms multi-peer canvas and code editing over native WebSockets with OpenJDK Java compiler error parsing and persistent disk storage.",
    liveUrl: "https://sync-world.onrender.com/",
    githubUrl: "https://github.com/ShakilUrRehman21/Sync_World",
    keyChallenges: [
      "Synchronizing high-frequency vector pen strokes and cursor coordinates without packet flooding.",
      "Building in-browser compiler diagnostics for Java (OpenJDK 21 javac), Python, C++, and JavaScript V8 isolates.",
      "Maintaining state consistency across multi-tab reconnects with atomic disk persistence."
    ],
    highlights: [
      "Multi-tenant vector canvas with smoothed cubic Bézier interpolation and remote cursor presence.",
      "Detailed javac compiler error parsing with line/column carets, warning counters, and exit codes.",
      "Audit mutation event stream tracking workspace actions with switchable team personas."
    ]
  },
  prepmaster: {
    title: "PrepMaster Studio – AI Technical Mock Interview",
    category: "AI Technical & Behavioral Mock Interview Studio",
    badges: ["Next.js 15", "Gemini 1.5 Flash", "Speech-to-Text", "Neon Postgres", "Drizzle ORM"],
    image: "/prepmaster.png",
    overview: "Executive-grade mock interview simulation room calibrating questions by seniority, tech stack, and STAR-method rubrics with instant diagnostic scorecards.",
    role: "Full Stack AI Engineer",
    impact: "Built a realistic interview simulation combining real-time speech recognition, synthetic text-to-speech narration, and automated Gemini evaluation rubrics.",
    liveUrl: "https://prep-master-studio.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/PrepMaster_Studio",
    keyChallenges: [
      "Synchronizing continuous browser Web Speech recognition with live waveform visualization.",
      "Engineering low-temperature Gemini prompt templates for objective STAR-method scoring.",
      "Designing a private client-side webcam proctoring simulation with zero video data egress."
    ],
    highlights: [
      "Role and seniority calibration spanning frontend, backend, system design, and leadership tracks.",
      "Executive diagnostic scorecards with candidate transcription, benchmark answers, and feedback notes.",
      "Persistent Neon PostgreSQL interview archive with search and technology filtering."
    ]
  },
  threadmoderator: {
    title: "ThreadModerator – WhatsApp Intelligence & NLP",
    category: "Machine Learning & Conversational Behavioral Analytics",
    badges: ["Python", "Streamlit", "scikit-learn", "VADER Sentiment", "NetworkX", "Gemini API"],
    image: "/threadmoderator.png",
    overview: "Conversational intelligence platform transforming chat logs into actionable sentiment trajectories, Latent Dirichlet Allocation (LDA) topic models, and 2D social interaction networks.",
    role: "NLP & Machine Learning Engineer",
    impact: "Built VADER sentiment scoring with Hinglish dialect support, unsupervised topic modeling, response latency analytics, and Gemini-powered executive chat briefings.",
    liveUrl: "https://thread-moderator.onrender.com/",
    githubUrl: "https://github.com/ShakilUrRehman21/ThreadModerator",
    keyChallenges: [
      "Parsing heterogeneous WhatsApp export formats across iOS and Android timestamps accurately.",
      "Calibrating VADER sentiment thresholds for colloquial expressions, Hinglish slang, and emoji polarities.",
      "Constructing interaction network graphs (`NetworkX`) within sequential temporal conversational windows."
    ],
    highlights: [
      "Interactive 2D Plotly interaction network graph sizing participants by conversational centrality.",
      "Unsupervised LDA topic modeling uncovering latent group themes without manual labeling.",
      "Ask AI conversational Q&A allowing team leaders to query chat archives with grounded citations."
    ]
  },
  milkmart: {
    title: "MilkMart Platform – Cold-Chain Dairy E-Commerce",
    category: "Cold-Chain Dairy E-Commerce & Order Management System",
    badges: ["Django", "Python 3", "PostgreSQL", "Razorpay", "WhiteNoise", "Docker"],
    image: "/milkmart.png",
    overview: "Full-featured farm-fresh dairy e-commerce web platform engineered with Django, featuring morning cold-chain delivery management and resilient payments.",
    role: "Backend & Full Stack Engineer",
    impact: "Developed an organic e-commerce ecosystem with automated category filtering, dynamic cart calculations, multi-stage order tracking, and production-ready cloud deployment.",
    liveUrl: "https://milkmart-platform.onrender.com/",
    githubUrl: "https://github.com/ShakilUrRehman21/MilkMart_Platform",
    keyChallenges: [
      "Architecting a multi-state order fulfillment pipeline (Accepted -> Packed -> Out for Delivery -> Delivered).",
      "Implementing dual-mode checkout ensuring zero transaction drop-off with Razorpay and instant demo checkout.",
      "Configuring 12-factor production deployment with WhiteNoise asset compression and Gunicorn WSGI."
    ],
    highlights: [
      "Dynamic AJAX-driven cart with free-delivery progress threshold calculations.",
      "Customer dashboard with interactive order tracking stepper and multi-address management.",
      "Full administrative portal for inventory, discount codes, and delivery schedules."
    ]
  }
};

export default function CaseStudyModal({ projectId, onClose, playSound }) {
  if (!projectId) return null;
  const project = projectDetails[projectId] || projectDetails.repolens;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-black dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound && playSound("pop");
            onClose();
          }}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold transition-transform active:scale-95 border border-neutral-300 dark:border-neutral-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3.5 pr-8">
          {project.badges.map((b) => (
            <span key={b} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              {b}
            </span>
          ))}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-neutral-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{project.category}</span>
        </p>

        {/* Action Buttons: Live Demo & GitHub */}
        <div className="flex items-center gap-2.5 mb-5 flex-wrap">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound && playSound("pop")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-transform active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live Project</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound && playSound("pop")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 shadow-sm transition-transform active:scale-95"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          )}
          {project.framerUrl && (
            <a
              href={project.framerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound && playSound("pop")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-sm transition-transform active:scale-95"
            >
              <FramerIcon className="w-3.5 h-3.5" />
              <span>Framer Showcase</span>
            </a>
          )}
        </div>

        {/* Real Platform Image Preview */}
        {project.image && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 bg-black shadow-md mb-6">
            <Image
              src={project.image}
              alt={`${project.title} live interface`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover object-top opacity-100"
            />
          </div>
        )}

        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
          {project.overview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 mb-6 text-xs font-mono">
          <div>
            <span className="text-neutral-400 uppercase tracking-wider block mb-1">Role / Responsibility</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">{project.role}</span>
          </div>
          <div>
            <span className="text-neutral-400 uppercase tracking-wider block mb-1">Key Architectural Impact</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">{project.impact}</span>
          </div>
        </div>

        {/* Key Challenges */}
        <div className="mb-6">
          <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Key Engineering Challenges</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {project.keyChallenges.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Highlights */}
        <div>
          <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Technical Highlights & Results</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-mono mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
