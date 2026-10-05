"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection({ theme, onSelectProject, playSound }) {


  const isDark = theme === "dark";
  const tabColor = isDark ? "#FFFFFF" : "#000000";

  // All 8 projects with actual images from public/
  const allProjects = [
    {
      id: "repolens",
      title: "RepoLens",
      subtitle: "AI Code Intelligence & 360° Diagnostics",
      category: "ai",
      badge: "Groq LPU & AST Diagnostics",
      badgeColor: "bg-[#D4F63C]/20 text-[#D4F63C] border-[#D4F63C]/40",
      image: "/repolens.png",
      liveUrl: "https://repo-lens-sooty.vercel.app/",
      tags: ["Next.js 14", "Groq LPU", "AST Engine", "GitHub Webhooks"],
      description: "Production code intelligence platform scanning GitHub repos with high-throughput LPU models to detect architecture flaws, security CVEs, and technical debt with automated PR review bots."
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
      tags: ["Next.js 14", "TypeScript", "Brier Calibration", "PostgreSQL"],
      description: "Behavioral analytics and decision intelligence platform for founders and operators. Enforces pre-commitment logging (confidence, risk, emotional state) at T=0, computes mathematical Brier calibration scores against actual outcomes, and detects cognitive bias patterns."
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
      tags: ["Next.js 16", "PostgreSQL", "Drizzle ORM", "MTTR: 38m"],
      description: "Operational failure intelligence platform enforcing root cause analysis, tracking recurring component breakdown risks, and calculating rolling MTTR across production systems."
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
      tags: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM"],
      description: "Autonomous course creation platform generating complete multi-chapter curricula with integrated YouTube educational video search, Neon PostgreSQL & Clerk authentication."
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
      tags: ["WebSockets", "OpenJDK 21", "Vector Canvas", "<60ms Sync"],
      description: "Collaborative multi-tenant workspace with real-time vector whiteboard, remote cursor mesh, and an in-browser sandbox IDE with javac compiler diagnostics."
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
      tags: ["Next.js 15", "Web Speech", "STAR Rubric", "Gemini 1.5"],
      description: "Executive technical and behavioral interview platform with continuous speech-to-text, live waveform telemetry, and automated Gemini 1.5 Flash diagnostic scorecards."
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
      tags: ["Python 3", "VADER Sentiment", "LDA Topics", "NetworkX"],
      description: "Conversational intelligence platform transforming chat logs into actionable sentiment trajectories, Latent Dirichlet Allocation (LDA) topic models, and 2D social networks."
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
      tags: ["Django 5", "Python 3", "Razorpay Gateway", "Docker"],
      description: "Farm-fresh dairy commerce ecosystem featuring cold-chain morning fulfillment, dual payment checkout (Razorpay + zero-failure checkout), and dynamic AJAX carts."
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
      tags: ["Three.js", "GLSL Shaders", "Framer Motion", "60 FPS"],
      description: "Curated suite of 10 production-grade WebGL, Three.js shaders, Perlin noise typography, and spring physics Framer smart components with live device preview."
    }
  ];

  // The 4 top featured projects displayed on the main page
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <section id="projects" className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 flex justify-center">
      <div className="max-w-6xl w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <h2
            className="doodle-font text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2 transition-colors duration-300"
            style={{ color: tabColor }}
          >
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-lg">
            A curated selection of live, production-grade applications built with modern distributed architectures, AI pipelines, and fluid interfaces.
          </p>
        </div>

        {/* 2x2 Grid of Featured Projects with Real Platform Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredProjects.map((project, idx) => {
            const isBlack = idx % 4 === 0 || idx % 4 === 3;
            return (
              <div
                key={project.id}
                onClick={() => {
                  playSound && playSound("pop");
                  onSelectProject && onSelectProject(project.id);
                }}
                className={`group relative rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
                  isBlack
                    ? "bg-[#0E1015] text-white border-2 border-black/80 dark:border-white/20"
                    : "bg-white text-neutral-900 border-2 border-black dark:border-white/30"
                }`}
              >
                {/* Top Badges & Live Link */}
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      isBlack
                        ? project.badgeColor
                        : "bg-neutral-100 text-neutral-800 border-neutral-300"
                    }`}
                  >
                    {project.badge}
                  </span>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound && playSound("whoosh");
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1 ${
                      isBlack
                        ? "bg-white/10 hover:bg-white text-white hover:text-black border-white/20"
                        : "bg-black/5 hover:bg-black text-black hover:text-white border-black/20"
                    }`}
                  >
                    <span>Live App</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Title & Description */}
                <div className="mb-4">
                  <h3
                    className={`text-xl sm:text-2xl font-bold tracking-tight mb-1 flex items-center gap-2 ${
                      isBlack ? "text-white" : "text-black"
                    }`}
                  >
                    <span>{project.title}</span>
                  </h3>
                  <p
                    className={`text-xs font-mono mb-2 ${
                      isBlack ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-500 font-semibold"
                    }`}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isBlack ? "text-slate-300" : "text-neutral-700"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* STRICTLY ACTUAL PLATFORM IMAGE SHOWCASE */}
                <div
                  className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl my-2 border ${
                    isBlack
                      ? "border-slate-700/80 bg-slate-950"
                      : "border-black/15 bg-neutral-100"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} live interface`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top opacity-100 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Tags & Action Link */}
                <div
                  className={`pt-3 mt-2 border-t flex items-center justify-between text-xs font-mono ${
                    isBlack ? "border-slate-800" : "border-black/10"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
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
                  <span
                    className={`font-semibold group-hover:underline whitespace-nowrap ml-2 ${
                      isBlack
                        ? "text-emerald-400"
                        : "text-emerald-600 dark:text-emerald-500"
                    }`}
                  >
                    Case Study →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* SHOW MORE WORK BUTTON (Opens the All-Projects Gallery Space) */}
        {/* ============================================================== */}
        <div className="w-full flex flex-col items-center justify-center mt-10 sm:mt-14">
          <Link
            href="/projects"
            onClick={() => playSound && playSound("whoosh")}
            className="group px-7 sm:px-9 py-4 rounded-2xl bg-white dark:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white/50 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 active:scale-[0.98] cursor-pointer inline-flex items-center gap-3 font-semibold text-base sm:text-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="doodle-font text-xl sm:text-2xl font-normal">Show More</span>

            <span className="transition-transform group-hover:translate-x-1.5 font-bold">→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}
