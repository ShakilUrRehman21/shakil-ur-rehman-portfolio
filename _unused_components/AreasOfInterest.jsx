"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Server, Sparkles, Zap, Play } from "lucide-react";
import { FramerIcon } from "./Icons";
import { useApp } from "./AppShell";

const DOMAINS = [
  {
    category: "Tech & Systems",
    color: "cobalt",
    slug: "tech-backend",
    Icon: Server,
    command: "mvn spring-boot:run -Dspring.profiles.active=prod",
    logs: [
      { type: "info", text: "Booting JVM 21 LTS runtime with G1GC garbage collection..." },
      { type: "pool", text: "HikariCP pool established: 32 active PostgreSQL connections." },
      { type: "bench", text: "Testing high-throughput API routing: 15,000 req/s simulated load..." },
      { type: "success", text: "[OK 200] P99 Latency: 11.4ms | Zero lock contention | Thread queue: 0" },
    ],
    skills: ["Java 21", "Spring Boot", "PostgreSQL", "REST APIs", "Microservices", "Docker", "Redis"],
    metric: "P99 <12ms, 15,000 req/s",
    summary:
      "I love exploring backend internals, scalable distributed backends, database query optimization, and rock-solid REST APIs.",
    actionLabel: "Benchmark backend",
  },
  {
    category: "Framer & Motion",
    color: "marigold",
    slug: "framer-motion",
    Icon: FramerIcon,
    command: "framer-motion inspect --shaders --fps-meter",
    logs: [
      { type: "info", text: "Compiling GLSL vertex displacement shaders & WebGL context..." },
      { type: "pool", text: "Calibrating Framer Motion spring physics (damping: 24, stiffness: 220)..." },
      { type: "bench", text: "Mounting Web Audio procedural oscillator for tactile click feedback..." },
      { type: "success", text: "[INTERACTIVE] Frame rate: locked at 60 FPS | Zero layout shifts (CLS: 0.00)" },
    ],
    skills: ["Framer Motion", "Three.js", "GLSL Shaders", "Web Audio API", "Canvas 2D", "Interactive UI"],
    metric: "60 FPS locked, spring physics & WebGL",
    summary:
      "Obsessed with creating tactile micro-interactions, spring physics, procedural audio, and fluid Framer components that feel alive.",
    actionLabel: "Simulate 60 FPS physics",
  },
  {
    category: "Generative AI",
    color: "orchid",
    slug: "generative-ai",
    Icon: Sparkles,
    command: "python3 -m pipelines.agentic_eval --model=gemini-1.5",
    logs: [
      { type: "info", text: "Binding Google Gemini 1.5 API client with structured temperature 0.2..." },
      { type: "pool", text: "Enforcing runtime Zod schema validation & STAR-rubric prompt chains..." },
      { type: "bench", text: "Streaming token inference (148 tokens/sec throughput via LPU)..." },
      { type: "success", text: "[VALIDATED] 100% Schema assertion matched | Zero hallucination detected" },
    ],
    skills: ["Google Gemini API", "Groq LPU", "Prompt Engineering", "Zod Validation", "Autonomous Agents", "RAG"],
    metric: "Zod schema enforced, sub-second inference",
    summary:
      "Passionate about building real-world AI applications—agentic pipelines, mock interview evaluators, and smart code review bots.",
    actionLabel: "Probe AI inference",
  },
  {
    category: "Real-Time Systems",
    color: "mint",
    slug: "realtime-sync",
    Icon: Zap,
    command: "wscat -c wss://sync-world.onrender.com/ws/mesh",
    logs: [
      { type: "info", text: "Upgrading HTTP/1.1 connection: 101 Switching Protocols to WebSocket..." },
      { type: "pool", text: "Initializing multi-peer distributed vector canvas synchronization..." },
      { type: "bench", text: "Streaming remote cursor state packets across 150 connected peers..." },
      { type: "success", text: "[SYNCHRONIZED] Delta packet size: 48 bytes | Round-trip latency: 34ms" },
    ],
    skills: ["WebSockets", "OpenJDK 21", "State Machines", "Multiplayer UI", "Next.js", "Vector Math"],
    metric: "<35ms state sync, multiplayer meshes",
    summary:
      "Fascinated by real-time collaboration, low-latency WebSocket meshes, interactive canvas syncing, and multiplayer systems.",
    actionLabel: "Ping WebSocket mesh",
  },
];

