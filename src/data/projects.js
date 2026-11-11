// Single source of truth for every project shown on the site.
// domain → one of: cobalt (systems), marigold (motion), orchid (AI), mint (real-time)

export const DOMAINS = {
  cobalt: { label: "Backend & systems", hex: "rgb(var(--cobalt))" },
  marigold: { label: "Motion & design", hex: "rgb(var(--marigold))" },
  orchid: { label: "Generative AI", hex: "rgb(var(--orchid))" },
  mint: { label: "Real-time", hex: "rgb(var(--mint))" },
};

export const projects = [
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Task management system",
    category: "systems",
    domain: "mint",
    badge: "Full-stack task manager",
    image: null,
    liveUrl: "https://task-management-system-teal-gamma-52.vercel.app/login",
    githubUrl: "https://github.com/ShakilUrRehman21/task-management-system",
    tags: ["Next.js 16", "TypeScript", "Express.js", "Prisma", "PostgreSQL", "TanStack Query", "Tailwind CSS"],
    summary:
      "Task manager with a Next.js client on TanStack Query, an Express.js and Prisma API with pagination, search and filters, and JWT auth with refresh cookies.",
    featured: true,
    bullets: [
      "Developed the Next.js client with TanStack Query hooks that cache per filter and refetch after each mutation.",
      "Engineered server-side pagination, case-insensitive search, and status filters with central error handling.",
      "Issued 15-minute JWT access tokens and 7-day httpOnly refresh cookies, renewed via an Axios interceptor.",
    ],
    highlights: [
      "TanStack Query hooks that cache per filter and refetch after each mutation",
      "Server-side pagination, case-insensitive search, and status filters",
      "15-minute JWT access tokens with 7-day httpOnly refresh cookies",
    ],
  },
  {
    id: "syncworld",
    title: "SyncWorld",
    subtitle: "Distributed real-time workspace",
    category: "systems",
    domain: "mint",
    badge: "Real-Time Distributed System",
    image: "/syncworld.png",
    liveUrl: "https://sync-world.onrender.com/",
    githubUrl: "https://github.com/ShakilUrRehman21/Sync_World",
    tags: ["WebSockets", "OpenJDK 21", "Vector Canvas", "<60ms Sync"],
    summary:
      "Low-latency distributed workspace with multi-user vector canvas synchronization, remote cursor presence mesh, and an in-browser sandbox compiler.",
    highlights: [
      "Sub-60ms bi-directional state synchronization via low-overhead WebSocket frames",
      "In-browser Java compilation engine executing code inside isolated sandboxes",
      "High-performance HTML5 Canvas rendering supporting concurrent multi-user drawings",
    ],
  },
  {
    id: "crashledger",
    title: "CrashLedger",
    subtitle: "SRE incident lifecycle platform",
    category: "systems",
    domain: "cobalt",
    badge: "Failure Intelligence Engine",
    image: "/crashledger.png",
    liveUrl: "https://crash-ledger.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/crash-ledger",
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk", "Zod"],
    featured: true,
    metric: { from: "190 ms", to: "1.4 ms", unit: "p50", note: "SQL aggregate and partial index, 321K seeded incidents" },
    bullets: [
      "Modeled incidents as a state machine (open → investigating → resolved → archived) that rejects invalid moves.",
      "Designed a 10-table PostgreSQL schema with owner, admin, engineer, and viewer RBAC checks across API routes.",
      "Load-tested on 321K seeded incidents; an SQL aggregate and partial index cut p50 latency from 190 ms to 1.4 ms.",
    ],
    summary:
      "Operational failure analytics platform enforcing automated post-mortems, tracking recurring component risks, and calculating production MTTR.",
    highlights: [
      "Automated 5-Whys root cause analysis workflow enforcing preventative ownership",
      "Component risk scoring calculating vulnerability hotspots across system services",
      "Real-time Mean Time To Resolution (MTTR) calculation across rolling time windows",
    ],
  },
  {
    id: "milkmart",
    title: "MilkMart Platform",
    subtitle: "Cold-chain dairy commerce system",
    category: "systems",
    domain: "cobalt",
    badge: "Cold-Chain Commerce",
    image: "/milkmart.png",
    liveUrl: "https://milkmart-platform.onrender.com/",
    githubUrl: "https://github.com/ShakilUrRehman21/MilkMart_Platform",
    tags: ["Django 5", "Python 3", "Razorpay Gateway", "Docker"],
    summary:
      "Perishable dairy fulfillment engine featuring early-morning slot routing, dual payment resilience (Razorpay + instant fallback), and dynamic AJAX carts.",
    highlights: [
      "Robust Django ORM modeling for inventory, orders, and subscriptions",
      "Integrated Razorpay payment signature verification",
      "Real-time AJAX shopping cart and delivery route planning",
    ],
  },
  {
    id: "framershowcase",
    title: "Framer Components Lab",
    subtitle: "WebGL shaders & motion systems",
    category: "systems",
    domain: "marigold",
    badge: "10 Live Smart Components",
    image: "/framer.png",
    liveUrl: "https://framer-showcase-two.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21",
    framerUrl: "https://www.framer.com/@shakil-ur-rehman/",
    tags: ["Three.js", "GLSL Shaders", "Framer Motion", "60 FPS"],
    summary:
      "Curated suite of 10 production-grade WebGL canvas shaders, noise displacement typography, and spring physics micro-interaction components.",
    highlights: [
      "Hardware-accelerated GLSL fragment shader distortions",
      "Zero-layout-shift micro-interactions with Framer Motion spring physics",
      "Live interactive responsive canvas previewing viewport states",
    ],
  },
  {
    id: "repolens",
    title: "RepoLens",
    subtitle: "AI code diagnostics & AST analysis",
    category: "ai",
    domain: "orchid",
    badge: "Groq LPU & AST Diagnostics",
    image: "/repolens.png",
    liveUrl: "https://repo-lens-sooty.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/repo-lens",
    tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle ORM", "Groq", "Clerk", "Recharts"],
    featured: true,
    metric: { from: "9", to: "430", unit: "req/s", note: "dashboard API throughput after four indexes, 2M seeded rows, 20 users" },
    bullets: [
      "Architected a SaaS that audits GitHub repos via a 5-stage LLM pipeline and computes a weighted 0–100 quality score.",
      "Developed the analytics dashboard: Recharts score trends, issue breakdowns, Markdown export, and shareable links.",
      "Load-tested dashboard APIs on 2M seeded rows; four indexes raised throughput from 9 to 430 req/s (20 users).",
    ],
    summary:
      "High-throughput code intelligence scanning GitHub repositories to diagnose architecture flaws, security vulnerabilities, and technical debt.",
    highlights: [
      "Deep AST parse trees for structural anti-pattern detection",
      "Sub-second analysis powered by Groq LPU hardware acceleration",
      "Automated GitHub Webhook actions for instantaneous PR review feedback",
    ],
  },
  {
    id: "digitalmemoryvault",
    title: "Digital Memory Vault",
    subtitle: "Behavioral decision intelligence",
    category: "ai",
    domain: "orchid",
    badge: "Decision Intelligence & Scoring",
    image: "/digital-memory-vault.png",
    liveUrl: "https://digital-memory-vault-weld.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/digital-memory-vault",
    tags: ["Next.js 14", "TypeScript", "Brier Calibration", "PostgreSQL"],
    summary:
      "Cognitive analytics engine logging pre-commitment rationales at T=0, calculating mathematical Brier calibration scores, and mitigating hindsight bias.",
    highlights: [
      "Mathematical Brier Score calibration tracking predictive confidence accuracy over time",
      "Pre-mortem & post-mortem decision review loops mitigating retrospective rationalization",
      "PostgreSQL database with indexed timeline queries for cognitive bias identification",
    ],
  },
  {
    id: "coursegen",
    title: "CourseGen AI",
    subtitle: "Autonomous curriculum generator",
    category: "ai",
    domain: "orchid",
    badge: "Autonomous AI Platform",
    image: "/coursegen-ai.png",
    liveUrl: "https://course-gen-ai-ten.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/CourseGen_AI",
    tags: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM"],
    summary:
      "Autonomous education engine generating multi-chapter curricula with integrated YouTube educational search, Neon PostgreSQL, and Clerk auth.",
    highlights: [
      "Structured multi-step curriculum synthesis with Google Gemini API",
      "Automated YouTube Data API integration fetching relevant chapter lectures",
      "Drizzle ORM schemas managing user enrollments, lessons, and course progress",
    ],
  },
  {
    id: "prepmaster",
    title: "PrepMaster Studio",
    subtitle: "Technical & behavioral mock studio",
    category: "ai",
    domain: "orchid",
    badge: "AI Mock Interview Studio",
    image: "/prepmaster.png",
    liveUrl: "https://prep-master-studio.vercel.app/",
    githubUrl: "https://github.com/ShakilUrRehman21/PrepMaster_Studio",
    tags: ["Next.js 15", "Web Speech", "STAR Rubric", "Gemini 1.5"],
    summary:
      "Voice-driven mock interview studio with continuous speech-to-text, live waveform telemetry, and structured STAR rubric diagnostic scorecards.",
    highlights: [
      "Live audio stream capture with Web Audio API waveform visualization",
      "Evaluation calibrated against rigorous STAR frameworks",
      "Instant score breakdown with personalized refinement plans",
    ],
  },
];

