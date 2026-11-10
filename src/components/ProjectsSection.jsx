"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsSection({ theme, onSelectProject, playSound }) {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "ai"

  // 1. Core Full-Stack & Systems Engineering Projects
  const coreProjects = [
    {
      id: "syncworld",
      title: "SyncWorld",
      subtitle: "Distributed Real-Time Workspace",
      badge: "Real-Time Distributed System",
      badgeStyle: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
      image: "/syncworld.png",
      liveUrl: "https://sync-world.onrender.com/",
      tags: ["WebSockets", "OpenJDK 21", "Vector Canvas", "<60ms Sync"],
      description: "Low-latency distributed workspace with multi-user vector canvas synchronization, remote cursor presence mesh, and an in-browser sandbox compiler."
    },
    {
      id: "crashledger",
      title: "CrashLedger",
      subtitle: "SRE Incident Lifecycle Platform",
      badge: "Failure Intelligence Engine",
      badgeStyle: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30",
      image: "/crashledger.png",
      liveUrl: "https://crash-ledger.vercel.app/",
      tags: ["Next.js 16", "PostgreSQL", "Drizzle ORM", "MTTR Engine"],
      description: "Operational failure analytics platform enforcing automated post-mortems, tracking recurring component risks, and calculating production MTTR."
    },
    {
      id: "milkmart",
      title: "MilkMart Platform",
      subtitle: "Cold-Chain Dairy Commerce System",
      badge: "Cold-Chain Commerce",
      badgeStyle: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
      image: "/milkmart.png",
      liveUrl: "https://milkmart-platform.onrender.com/",
      tags: ["Django 5", "Python 3", "Razorpay Gateway", "Docker"],
      description: "Perishable dairy fulfillment engine featuring early-morning slot routing, dual payment resilience (Razorpay + instant fallback), and dynamic AJAX carts."
    },
    {
      id: "framershowcase",
      title: "Framer Components Lab",
      subtitle: "WebGL Shaders & Motion Systems",
      badge: "10 Live Smart Components",
      badgeStyle: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
      image: "/framer.png",
      liveUrl: "https://framer-showcase-two.vercel.app/",
      tags: ["Three.js", "GLSL Shaders", "Framer Motion", "60 FPS"],
      description: "Curated suite of 10 production-grade WebGL canvas shaders, noise displacement typography, and spring physics micro-interaction components."
    }
  ];

  // 2. AI-Native Products
  const aiProjects = [
    {
      id: "repolens",
      title: "RepoLens",
      subtitle: "AI Code Diagnostics & AST Analysis",
      badge: "Groq LPU & AST Diagnostics",
      badgeStyle: "bg-lime-500/15 text-lime-800 dark:text-lime-300 border-lime-500/30",
      image: "/repolens.png",
      liveUrl: "https://repo-lens-sooty.vercel.app/",
      tags: ["Next.js 14", "Groq LPU", "AST Engine", "GitHub Webhooks"],
      description: "High-throughput code intelligence scanning GitHub repositories to diagnose architecture flaws, security vulnerabilities, and technical debt."
    },
    {
      id: "digitalmemoryvault",
      title: "Digital Memory Vault",
      subtitle: "Behavioral Decision Intelligence",
      badge: "Decision Intelligence & Scoring",
      badgeStyle: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
      image: "/digital-memory-vault.png",
      liveUrl: "https://digital-memory-vault-weld.vercel.app/",
      tags: ["Next.js 14", "TypeScript", "Brier Calibration", "PostgreSQL"],
      description: "Cognitive analytics engine logging pre-commitment rationales at T=0, calculating mathematical Brier calibration scores, and mitigating hindsight bias."
    },
    {
      id: "coursegen",
      title: "CourseGen AI",
      subtitle: "Autonomous Curriculum Generator",
      badge: "Autonomous AI Platform",
      badgeStyle: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
      image: "/coursegen-ai.png",
      liveUrl: "https://course-gen-ai-ten.vercel.app/",
      tags: ["Next.js 14", "Gemini API", "PostgreSQL", "Drizzle ORM"],
      description: "Autonomous education engine generating multi-chapter curricula with integrated YouTube educational search, Neon PostgreSQL, and Clerk auth."
    },
    {
      id: "prepmaster",
      title: "PrepMaster Studio",
      subtitle: "Technical & Behavioral Mock Studio",
      badge: "AI Mock Interview Studio",
      badgeStyle: "bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30",
      image: "/prepmaster.png",
      liveUrl: "https://prep-master-studio.vercel.app/",
      tags: ["Next.js 15", "Web Speech", "STAR Rubric", "Gemini 1.5"],
      description: "Voice-driven mock interview studio with continuous speech-to-text, live waveform telemetry, and structured STAR rubric diagnostic scorecards."
    }
  ];

  const currentList = activeTab === "projects" ? coreProjects : aiProjects;

  return (
    <section id="projects" className="w-full pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 flex justify-center relative select-none">
      <div className="max-w-6xl w-full">

        {/* Section Header with Strong, Authoritative Typography & Eyebrow */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <motion.span 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2"
          >
            Crafted & Shipped
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white"
          >
            Featured Projects
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mt-3 leading-relaxed"
          >
            Production applications engineered with high-concurrency distributed backends, AI diagnostics, and fluid motion interfaces.
          </motion.p>
        </div>

        {/* 
          Centered Signature Tabs matching Reference Image 2:
          - 'Projects' (active with warm golden underline #E5A823)
          - 'Designing with AI'
        */}
        <div className="flex items-center justify-center gap-8 sm:gap-14 mb-10 sm:mb-14">
          {/* 1. Projects Tab */}
          <button
            type="button"
            onClick={() => {
              playSound && playSound("pop");
              setActiveTab("projects");
            }}
            className={`relative font-bold text-lg sm:text-xl tracking-tight transition-colors pb-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "projects" 
                ? "text-black dark:text-white" 
                : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            Projects
            {activeTab === "projects" && (
              <motion.div
                layoutId="projectTabUnderline"
                className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#E5A823] rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* 2. Designing with AI Tab */}
          <button
            type="button"
            onClick={() => {
              playSound && playSound("pop");
              setActiveTab("ai");
            }}
            className={`relative font-bold text-lg sm:text-xl tracking-tight transition-colors pb-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "ai" 
                ? "text-black dark:text-white" 
                : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            Designing with AI
            {activeTab === "ai" && (
              <motion.div
                layoutId="projectTabUnderline"
                className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#E5A823] rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* 
          Unified, Elevated Project Cards:
          - Tactile STACKABLE Card Deck on scroll (sticky with progressive top offsets and z-indexes)
          - Mobile: Compact 100% visible card layout with fluid touch interactions
          - Desktop: Elegant split showcase with dynamic screenshot perspective
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto flex flex-col relative"
          >
            {currentList.map((project, idx) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    playSound && playSound("pop");
                    onSelectProject && onSelectProject(project.id);
                  }}
                  style={{
                    top: `calc(74px + ${idx * 14}px)`,
                    zIndex: 10 + idx,
                  }}
                  className="sticky group rounded-[24px] sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-[#1C1C20] border-2 border-black dark:border-white/20 mb-8 sm:mb-12 md:mb-16 last:mb-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
                    
                    {/* Left/Content Column (7 cols on desktop) */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Top Bar: Category Pill & Live Link */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2 flex-wrap">
                          <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border ${project.badgeStyle}`}>
                            {project.badge}
                          </span>

                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              playSound && playSound("whoosh");
                            }}
                            className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-1 text-black dark:text-white font-mono"
                          >
                            <span>Live App</span>
                            <span>↗</span>
                          </motion.a>
                        </div>

                        {/* Mobile-Only Screenshot Viewport (Clean, compact, non-overflowing) */}
                        <div className="block md:hidden mb-3.5 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xs bg-neutral-100 dark:bg-neutral-900 relative">
                          <div className="relative w-full aspect-[16/9] overflow-hidden">
                            <Image
                              src={project.image}
                              alt={`${project.title} live interface`}
                              fill
                              sizes="(max-width: 768px) 100vw, 450px"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>
                        </div>

                        {/* Strong, Authoritative Project Title & Architecture Subtitle */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono font-semibold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-2.5">
                          {project.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Footer: Tech Tags & Case Study Trigger */}
                      <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono gap-2 flex-wrap">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:underline text-xs sm:text-sm">
                          <span>Case Study</span>
                          <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Desktop Screenshot Viewport (5 cols on desktop, hidden on mobile) */}
                    <div className="hidden md:block md:col-span-5 w-full">
                      <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xs bg-neutral-100 dark:bg-neutral-900 relative">
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`${project.title} live interface`}
                            fill
                            sizes="500px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* SHOW MORE WORK BUTTON */}
        <div className="w-full flex flex-col items-center justify-center mt-12 sm:mt-16">
          <Link
            href="/projects"
            onClick={() => playSound && playSound("whoosh")}
            className="group px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white/40 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-1 active:scale-[0.98] cursor-pointer inline-flex items-center gap-3 font-semibold text-base sm:text-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-extrabold tracking-tight text-lg sm:text-xl">Show More Engineered Works</span>
            <span className="transition-transform group-hover:translate-x-1.5 font-bold">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
