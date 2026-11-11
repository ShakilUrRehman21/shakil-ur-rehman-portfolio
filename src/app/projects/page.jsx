"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import AppShell, { useApp } from "../../components/AppShell";
import ProjectVisual from "../../components/ProjectVisual";
import { GithubIcon } from "../../components/Icons";
import { projects, DOMAINS } from "../../data/projects";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI products" },
  { id: "systems", label: "Systems & full-stack" },
];

function Card({ project, index }) {
  const { openCase, playSound } = useApp();
  const color = `rgb(var(--${project.domain}))`;
  const stop = (e) => {
    e.stopPropagation();
    playSound("whoosh");
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        whileHover={{ y: -4 }}
        onClick={() => {
          playSound("pop");
          openCase(project.id);
        }}
        className="group h-full rounded-2xl bg-surface border border-line/10 shadow-[0_16px_40px_-30px_rgb(var(--ink)/0.45)] overflow-hidden cursor-pointer flex flex-col"
      >
        <div className="m-2 rounded-xl p-3.5" style={{ background: color }}>
          <ProjectVisual project={project} sizes="(max-width: 768px) 92vw, 360px" />
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <p className="flex items-center gap-2 text-[12px] text-muted">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            {DOMAINS[project.domain].label}
          </p>
          <h2 className="mt-1.5 font-display text-[1.35rem] leading-none tracking-[-0.025em] transition-[font-variation-settings] duration-500 [font-variation-settings:'wdth'_100,'wght'_780] group-hover:[font-variation-settings:'wdth'_116,'wght'_840]">
            {project.title}
          </h2>
          <p className="mt-1 text-[13px] font-medium" style={{ color }}>
            {project.subtitle}
          </p>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-auto pt-4 flex items-center gap-1.5">
            <span className="text-[12px] text-muted truncate">{project.tags.slice(0, 3).join(", ")}</span>
            <span className="ml-auto flex gap-1.5 shrink-0">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={stop} aria-label={`${project.title} source on GitHub`} className="w-8 h-8 grid place-items-center rounded-full border border-line/20 hover:border-ink transition-colors">
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={stop} className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-ink text-bg text-[12.5px] font-semibold">
                Live <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </span>
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

function Gallery() {
  const { playSound } = useApp();
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const counts = useMemo(
    () => ({ all: projects.length, ai: projects.filter((p) => p.category === "ai").length, systems: projects.filter((p) => p.category === "systems").length }),
    []
  );

  const list = projects.filter((p) => {
    const s = q.trim().toLowerCase();
    return (filter === "all" || p.category === filter) && (!s || [p.title, p.subtitle, p.summary, ...p.tags].some((x) => x.toLowerCase().includes(s)));
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-24">
      <div className="mx-auto max-w-[1120px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.2rem,4.6vw,3.4rem)] leading-none tracking-[-0.035em]"
          style={{ fontVariationSettings: '"wdth" 106, "wght" 800' }}
        >
          All projects
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-3 text-[15px] leading-relaxed text-muted max-w-[56ch]">
          Production platforms, AI pipelines, and interactive web experiences. Open any card for the full case study.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div role="tablist" aria-label="Filter projects" className="inline-flex p-0.5 rounded-full bg-sunken border border-line/10 overflow-x-auto no-scrollbar max-w-full">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                type="button"
                onClick={() => {
                  playSound("pop");
                  setFilter(f.id);
                }}
                className="relative h-8 px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap"
              >
                {filter === f.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className={`relative inline-flex items-center gap-1.5 ${filter === f.id ? "text-bg" : "text-muted hover:text-ink"}`}>
                  {f.label}
                  <span className="text-[11px] opacity-70 tabular-nums">{counts[f.id]}</span>
                </span>
              </button>
            ))}
          </div>

          <label className="relative w-full sm:w-72">
            <span className="sr-only">Search projects</span>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or tech"
              className="w-full h-10 pl-10 pr-9 rounded-full bg-surface border border-line/15 text-[14px] outline-none focus:border-cobalt focus:shadow-[0_0_0_3px_rgb(var(--cobalt)/0.15)] transition-shadow"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 grid place-items-center rounded-full hover:bg-sunken">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </label>
        </div>

        <motion.ul layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-line/20 p-8 text-center">
            <p className="font-semibold">No projects match "{q}"</p>
            <p className="mt-1 text-[14px] text-muted">Try a technology like PostgreSQL, Next.js or Groq.</p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setFilter("all");
              }}
              className="mt-4 h-9 px-4 rounded-full bg-ink text-bg text-[13px] font-semibold"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <AppShell>
      <Gallery />
    </AppShell>
  );
}
