"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AreasOfInterest({ isCollapsed: controlledCollapsed, onToggle: controlledToggle, playSound }) {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : localCollapsed;
  const initialMountRef = React.useRef(true);
  const [hasToggled, setHasToggled] = useState(false);

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    setHasToggled(true);
  }, [controlledCollapsed]);

  const toggleCollapse = () => {
    setHasToggled(true);
    if (controlledToggle) {
      controlledToggle();
    } else {
      playSound && playSound(isCollapsed ? "pop" : "slide");
      setLocalCollapsed((prev) => !prev);
    }
  };
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [triggerCount, setTriggerCount] = useState(0);
  const [terminalPhase, setTerminalPhase] = useState("ready"); // "running" | "ready"
  const [visibleLines, setVisibleLines] = useState(4);

  const domains = [
    {
      category: "Tech & Systems",
      slug: "tech-backend",
      tag: "Core Passion",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2]">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" strokeLinecap="round" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      command: "mvn spring-boot:run -Dspring.profiles.active=prod",
      logs: [
        { type: "info", text: "Booting JVM 21 LTS runtime with G1GC garbage collection..." },
        { type: "pool", text: "HikariCP pool established: 32 active PostgreSQL connections." },
        { type: "bench", text: "Testing high-throughput API routing: 15,000 req/s simulated load..." },
        { type: "success", text: "[OK 200] P99 Latency: 11.4ms | Zero lock contention | Thread queue: 0" }
      ],
      skills: ["Java 21", "Spring Boot", "PostgreSQL", "REST APIs", "Microservices", "Docker", "Redis"],
      metric: "P99 <12ms • 15,000 req/s",
      summary: "I love exploring backend internals, scalable distributed backends, database query optimization, and rock-solid REST APIs.",
      actionLabel: "Benchmark Backend"
    },
    {
      category: "Framer & Motion",
      slug: "framer-motion",
      tag: "Design Craft",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      ),
      command: "framer-motion inspect --shaders --fps-meter",
      logs: [
        { type: "info", text: "Compiling GLSL vertex displacement shaders & WebGL context..." },
        { type: "pool", text: "Calibrating Framer Motion spring physics (damping: 24, stiffness: 220)..." },
        { type: "bench", text: "Mounting Web Audio procedural oscillator for tactile click feedback..." },
        { type: "success", text: "[INTERACTIVE] Frame rate: locked at 60 FPS | Zero layout shifts (CLS: 0.00)" }
      ],
      skills: ["Framer Motion", "Three.js", "GLSL Shaders", "Web Audio API", "Canvas 2D", "Interactive UI"],
      metric: "60 FPS Locked • Spring Physics & WebGL",
      summary: "Obsessed with creating tactile micro-interactions, spring physics, procedural audio, and fluid Framer components that feel alive.",
      actionLabel: "Simulate 60 FPS Physics"
    },
    {
      category: "Generative AI",
      slug: "generative-ai",
      tag: "Autonomous AI",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2]">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      command: "python3 -m pipelines.agentic_eval --model=gemini-1.5",
      logs: [
        { type: "info", text: "Binding Google Gemini 1.5 API client with structured temperature 0.2..." },
        { type: "pool", text: "Enforcing runtime Zod schema validation & STAR-rubric prompt chains..." },
        { type: "bench", text: "Streaming token inference (148 tokens/sec throughput via LPU)..." },
        { type: "success", text: "[VALIDATED] 100% Schema assertion matched | Zero hallucination detected" }
      ],
      skills: ["Google Gemini API", "Groq LPU", "Prompt Engineering", "Zod Validation", "Autonomous Agents", "RAG"],
      metric: "Zod Schema Enforced • Sub-Second Inference",
      summary: "Passionate about building real-world AI applications—agentic pipelines, mock interview evaluators, and smart code review bots.",
      actionLabel: "Probe AI Inference"
    },
    {
      category: "Real-Time Systems",
      slug: "realtime-sync",
      tag: "Live Sync",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2]">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      command: "wscat -c wss://sync-world.onrender.com/ws/mesh",
      logs: [
        { type: "info", text: "Upgrading HTTP/1.1 connection: 101 Switching Protocols to WebSocket..." },
        { type: "pool", text: "Initializing multi-peer distributed vector canvas synchronization..." },
        { type: "bench", text: "Streaming remote cursor state packets across 150 connected peers..." },
        { type: "success", text: "[SYNCHRONIZED] Delta packet size: 48 bytes | Round-trip latency: 34ms" }
      ],
      skills: ["WebSockets", "OpenJDK 21", "State Machines", "Multiplayer UI", "Next.js", "Vector Math"],
      metric: "<35ms State Sync • Multiplayer Meshes",
      summary: "Fascinated by real-time collaboration, low-latency WebSocket meshes, interactive canvas syncing, and multiplayer systems.",
      actionLabel: "Ping WebSocket Mesh"
    }
  ];

  const currentDomain = domains[activeDomainIndex];

  useEffect(() => {
    setTerminalPhase("running");
    setVisibleLines(0);

    const timer1 = setTimeout(() => {
      setVisibleLines(1);
      playSound && playSound("click");
    }, 120);

    const timer2 = setTimeout(() => {
      setVisibleLines(2);
    }, 280);

    const timer3 = setTimeout(() => {
      setVisibleLines(3);
    }, 450);

    const timer4 = setTimeout(() => {
      setVisibleLines(4);
      playSound && playSound("pop");
    }, 620);

    const timer5 = setTimeout(() => {
      setTerminalPhase("ready");
    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [activeDomainIndex, triggerCount]);

  const handleDomainSelect = (idx) => {
    playSound && playSound("click");
    setActiveDomainIndex(idx);
    setTriggerCount((prev) => prev + 1);
  };

  const handleReRunSimulation = () => {
    playSound && playSound("whoosh");
    setTriggerCount((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {!isCollapsed && (
        <motion.section
          id="aboutMe"
          key="areas-section"
          initial={hasToggled ? { height: 0, opacity: 0 } : { opacity: 0, y: 36 }}
          animate={hasToggled ? { height: "auto", opacity: 1 } : { opacity: 1, y: 0 }}
          whileInView={!hasToggled ? { opacity: 1, y: 0 } : undefined}
          exit={{ height: 0, opacity: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#276749] text-white pt-10 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden select-none"
        >
          {/* Interactive Golden Drawer Tab at Center of Section (Matching Reference Image) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
            <button
              type="button"
              onClick={toggleCollapse}
              className="group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-1.5 sm:py-2 rounded-b-2xl bg-[#E5A823] hover:bg-[#F5B833] text-black font-mono text-xs sm:text-sm font-bold border-2 border-black border-t-0 shadow-md transition-all cursor-pointer select-none active:scale-95"
              title="Click to collapse Areas of Interest"
              aria-label="Collapse Areas of Interest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/70 group-hover:scale-125 transition-transform" />
              <span>Areas of Interest // Collapse</span>
              <span className="inline-block text-[10px]">▲</span>
            </button>
          </div>

          <div className="max-w-6xl w-full mx-auto flex flex-col items-center pt-6 sm:pt-8">

            {/* Main 2-Column Content with Rich Fade-In & Pop-In */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start relative z-10 pb-6 sm:pb-8">

              {/* Left Column: INTERACTIVE TERMINAL SIMULATION WORKBENCH */}
              <div className="lg:col-span-6 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between mb-4 sm:mb-6"
                >
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      Simulation Workbench
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                      Areas of Interest
                    </h2>
                  </div>
                </motion.div>

                {/* 4 Interactive Domain Selector Pills with Staggered Fade-In */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {domains.map((dom, idx) => (
                    <motion.button
                      key={dom.category}
                      type="button"
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: 0.08 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDomainSelect(idx)}
                      className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-2.5 cursor-pointer touch-manipulation ${activeDomainIndex === idx
                        ? "bg-black/85 border-[#E5A823] text-white shadow-lg ring-1 ring-[#E5A823]/50"
                        : "bg-black/25 border-white/15 text-emerald-100/80 hover:bg-black/45 hover:text-white"
                        }`}
                    >
                      <div className={`p-1.5 rounded-xl ${activeDomainIndex === idx ? "bg-[#E5A823] text-black" : "bg-white/10 text-white"}`}>
                        {dom.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] sm:text-xs font-bold truncate">{dom.category}</span>
                        <span className="block text-[9px] font-mono text-emerald-300 opacity-80">{dom.tag}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Real Interactive Terminal Window with Lift & Fade-In */}
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-3xl bg-[#0C0E12] border-2 border-white/20 shadow-2xl overflow-hidden backdrop-blur-md flex flex-col text-neutral-200"
                >

                  {/* Terminal Window Header Bar */}
                  <div className="px-4 py-3 bg-[#161922] border-b border-white/10 flex items-center justify-between font-mono text-xs select-none">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                      </div>
                      <span className="text-neutral-400 text-[11px] ml-2 truncate max-w-[180px] sm:max-w-none">
                        shakil@node:~/{currentDomain.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {terminalPhase === "running" ? (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          EXECUTING...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          VERIFIED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Terminal Screen Body */}
                  <div className="p-4 sm:p-5 font-mono text-xs space-y-3 min-h-[220px] flex flex-col justify-between">

                    {/* Command & Streamed Output */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-neutral-300">
                        <span className="text-emerald-400 font-bold select-none">$</span>
                        <span className="text-amber-300 font-medium break-all">{currentDomain.command}</span>
                      </div>

                      <div className="space-y-1.5 pt-1 pl-3 border-l-2 border-emerald-500/30">
                        {currentDomain.logs.slice(0, visibleLines).map((log, i) => (
                          <div
                            key={i}
                            className={`text-[11px] sm:text-xs leading-relaxed transition-all duration-200 ${log.type === "success"
                              ? "text-emerald-300 font-bold"
                              : log.type === "bench"
                                ? "text-cyan-300"
                                : log.type === "pool"
                                  ? "text-yellow-200/90"
                                  : "text-neutral-400"
                              }`}
                          >
                            <span className="text-neutral-500 mr-2 select-none">&gt;</span>
                            {log.text}
                          </div>
                        ))}

                        {terminalPhase === "running" && (
                          <div className="flex items-center gap-2 pt-1 text-amber-400 text-[11px]">
                            <span>[Simulating stream]</span>
                            <span className="inline-block w-2 h-3.5 bg-amber-400 animate-pulse"></span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RESULTS CARD */}
                    {terminalPhase === "ready" && (
                      <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in space-y-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <span className="text-neutral-400 text-[11px]">Key Metric:</span>
                          <span className="font-bold text-[#E5A823] text-xs font-mono">{currentDomain.metric}</span>
                        </div>

                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          {currentDomain.summary}
                        </p>

                        <div>
                          <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold mb-1.5">
                            Favorite Tools & Tech:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentDomain.skills.map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => playSound && playSound("pop")}
                                className="px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono bg-neutral-900 hover:bg-emerald-500 hover:text-black text-neutral-300 border border-neutral-700 transition-all cursor-pointer active:scale-95"
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between select-none">
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Environment: macOS • Zsh Shell
                      </span>
                      <button
                        type="button"
                        onClick={handleReRunSimulation}
                        className="px-3 py-1 rounded-xl bg-[#E5A823] hover:bg-[#d69919] text-black font-bold text-xs transition-transform active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span>⚡</span>
                        <span>{currentDomain.actionLabel}</span>
                      </button>
                    </div>

                  </div>

                </motion.div>

              </div>

              {/* Right Column: Shakil's Authentic Areas of Interest Narrative with Fade-In */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 flex flex-col justify-between h-full pt-2 sm:pt-4"
              >
                <div className="space-y-6 text-emerald-50 text-base sm:text-lg leading-relaxed">
                  <div className="space-y-4">
                    <p>
                      I'm deeply passionate about <strong className="text-white font-bold">core technology & backend systems</strong>. There's something incredibly satisfying about designing clean, resilient architectures in Java and Spring Boot, optimizing database indexing in PostgreSQL, and writing APIs that handle high throughput effortlessly.
                    </p>

                    <p>
                      At the same time, I'm genuinely obsessed with <strong className="text-white font-bold">Framer, motion design, and tactile web interfaces</strong>. Great software shouldn't just be functional—it should feel responsive, alive, and fun to interact with. Whether I'm crafting smooth spring animations in Framer Motion, experimenting with GLSL shaders in Three.js, or wiring up procedural Web Audio clicks, I love pushing the boundaries of frontend craft.
                    </p>

                    <p>
                      Another huge area of interest for me is <strong className="text-white font-bold">Generative AI & autonomous systems</strong>. I love exploring what's possible with Google Gemini and Groq LPUs—from building automated mock interview studios with real-time waveform telemetry, to creating smart code review bots and decision intelligence platforms that turn unstructured data into real value.
                    </p>

                    <p>
                      Above all, I love <strong className="text-white font-bold">building products from scratch</strong>. Whether it's a real-time multiplayer whiteboard with WebSockets or an e-commerce fulfillment platform, I'm always hacking, tinkering with new libraries, and exploring the future of tech.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* The Crisp White Horizontal Line: Animated to Grow from Center to Left & Right (once, stays crisp) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0.5 }}
              className="w-full h-[2.5px] bg-white rounded-full mt-6 relative z-10"
            />

          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