export const getProject = (id) => projects.find((p) => p.id === id);

// Long-form case study content, keyed by project id
export const caseStudies = {
  taskflow: {
    title: "TaskFlow – Task Management System",
    category: "Full-stack task manager with JWT auth",
    badges: ["Next.js 16", "TypeScript", "Express.js", "Prisma", "PostgreSQL", "TanStack Query", "Tailwind CSS"],
    overview:
      "A task management system with a Next.js client and an Express.js API backed by Prisma and PostgreSQL. Tasks can be searched, filtered by status and paged on the server, and sessions are kept alive with short-lived access tokens and refresh cookies.",
    role: "Full Stack Developer",
    impact:
      "Built both sides end to end: the TanStack Query client, the Express.js REST API, the Prisma schema, and the token-based auth flow.",
    keyChallenges: [
      "Keeping the client cache correct per filter and refetching after each mutation without stale lists.",
      "Server-side pagination, case-insensitive search, and status filters with central error handling.",
      "Renewing 15-minute access tokens from a 7-day httpOnly refresh cookie transparently via an Axios interceptor.",
    ],
    highlights: [
      "Developed the Next.js client with TanStack Query hooks that cache per filter and refetch after each mutation.",
      "Engineered server-side pagination, case-insensitive search, and status filters with central error handling.",
      "Issued 15-minute JWT access tokens and 7-day httpOnly refresh cookies, renewed via an Axios interceptor.",
    ],
  },
  framershowcase: {
    title: "Framer Interactive & WebGL Components Lab",
    category: "WebGL, 3D Shaders, Kinetic Typography & Motion Systems",
    badges: ["Three.js", "WebGL", "GLSL Shaders", "Framer Motion", "Spring Physics", "Canvas 2D", "Tailwind CSS"],
    overview:
      "Curated suite of 10 production-grade WebGL, Three.js shaders, Perlin noise typography, and spring physics Framer smart components. Featuring an architectural light-mode showcase, live multi-device viewport simulator (Desktop, Tablet, Mobile), and hot reload.",
    role: "Creative Technologist & Frontend Motion Architect",
    impact:
      "Engineered 10 high-performance smart components with smooth 60 FPS frame budgets, hardware-accelerated vertex displacement, dynamic audio-reactive and cursor-reactive animations, fully published and interactive live.",
    keyChallenges: [
      "Optimizing Three.js rendering pipelines & Simplex noise shaders to guarantee steady 60 FPS on mobile and low-power devices.",
      "Building seamless Framer Smart Component property controls allowing zero-code tuning directly in the Framer canvas.",
      "Implementing Perlin noise particle dispersion (Pixel-Burst & Ghost Text) with responsive Canvas 2D math and zero memory leaks.",
    ],
    highlights: [
      "10 standalone production components: Scroll Bloom, Cascade Drift, Ghost Text, Quantum Mesh, Ocean Scroll Shader, Pixel-Burst Slider, Chat Popup, Bookscape Gallery, Spinning Text, and Smart AI Support.",
      "Live device preview simulator supporting Desktop (1200px), Tablet (768px), and Mobile (390px) viewports with live reload.",
      "Zero cumulative layout shift (CLS) architecture and strict sub-50KB individual bundle optimizations.",
    ],
  },
  repolens: {
    title: "RepoLens – AI Code Intelligence & 360° Repo Diagnostics",
    category: "Automated Architectural Audits & AST Vulnerability Scanner",
    badges: ["Next.js 14", "Groq LPU", "Neon PostgreSQL", "Drizzle ORM", "Clerk", "GitHub Webhooks"],
    overview:
      "Modern, production-grade code intelligence SaaS scanning repositories with high-throughput LPU-accelerated AI models to identify architectural flaws, detect security vulnerabilities, calculate technical debt indexes, and post automated AI code reviews on GitHub Pull Requests.",
    role: "Lead Full Stack & AI Pipeline Architect",
    impact:
      "Constructed an automated 5-stage AST code audit pipeline achieving <2s full repository scans, automated PR reviews via GitHub Webhooks, and interactive Recharts risk dashboards.",
    keyChallenges: [
      "Building a multi-stage parser (AST, Security, Scalability, Code Smells, Tech Debt Index) that processes multi-file repositories within strict token limits.",
      "Safely parsing and scoring non-deterministic LLM JSON payloads with weighted algorithmic normalization.",
      "Securing webhook-driven PR bot actions with HMAC SHA-256 verification and zero source code retention.",
    ],
    highlights: [
      "Ultra-fast Groq LPU inference completing 360° repository audits in 1.8 seconds.",
      "Automated GitHub PR bot commenting actionable code diff recommendations directly on pull requests.",
      "Electric lime interactive dashboard featuring radial score gauges, debt matrices, and public shareable inspection links.",
    ],
  },
  digitalmemoryvault: {
    title: "Digital Memory Vault – Behavioral Decision Intelligence",
    category: "Mathematical Calibration Engine & Cognitive Bias Analytics",
    badges: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk Auth", "Brier Calibration"],
    overview:
      "Behavioral analytics and decision intelligence platform for founders, quants, and executives. Enforces pre-commitment logging (confidence, risk, emotional state) at T=0, computes mathematical Brier calibration scores against actual outcomes, and detects cognitive bias patterns.",
    role: "Full Stack Software Engineer & Quantitative Model Developer",
    impact:
      "Built a mathematical Brier calibration scoring engine, pre-commitment state machines, and real-time cognitive bias detectors that measure strategic judgment without hindsight revisionism.",
    keyChallenges: [
      "Eliminating hindsight bias by locking down hypotheses, confidence levels, and psychological states at T=0 before outcomes occur.",
      "Calculating empirical Brier calibration curves (Score: 100 - |confidence - outcome| * 10) across high-risk strategic bets.",
      "Detecting cognitive bias vectors (optimism bias, panic reactions, timeline distortions) from post-mortem reflections.",
    ],
    highlights: [
      "Pre-commitment decision registry with contextual immutable timestamping.",
      "Calibration scatter plot and monthly trend visualizer measuring judgment accuracy.",
      "Executive PDF dossier generator for board reviews and strategy post-mortems.",
    ],
  },
  crashledger: {
    title: "CrashLedger – Operational Failure & Incident Intelligence",
    category: "High-Availability SRE Incident Lifecycle Platform",
    badges: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk Auth", "Recharts"],
    overview:
      "Enterprise incident management platform that enforces root cause analysis (RCA), tracks operational failure risk scores, and calculates automated MTTR/MTBF metrics across multi-tenant workspaces.",
    role: "Full Stack Engineer & Database Architect",
    impact:
      "Architected a strict 4-stage incident lifecycle engine (open → investigating → resolved → archived), automated recurring pattern detection, and designed a normalized 10-table PostgreSQL schema.",
    keyChallenges: [
      "Enforcing strict database state machine transitions to prevent closing incidents without documented root cause analysis.",
      "Calculating rolling MTTR (Mean Time to Resolution) and MTBF metrics across high-velocity microservices.",
      "Designing multi-tenant workspace isolation with role-based access control (owner, admin, engineer, viewer).",
    ],
    highlights: [
      "Automated failure recurrence algorithm that flags chronic component breakdowns before outages spread.",
      "Chronological incident event timeline logging detection, acknowledgment, mitigation, and resolution steps.",
      "Interactive analytics dashboard with flame orange UI telemetry and risk distribution charts.",
    ],
  },
  coursegen: {
    title: "CourseGen AI – Autonomous Curriculum & Video Platform",
    category: "Autonomous AI Curriculum & Video Synthesis Platform",
    badges: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM", "Clerk Auth"],
    overview:
      "Production-grade SaaS platform transforming raw educational topics into comprehensive, multi-chapter curricula with integrated YouTube educational search, Neon PostgreSQL & Clerk.",
    role: "Full Stack Engineer & AI Pipeline Architect",
    impact:
      "Built an end-to-end curriculum generator featuring dynamic chapter generation with Gemini, automated YouTube educational video pairing, and Clerk authentication.",
    keyChallenges: [
      "Handling Gemini token rate limits and model deprecations with automated fallback chains.",
      "Parsing non-deterministic LLM JSON outputs reliably without breaking runtime UI state.",
      "Suppressing YouTube Data API v3 quota exhausts gracefully without halting chapter synthesis.",
    ],
    highlights: [
      "Automated multi-tier fallback between gemini-flash-latest and lite variants.",
      "Normalized Neon PostgreSQL relational schema for courses and sequential chapters using Drizzle ORM.",
      "Firebase Cloud Storage asset integration for custom banner uploads and public shareable study links.",
    ],
  },
  syncworld: {
    title: "SyncWorld – Distributed Real-Time Workspace & Sandbox",
    category: "Real-Time Distributed Collaborative Workspace & Compiler Sandbox",
    badges: ["WebSockets", "Node.js", "Vector Canvas", "Compiler Diagnostics", "Docker"],
    overview:
      "High-performance collaborative platform combining a multi-tenant vector whiteboard, a multi-language IDE with compiler diagnostics, and an immutable audit trail.",
    role: "Distributed Systems & Full Stack Engineer",
    impact:
      "Engineered sub-60ms multi-peer canvas and code editing over native WebSockets with OpenJDK Java compiler error parsing and persistent disk storage.",
    keyChallenges: [
      "Synchronizing high-frequency vector pen strokes and cursor coordinates without packet flooding.",
      "Building in-browser compiler diagnostics for Java (OpenJDK 21 javac), Python, C++, and JavaScript V8 isolates.",
      "Maintaining state consistency across multi-tab reconnects with atomic disk persistence.",
    ],
    highlights: [
      "Multi-tenant vector canvas with smoothed cubic Bézier interpolation and remote cursor presence.",
      "Detailed javac compiler error parsing with line/column carets, warning counters, and exit codes.",
      "Audit mutation event stream tracking workspace actions with switchable team personas.",
    ],
  },
  prepmaster: {
    title: "PrepMaster Studio – AI Technical Mock Interview",
    category: "AI Technical & Behavioral Mock Interview Studio",
    badges: ["Next.js 15", "Gemini 1.5 Flash", "Speech-to-Text", "Neon Postgres", "Drizzle ORM"],
    overview:
      "Executive-grade mock interview simulation room calibrating questions by seniority, tech stack, and STAR-method rubrics with instant diagnostic scorecards.",
    role: "Full Stack AI Engineer",
    impact:
      "Built a realistic interview simulation combining real-time speech recognition, synthetic text-to-speech narration, and automated Gemini evaluation rubrics.",
    keyChallenges: [
      "Synchronizing continuous browser Web Speech recognition with live waveform visualization.",
      "Engineering low-temperature Gemini prompt templates for objective STAR-method scoring.",
      "Designing a private client-side webcam proctoring simulation with zero video data egress.",
    ],
    highlights: [
      "Role and seniority calibration spanning frontend, backend, system design, and leadership tracks.",
      "Executive diagnostic scorecards with candidate transcription, benchmark answers, and feedback notes.",
      "Persistent Neon PostgreSQL interview archive with search and technology filtering.",
    ],
  },
  milkmart: {
    title: "MilkMart Platform – Cold-Chain Dairy E-Commerce",
    category: "Cold-Chain Dairy E-Commerce & Order Management System",
    badges: ["Django", "Python 3", "PostgreSQL", "Razorpay", "WhiteNoise", "Docker"],
    overview:
      "Full-featured farm-fresh dairy e-commerce web platform engineered with Django, featuring morning cold-chain delivery management and resilient payments.",
    role: "Backend & Full Stack Engineer",
    impact:
      "Developed an organic e-commerce ecosystem with automated category filtering, dynamic cart calculations, multi-stage order tracking, and production-ready cloud deployment.",
    keyChallenges: [
      "Architecting a multi-state order fulfillment pipeline (Accepted -> Packed -> Out for Delivery -> Delivered).",
      "Implementing dual-mode checkout ensuring zero transaction drop-off with Razorpay and instant demo checkout.",
      "Configuring 12-factor production deployment with WhiteNoise asset compression and Gunicorn WSGI.",
    ],
    highlights: [
      "Dynamic AJAX-driven cart with free-delivery progress threshold calculations.",
      "Customer dashboard with interactive order tracking stepper and multi-address management.",
      "Full administrative portal for inventory, discount codes, and delivery schedules.",
    ],
  },
};

export const contact = {
  name: "Shakil Ur Rehman",
  email: "rehmanshakil21@gmail.com",
  phone: "+91 8750250416",
  linkedin: "https://linkedin.com/in/shakilurrehman21",
  github: "https://github.com/ShakilUrRehman21",
  leetcode: "https://leetcode.com/u/shakilurehman/",
  framer: "https://www.framer.com/@shakil-ur-rehman/",
  resumePdf: "/Shakil_Ur_Rehman_Resume.pdf",
};