const LOG_COLOR = {
  info: "text-[#A3A9C9]",
  pool: "text-[rgb(255_190_69)]",
  bench: "text-[rgb(120_142_255)]",
  success: "text-[rgb(47_217_169)] font-semibold",
};

// Paragraphs of the narrative; each strong phrase is tagged with its domain color
const STORY = [
  [
    ["I'm deeply passionate about ", null],
    ["core technology & backend systems", "cobalt"],
    [
      ". There's something incredibly satisfying about designing clean, resilient architectures in Java and Spring Boot, optimizing database indexing in PostgreSQL, and writing APIs that handle high throughput effortlessly.",
      null,
    ],
  ],
  [
    ["At the same time, I'm genuinely obsessed with ", null],
    ["Framer, motion design, and tactile web interfaces", "marigold"],
    [
      ". Great software shouldn't just be functional—it should feel responsive, alive, and fun to interact with. Whether I'm crafting smooth spring animations in Framer Motion, experimenting with GLSL shaders in Three.js, or wiring up procedural Web Audio clicks, I love pushing the boundaries of frontend craft.",
      null,
    ],
  ],
  [
    ["Another huge area of interest for me is ", null],
    ["Generative AI & autonomous systems", "orchid"],
    [
      ". I love exploring what's possible with Google Gemini and Groq LPUs—from building automated mock interview studios with real-time waveform telemetry, to creating smart code review bots and decision intelligence platforms that turn unstructured data into real value.",
      null,
    ],
  ],
  [
    ["Above all, I love ", null],
    ["building products from scratch", "mint"],
    [
      ". Whether it's a real-time multiplayer whiteboard with WebSockets or an e-commerce fulfillment platform, I'm always hacking, tinkering with new libraries, and exploring the future of tech.",
      null,
    ],
  ],
];

function Word({ children, progress, range, color }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity, color: color ? `rgb(var(--${color}))` : undefined }} className={color ? "font-semibold" : ""}>
      {children}
    </motion.span>
  );
}

// Words light up one by one as the paragraph scrolls through the viewport
function ScrollStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  const words = [];
  STORY.forEach((para, pi) => {
    para.forEach(([text, color]) => {
      text.split(/(\s+)/).forEach((w) => {
        if (w.trim()) words.push({ w, color, pi });
        else if (w) words.push({ space: true, pi });
      });
    });
  });
  const total = words.filter((w) => !w.space).length;

  let n = 0;
  return (
    <div ref={ref} className="space-y-6 text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.55] text-[#ECEEF8]">
      {STORY.map((_, pi) => (
        <p key={pi}>
          {words
            .filter((w) => w.pi === pi)
            .map((w, i) => {
              if (w.space) return " ";
              const start = n / total;
              n += 1;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, Math.min(1, start + 8 / total)]} color={w.color}>
                  {w.w}
                </Word>
              );
            })}
        </p>
      ))}
    </div>
  );
}

