"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNav from "../../components/TopNav";
import CaseStudyModal from "../../components/CaseStudyModal";
import ResumeModal from "../../components/ResumeModal";
import PlayModal from "../../components/PlayModal";
import Footer from "../../components/Footer";
import { GithubIcon } from "../../components/Icons";

export default function ProjectsPage() {
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPlayOpen, setIsPlayOpen] = useState(false);

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

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("portfolio_theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("portfolio_theme", "light");
      } catch (e) {}
    }
  }, [theme]);

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
      image: "/repolens.png",
      liveUrl: "https://repo-lens-sooty.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/repo-lens",
      tags: ["Next.js 14", "Groq LPU", "AST Engine", "GitHub Webhooks", "TypeScript"],
      description: "Production code intelligence platform scanning GitHub repos with high-throughput LPU models to detect architecture flaws, security CVEs, and technical debt with automated PR review bots.",
      highlights: [
        "Deep AST parse trees for structural anti-pattern detection",
        "Sub-second analysis powered by Groq LPU hardware acceleration",
        "Automated GitHub Webhook actions for instantaneous PR review feedback"
      ]
    },
    {
      id: "digitalmemoryvault",
      title: "Digital Memory Vault",
      subtitle: "Behavioral Decision Intelligence & Calibration Engine",
      category: "ai",
      badge: "Decision Intelligence & Brier Scoring",
      image: "/digital-memory-vault.png",
      liveUrl: "https://digital-memory-vault-weld.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/digital-memory-vault",
      tags: ["Next.js 14", "TypeScript", "Brier Calibration", "PostgreSQL", "Tailwind CSS"],
      description: "Behavioral analytics and decision intelligence platform for founders and operators. Enforces pre-commitment logging (confidence, risk, emotional state) at T=0, computes mathematical Brier calibration scores against actual outcomes, and detects cognitive bias patterns.",
      highlights: [
        "Mathematical Brier Score calibration tracking predictive confidence accuracy over time",
        "Pre-mortem & post-mortem decision review loops mitigating retrospective rationalization",
        "PostgreSQL database with indexed timeline queries for cognitive bias identification"
      ]
    },
    {
      id: "crashledger",
      title: "CrashLedger",
      subtitle: "Operational Failure Intelligence Platform",
      category: "fullstack",
      badge: "SRE Incident Lifecycle Engine",
      image: "/crashledger.png",
      liveUrl: "https://crash-ledger.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/crash-ledger",
      tags: ["Next.js 16", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "MTTR Engine"],
      description: "Operational failure intelligence platform enforcing root cause analysis, tracking recurring component breakdown risks, and calculating rolling MTTR across production systems.",
      highlights: [
        "Automated 5-Whys root cause analysis workflow enforcing preventative ownership",
        "Component risk scoring calculating vulnerability hotspots across system services",
        "Real-time Mean Time To Resolution (MTTR) calculation across rolling time windows"
      ]
    },
    {
      id: "coursegen",
      title: "CourseGen AI",
      subtitle: "Autonomous Curriculum & Video Platform",
      category: "ai",
      badge: "Autonomous AI Platform",
      image: "/coursegen-ai.png",
      liveUrl: "https://course-gen-ai-ten.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/course-gen-ai",
      tags: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM", "Clerk Auth"],
      description: "Autonomous course creation platform generating complete multi-chapter curricula with integrated YouTube educational video search, Neon PostgreSQL & Clerk authentication.",
      highlights: [
        "Structured multi-step curriculum synthesis with Google Gemini API",
        "Automated YouTube Data API integration fetching relevant chapter lectures",
        "Drizzle ORM schemas managing user enrollments, lessons, and course progress"
      ]
    },
    {
      id: "syncworld",
      title: "SyncWorld",
      subtitle: "Real-Time Distributed Collaborative Workspace",
      category: "fullstack",
      badge: "Real-Time Distributed System",
      image: "/syncworld.png",
      liveUrl: "https://sync-world.onrender.com/",
      githubUrl: "https://github.com/shakil-ur-rehman/sync-world",
      tags: ["WebSockets", "OpenJDK 21", "Vector Canvas", "<60ms Sync", "Java"],
      description: "Collaborative multi-tenant workspace with real-time vector whiteboard, remote cursor mesh, and an in-browser sandbox IDE with javac compiler diagnostics.",
      highlights: [
        "Sub-60ms bi-directional state synchronization via low-overhead WebSocket frames",
        "In-browser Java compilation engine executing code inside isolated sandboxes",
        "High-performance HTML5 Canvas rendering supporting concurrent multi-user drawings"
      ]
    },
    {
      id: "prepmaster",
      title: "PrepMaster Studio",
      subtitle: "AI Technical & Behavioral Mock Interview",
      category: "ai",
      badge: "AI Mock Interview Studio",
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
      id: "milkmart",
      title: "MilkMart Platform",
      subtitle: "Cold-Chain Dairy E-Commerce System",
      category: "fullstack",
      badge: "Cold-Chain Dairy E-Commerce",
      image: "/milkmart.png",
      liveUrl: "https://milkmart-platform.onrender.com/",
      githubUrl: "https://github.com/shakil-ur-rehman/milkmart-platform",
      tags: ["Django 5", "Python 3", "Razorpay Gateway", "Docker", "PostgreSQL"],
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
      image: "/framer.png",
      liveUrl: "https://framer-showcase-two.vercel.app/",
      githubUrl: "https://github.com/shakil-ur-rehman/framer-showcase",
      tags: ["Three.js", "GLSL Shaders", "Framer Motion", "60 FPS", "Canvas 2D"],
      description: "Curated suite of 10 production-grade WebGL, Three.js shaders, Perlin noise typography, and spring physics Framer smart components with live device preview.",
      highlights: [
        "Hardware-accelerated GLSL fragment shader distortions",
        "Zero-layout-shift micro-interactions with Framer Motion spring physics",
        "Live interactive responsive canvas previewing viewport states"
      ]
    }
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#ECE7DF] dark:bg-[#141616] text-[#000000] dark:text-[#FFFFFF] transition-colors duration-300 flex flex-col justify-between selection:bg-amber-300 selection:text-neutral-900">

      {/* 
        Unified Top Navigation Bar matching Home Page TopNav stage & styling:
        - Stage 1: Logo + New Delhi Clock on top
        - Stage 2: Centered floating pill with Home, Projects, Expertise, Resume
      */}
      <TopNav 
        theme={theme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPlay={() => setIsPlayOpen(true)}
        playSound={playSound}
      />

      {/* Main Content Container matching max-w-6xl grid */}
      <main className="w-full px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 pb-10 sm:pb-16 flex-1">
        <div className="max-w-6xl w-full mx-auto">

          {/* Page Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PRODUCTION SYSTEMS GALLERY
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 text-black dark:text-white">
              All Engineered Works
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              A comprehensive archive of production platforms, distributed systems, AI pipelines, and interactive web experiences engineered with Spring Boot, Next.js, Gemini API, and PostgreSQL.
            </p>
          </div>

          {/* 
            Filter & Search Controls (Hidden on Mobile as requested, Clean Toolbar on Tablet/Desktop)
          */}
          <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-3xl border-2 border-black dark:border-white/20 shadow-md">

            {/* Category Filter Chips with Horizontal Touch Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x">
              {[
                { id: "all", label: "All Works", count: projects.length },
                { id: "ai", label: "AI & Intelligence", count: 4 },
                { id: "fullstack", label: "Systems & Full-Stack", count: 4 }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    playSound("pop");
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id 
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-black" 
                      : "bg-black/10 dark:bg-white/10 text-neutral-500 dark:text-neutral-400"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech, title, or tags..."
                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-2xl py-2 pl-9 pr-8 text-xs sm:text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-xs font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Projects Container: Full natural scrolling on mobile, 2-column grid on desktop */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
            {filteredProjects.map((project) => {
              return (
                <article
                  key={project.id}
                  onClick={() => {
                    playSound("pop");
                    setSelectedProjectId(project.id);
                  }}
                  className="group rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1C1C20] text-black dark:text-white border-2 border-black dark:border-white/20 cursor-pointer"
                >
                  <div>
                    {/* Header: Badge & Quick Action Links */}
                    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
                        {project.badge}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              playSound("whoosh");
                            }}
                            className="p-1.5 rounded-full border border-black/15 dark:border-white/15 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all hover:scale-105 active:scale-95"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound("whoosh");
                          }}
                          className="px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 shadow-sm font-mono border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white"
                        >
                          <span>Live App</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="mb-3">
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-black dark:text-white">
                        {project.title}
                      </h2>
                      <p className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Screenshot Viewport Frame */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md my-3 border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={project.image}
                        alt={`${project.title} live interface`}
                        fill
                        sizes="(max-width: 768px) 100vw, 550px"
                        className="object-cover object-top opacity-100 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Engineering Highlights */}
                    {project.highlights && (
                      <div className="space-y-1.5 mb-4 p-3.5 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                        <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-neutral-500 dark:text-neutral-400">
                          Key Engineering Highlights:
                        </span>
                        <ul className="space-y-1">
                          {project.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-xs flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                            >
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
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
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] border bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound("pop");
                        setSelectedProjectId(project.id);
                      }}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
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

        </div>
      </main>

      {/* Unified Footer Matching Home Page */}
      <Footer playSound={playSound} />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        playSound={playSound}
      />

      <PlayModal
        isOpen={isPlayOpen}
        onClose={() => setIsPlayOpen(false)}
        playSound={playSound}
      />

      <CaseStudyModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        playSound={playSound}
      />
    </div>
  );
}
