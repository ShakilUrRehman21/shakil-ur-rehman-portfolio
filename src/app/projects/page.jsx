"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CaseStudyModal from "../../components/CaseStudyModal";
import { GithubIcon } from "../../components/Icons";

export default function ProjectsPage() {
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      }
    } catch (e) { }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("portfolio_theme", "dark");
      } catch (e) { }
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("portfolio_theme", "light");
      } catch (e) { }
    }
    playSound("click");
  };

  const playSound = (type = "pop") => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "whoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const projects = [
    {
      id: "repolens",
      title: "RepoLens",
      subtitle: "AI Code Intelligence & 360° Diagnostics",
      category: "ai",
      badge: "Groq LPU & AST Diagnostics",
      badgeColor: "bg-[#D4F63C]/20 text-[#D4F63C] border-[#D4F63C]/40",
      image: "/repolens.png",
      liveUrl: "https://repo-lens-sooty.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/repo-lens",
      tags: ["Next.js 14", "Groq LPU", "AST Engine", "GitHub Webhooks", "TypeScript"],
      description: "Production code intelligence platform scanning GitHub repos with high-throughput LPU models to detect architecture flaws, security CVEs, and technical debt with automated PR review bots.",
      highlights: [
        "Groq LPU sub-second inference token throughput",
        "Deterministic AST tree-parsing for syntax validation",
        "Automated GitHub Webhooks for continuous PR reviews"
      ]
    },
    {
      id: "digitalmemoryvault",
      title: "Digital Memory Vault",
      subtitle: "Behavioral Decision Intelligence & Calibration Engine",
      category: "ai",
      badge: "Decision Intelligence & Brier Scoring",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      image: "/digital-memory-vault.png",
      liveUrl: "https://digital-memory-vault-weld.vercel.app/",
      githubUrl: "https://github.com/ShakilUrRehman21/digital-memory-vault",
      tags: ["Next.js 14", "TypeScript", "Brier Calibration", "Cognitive Bias Scan", "PostgreSQL"],
      description: "Behavioral analytics and decision intelligence platform for founders and operators. Enforces pre-commitment logging (confidence, risk, emotional state) at T=0, computes mathematical Brier calibration scores against actual outcomes, and detects cognitive bias patterns.",
      highlights: [
        "Pre-commitment decision logging neutralizing hindsight revisionism",
        "Mathematical Brier scoring & calibration curve analytics (0–100 scale)",
        "Emotional state & cognitive bias correlation scanner across strategic bets"
      ]
    },
    {
      id: "crashledger",
      title: "CrashLedger",
      subtitle: "Operational Failure Intelligence Platform",
      category: "fullstack",
      badge: "SRE Incident Lifecycle Engine",
      badgeColor: "bg-[#FA5A2A]/20 text-[#FA5A2A] border-[#FA5A2A]/40",
      image: "/crashledger.png",
      liveUrl: "https://crash-ledger.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/crash-ledger",
      tags: ["Next.js 16", "PostgreSQL", "Drizzle ORM", "MTTR: 38m", "Clerk"],
      description: "Operational failure intelligence platform enforcing root cause analysis, tracking recurring component breakdown risks, and calculating rolling MTTR across production systems.",
      highlights: [
        "Structured 5-Whys root cause analysis state machine",
        "Automated rolling MTTR & SLA compliance metrics",
        "PostgreSQL + Drizzle schema with ACID transaction safety"
      ]
    },
    {
      id: "coursegen",
      title: "CourseGen AI",
      subtitle: "Autonomous Curriculum & Video Platform",
      category: "ai",
      badge: "Autonomous AI Platform",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      image: "/coursegen-ai.png",
      liveUrl: "https://course-gen-ai-ten.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/course-gen-ai",
      tags: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
      description: "Autonomous course creation platform generating complete multi-chapter curricula with integrated YouTube educational video search, Neon PostgreSQL & Clerk authentication.",
      highlights: [
        "Zod-validated JSON output from Google Gemini 1.5",
        "Automated YouTube Data API integration for chapter videos",
        "Serverless PostgreSQL persistence on Neon"
      ]
    },
    {
      id: "syncworld",
      title: "SyncWorld",
      subtitle: "Real-Time Distributed Collaborative Workspace",
      category: "fullstack",
      badge: "Real-Time Distributed System",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      image: "/syncworld.png",
      liveUrl: "https://sync-world.onrender.com/",
      githubUrl: "https://github.com/shakil-ur-rehman/sync-world",
      tags: ["WebSockets", "OpenJDK 21", "Vector Canvas", "<60ms Sync", "Java"],
      description: "Collaborative multi-tenant workspace with real-time vector whiteboard, remote cursor mesh, and an in-browser sandbox IDE with javac compiler diagnostics.",
      highlights: [
        "Low-latency (<60ms) WebSocket multi-peer synchronization",
        "Spring Boot & OpenJDK 21 event broker architecture",
        "Interactive vector canvas with multi-user presence indicators"
      ]
    },
    {
      id: "prepmaster",
      title: "PrepMaster Studio",
      subtitle: "AI Technical & Behavioral Mock Interview",
      category: "ai",
      badge: "AI Mock Interview Studio",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      image: "/prepmaster.png",
      liveUrl: "https://prep-master-studio.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/prep-master-studio",
      tags: ["Next.js 15", "Web Speech API", "STAR Rubric", "Gemini 1.5", "Audio Waveform"],
      description: "Executive technical and behavioral interview platform with continuous speech-to-text, live waveform telemetry, and automated Gemini 1.5 Flash diagnostic scorecards.",
      highlights: [
        "Live audio stream capture with Web Audio API waveform visualization",
        "Evaluation calibrated against rigorous STAR frameworks",
        "Instant score breakdown with personalized refinement plans"
      ]
    },
    {
      id: "threadmoderator",
      title: "ThreadModerator",
      subtitle: "WhatsApp Conversational Intelligence & NLP",
      category: "ai",
      badge: "Conversational Intelligence & NLP",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      image: "/threadmoderator.png",
      liveUrl: "https://thread-moderator.onrender.com/",
      githubUrl: "https://github.com/shakil-ur-rehman/thread-moderator",
      tags: ["Python 3", "VADER Sentiment", "LDA Topics", "NetworkX", "Streamlit"],
      description: "Conversational intelligence platform transforming chat logs into actionable sentiment trajectories, Latent Dirichlet Allocation (LDA) topic models, and 2D social networks.",
      highlights: [
        "VADER sentiment engine processing chronological sentiment shifts",
        "LDA generative probabilistic model discovering emergent themes",
        "NetworkX graph analysis identifying conversational centralities"
      ]
    },
    {
      id: "milkmart",
      title: "MilkMart Platform",
      subtitle: "Cold-Chain Dairy E-Commerce System",
      category: "fullstack",
      badge: "Cold-Chain Dairy E-Commerce",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      image: "/milkmart.png",
      liveUrl: "https://milkmart-platform.onrender.com/",
      githubUrl: "https://github.com/shakil-ur-rehman/milkmart-platform",
      tags: ["Django 5", "Python 3", "Razorpay Gateway", "Docker", "SQLite/Postgres"],
      description: "Farm-fresh dairy commerce ecosystem featuring cold-chain morning fulfillment, dual payment checkout (Razorpay + zero-failure checkout), and dynamic AJAX carts.",
      highlights: [
        "Robust Django ORM modeling for inventory, orders, and subscriptions",
        "Integrated Razorpay payment signature verification",
        "Real-time AJAX shopping cart and delivery route planning"
      ]
    },
    {
      id: "framershowcase",
      title: "Framer Components Lab",
      subtitle: "WebGL, 3D Shaders & Motion Systems",
      category: "fullstack",
      badge: "10 Live Smart Components",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      image: "/framer.png",
      liveUrl: "https://framer-showcase-two.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman",
      tags: ["Three.js", "GLSL Shaders", "Framer Motion", "60 FPS", "React"],
      description: "Curated suite of 10 production-grade WebGL, Three.js shaders, Perlin noise typography, and spring physics Framer smart components with live device preview.",
      highlights: [
        "Hardware-accelerated GLSL vertex & fragment shaders",
        "Spring-physics gesture systems tuned for 60 FPS mobile displays",
        "Zero external CSS dependencies with pure modular components"
      ]
    }
  ];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#ECE7DF] dark:bg-[#141616] text-[#000000] dark:text-[#FFFFFF] transition-colors duration-300">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#ECE7DF]/90 dark:bg-[#141616]/90 border-b border-black/10 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Back to Home Link */}
          <Link
            href="/"
            onClick={() => playSound("pop")}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-black/15 dark:border-white/15 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-x-0.5 active:scale-95"
          >
            <span className="transition-transform group-hover:-translate-x-1 font-bold">←</span>
            <span>Back to Portfolio</span>
          </Link>

          {/* Title & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-sm">
              <span className="font-mono font-bold text-white text-[10px] sm:text-xs">
                &lt;SR/&gt;
              </span>
            </div>
            <span className="font-bold text-sm sm:text-base hidden sm:inline tracking-tight">
              Shakil Ur Rehman
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-black/15 dark:border-white/15 text-xs font-mono flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
            title="Toggle theme"
          >
            <span>{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Page Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Production Systems Showcase
          </div>

          <h1 className="doodle-font text-4xl sm:text-5xl md:text-6xl tracking-wide mb-3">
            All Engineered Works
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            A comprehensive gallery of production platforms, distributed systems, AI pipelines, and interactive web experiences engineered with Spring Boot, Next.js, Gemini API, and PostgreSQL.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>• Live Deployments</span>
            <span>• Real UI Screenshots</span>
            <span>• Production Architectures</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 bg-white/70 dark:bg-neutral-900/70 p-3 sm:p-4 rounded-3xl border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 w-full sm:w-auto">
            {[
              { id: "all", label: "All Works" },
              { id: "ai", label: "AI & Intelligence" },
              { id: "fullstack", label: "Distributed & Full-Stack" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  playSound("pop");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${activeCategory === cat.id
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full px-4 py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-black/10 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-neutral-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => {
            const isBlack = idx % 4 === 0 || idx % 4 === 3;
            return (
              <article
                key={project.id}
                className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isBlack
                    ? "bg-[#0E1015] text-white border-2 border-black/80 dark:border-white/20"
                    : "bg-white text-neutral-900 border-2 border-black dark:border-white/30"
                }`}
              >
                <div>
                  {/* Header: Badge & Quick Action Links */}
                  <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        isBlack
                          ? project.badgeColor
                          : "bg-neutral-100 text-neutral-800 border-neutral-300"
                      }`}
                    >
                      {project.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSound("whoosh")}
                          className={`p-1.5 rounded-full border transition-all ${
                            isBlack
                              ? "bg-white/10 hover:bg-white text-white hover:text-black border-white/20"
                              : "bg-black/5 hover:bg-black text-black hover:text-white border-black/20"
                          }`}
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("whoosh")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 shadow-sm font-mono ${
                          isBlack
                            ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white"
                        }`}
                      >
                        <span>Live App</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h2
                      className={`text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${
                        isBlack ? "text-white" : "text-black"
                      }`}
                    >
                      {project.title}
                    </h2>
                    <p
                      className={`text-xs font-mono ${
                        isBlack
                          ? "text-emerald-400"
                          : "text-emerald-600 dark:text-emerald-500 font-semibold"
                      }`}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isBlack ? "text-slate-300" : "text-neutral-700"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* ACTUAL PLATFORM SCREENSHOT */}
                  <div
                    className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl mb-4 transition-colors border ${
                      isBlack
                        ? "border-slate-700/80 bg-slate-950 group-hover:border-slate-500"
                        : "border-black/15 bg-neutral-100 group-hover:border-black/40"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} live interface screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-top opacity-100 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Engineering Highlights */}
                  {project.highlights && (
                    <div
                      className={`space-y-1.5 mb-4 p-3.5 rounded-2xl border ${
                        isBlack
                          ? "bg-slate-900/80 border-slate-800"
                          : "bg-neutral-50 border-neutral-200"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                          isBlack ? "text-slate-400" : "text-neutral-500"
                        }`}
                      >
                        Key Engineering Highlights:
                      </span>
                      <ul className="space-y-1">
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            className={`text-xs flex items-start gap-2 ${
                              isBlack ? "text-slate-300" : "text-neutral-700"
                            }`}
                          >
                            <span
                              className={`font-bold ${
                                isBlack ? "text-emerald-400" : "text-emerald-600"
                              }`}
                            >
                              •
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Footer: Tags & Case Study Modal Trigger */}
                <div
                  className={`pt-4 border-t flex items-center justify-between text-xs font-mono flex-wrap gap-2 ${
                    isBlack ? "border-slate-800" : "border-black/10"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-md text-[10px] border ${
                          isBlack
                            ? "bg-slate-900 text-slate-300 border-slate-800"
                            : "bg-neutral-100 text-neutral-800 border-neutral-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playSound("pop");
                      setSelectedProjectId(project.id);
                    }}
                    className={`font-semibold group-hover:underline cursor-pointer flex items-center gap-1 ${
                      isBlack
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-500"
                    }`}
                  >
                    <span>Case Study</span>
                    <span>→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-base text-neutral-500 font-mono">
              No projects found matching "{searchQuery}".
            </p>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-14 sm:mt-18 flex justify-center">
          <Link
            href="/"
            onClick={() => playSound("pop")}
            className="px-8 py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>←</span>
            <span>Return to Portfolio Home</span>
          </Link>
        </div>

      </main>

      {/* Case Study Modal for any deep dives */}
      <CaseStudyModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
}