function Terminal({ domain, runKey }) {
  const { playSound } = useApp();
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState(0);
  const [phase, setPhase] = useState("typing");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(domain.command);
      setLines(domain.logs.length);
      setPhase("ready");
      return;
    }
    setTyped("");
    setLines(0);
    setPhase("typing");
    const timers = [];
    const cmd = domain.command;
    for (let i = 1; i <= cmd.length; i++) {
      timers.push(setTimeout(() => setTyped(cmd.slice(0, i)), i * 18));
    }
    const base = cmd.length * 18 + 180;
    domain.logs.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setLines(i + 1);
          playSound(i === domain.logs.length - 1 ? "ok" : "tick");
        }, base + i * 260)
      );
    });
    timers.push(setTimeout(() => setPhase("ready"), base + domain.logs.length * 260 + 120));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, runKey, inView]);

  const color = `rgb(var(--${domain.color}))`;

  return (
    <div ref={ref} className="rounded-[24px] bg-[#080A18] border border-white/10 overflow-hidden shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 text-[#A3A9C9] truncate">shakil@node:~/{domain.slug}</span>
        </div>
        <span
          className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-semibold"
          style={{
            color: phase === "ready" ? "rgb(47 217 169)" : "rgb(255 190 69)",
            background: phase === "ready" ? "rgb(47 217 169 / 0.12)" : "rgb(255 190 69 / 0.12)",
          }}
        >
          {phase === "ready" ? "verified" : "running"}
        </span>
      </div>

      <div className="p-4 sm:p-5 font-mono text-[12.5px] leading-relaxed min-h-[340px] flex flex-col">
        <p className="text-[#ECEEF8] break-all">
          <span style={{ color }}>$ </span>
          {typed}
          {phase === "typing" && typed.length < domain.command.length && <span className="caret inline-block w-2 h-4 align-middle bg-[#ECEEF8] ml-0.5" />}
        </p>
        <ul className="mt-3 space-y-1.5 pl-3 border-l-2" style={{ borderColor: `rgb(var(--${domain.color}) / 0.4)` }}>
          {domain.logs.slice(0, lines).map((l, i) => (
            <motion.li
              key={`${runKey}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={LOG_COLOR[l.type]}
            >
              {l.text}
            </motion.li>
          ))}
        </ul>

        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 pt-4 border-t border-white/10 font-sans space-y-3"
            >
              <p className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-[#A3A9C9]">Key metric</span>
                <span className="font-semibold text-right" style={{ color }}>
                  {domain.metric}
                </span>
              </p>
              <p className="text-sm text-[#ECEEF8]/85 leading-relaxed">{domain.summary}</p>
              <ul className="flex flex-wrap gap-1.5">
                {domain.skills.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
                    className="px-2.5 py-1 rounded-full text-xs bg-white/[0.06] border border-white/10 text-[#ECEEF8]/90"
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AreasOfInterest() {
  const { playSound } = useApp();
  const [active, setActive] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const domain = DOMAINS[active];

  return (
    <section id="interests" className="on-night relative bg-night text-[#ECEEF8] px-4 sm:px-6 lg:px-10 py-24 sm:py-32 overflow-hidden">
      {/* Domain-colored glow that follows the selected area */}
      <motion.div
        aria-hidden="true"
        animate={{ background: `radial-gradient(600px circle at ${20 + active * 18}% 30%, rgb(var(--${domain.color}) / 0.18), transparent 70%)` }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.035em]"
            style={{ fontVariationSettings: '"wdth" 112, "wght" 820' }}
          >
            Areas of
            <br />
            interest
          </motion.h2>
          <p className="mt-5 text-[17px] text-[#A3A9C9] max-w-[44ch]">
            Pick an area to run its workbench. Each one replays a small simulation of the kind of work I enjoy.
          </p>

          <div role="tablist" aria-label="Areas" className="mt-8 grid grid-cols-2 gap-2">
            {DOMAINS.map((d, i) => {
              const on = i === active;
              return (
                <button
                  key={d.slug}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setActive(i);
                    setRunKey((k) => k + 1);
                  }}
                  className="relative text-left p-3.5 rounded-2xl border transition-colors"
                  style={{
                    borderColor: on ? `rgb(var(--${d.color}))` : "rgb(255 255 255 / 0.1)",
                    background: on ? `rgb(var(--${d.color}) / 0.14)` : "rgb(255 255 255 / 0.03)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 grid place-items-center rounded-xl transition-colors"
                      style={{ background: on ? `rgb(var(--${d.color}))` : "rgb(255 255 255 / 0.08)", color: on ? "#0D1022" : "#fff" }}
                    >
                      <d.Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="text-[15px] font-semibold">{d.category}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <Terminal domain={domain} runKey={runKey} />
          </div>
          <button
            type="button"
            onClick={() => {
              playSound("whoosh");
              setRunKey((k) => k + 1);
            }}
            className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold text-sm text-[#151935] transition-transform active:scale-95"
            style={{ background: `rgb(var(--${domain.color}))`, color: "#0D1022" }}
          >
            <Play className="w-4 h-4" />
            {domain.actionLabel}
          </button>
        </div>

        <div className="lg:col-span-6 lg:pt-28">
          <ScrollStory />
        </div>
      </div>
    </section>
  );
}
