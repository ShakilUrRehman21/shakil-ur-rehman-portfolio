"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Dialog from "./Dialog";
import { playSound } from "../lib/sound";

// Technical expertise, shown as an accordion so each area can be opened in turn
const AREAS = [
  {
    title: "Backend Architecture & APIs",
    level: "Core specialization",
    color: "cobalt",
    description:
      "Designing high-throughput, maintainable microservices and RESTful APIs with strict contract enforcement, rate-limiting, and resilient state transitions.",
    technologies: ["Java", "Spring Boot", "Node.js", "Express", "REST APIs", "System Design"],
  },
  {
    title: "Generative AI & LLM Systems",
    level: "Production experience",
    color: "orchid",
    description:
      "Prompt-driven pipelines, multi-model fallback chains, temperature calibration, and Zod schema enforcement for deterministic structured AI outputs.",
    technologies: ["Google Gemini API", "Prompt Engineering", "Zod", "Autonomous Agents", "RAG Patterns"],
  },
  {
    title: "Database & Relational Design",
    level: "Advanced",
    color: "cobalt",
    description:
      "Multi-table relational schema modeling, role-based access control (RBAC), connection pooling, migrations, and query optimization.",
    technologies: ["PostgreSQL", "Neon Serverless", "Drizzle ORM", "Prisma", "SQL Indexing"],
  },
  {
    title: "Full-Stack Web & Real-Time Meshes",
    level: "Hands-on",
    color: "mint",
    description:
      "Fluid reactive user interfaces integrated seamlessly with WebSocket networks, procedural audio synthesis, and secure auth session management.",
    technologies: ["Next.js (App Router)", "React.js", "Tailwind CSS", "WebSockets", "Clerk Auth"],
  },
];

export default function ExpertiseModal({ isOpen, onClose }) {
  const [open, setOpen] = useState(0);

  return (
    <Dialog open={isOpen} onClose={onClose} label="Technical expertise" maxWidth="max-w-2xl">
      <div className="p-6 sm:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.03em] pr-12"
          style={{ fontVariationSettings: '"wdth" 115, "wght" 820' }}
        >
          Technical expertise
        </motion.h2>
        <p className="mt-3 text-[16px] text-muted max-w-[48ch]">
          An overview of my engineering competencies, architectural design principles, and hands-on production tooling.
        </p>

        <ul className="mt-8 space-y-2">
          {AREAS.map((a, i) => {
            const on = open === i;
            return (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="rounded-2xl border transition-colors"
                style={{
                  borderColor: on ? `rgb(var(--${a.color}))` : "rgb(var(--line) / 0.1)",
                  background: on ? `rgb(var(--${a.color}) / 0.07)` : "transparent",
                }}
              >
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => {
                    playSound(on ? "slide" : "pop");
                    setOpen(on ? -1 : i);
                  }}
                  className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: `rgb(var(--${a.color}))` }} />
                  <span className="flex-1">
                    <span className="block font-semibold text-[17px]">{a.title}</span>
                    <span className="block text-sm text-muted">{a.level}</span>
                  </span>
                  <motion.span animate={{ rotate: on ? 45 : 0 }} className="w-9 h-9 rounded-full bg-sunken grid place-items-center">
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-11 sm:pl-12">
                        <p className="text-[15px] leading-relaxed text-ink/85">{a.description}</p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {a.technologies.map((t, k) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.08 + k * 0.03 }}
                              className="px-2.5 py-1 rounded-full text-[13px] bg-surface border border-line/10"
                            >
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-8 pt-5 border-t border-line/10 flex flex-wrap justify-between gap-2 text-sm text-muted">
          <span>Continuous learning and code craftsmanship</span>
          <span className="inline-flex items-center gap-2 font-semibold text-mint">
            <span className="live-dot w-2 h-2 rounded-full bg-mint" />
            Available for opportunities
          </span>
        </p>
      </div>
    </Dialog>
  );
}
