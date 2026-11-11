"use client";
import React, { useEffect, useState } from "react";
import ProjectVisual from "./ProjectVisual";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import Dialog from "./Dialog";
import { GithubIcon, FramerIcon } from "./Icons";
import { caseStudies, getProject, DOMAINS } from "../data/projects";
import { playSound } from "../lib/sound";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function CaseStudyModal({ projectId, onClose }) {
  // Keep the last project rendered while the panel animates out
  const [id, setId] = useState(projectId);
  useEffect(() => {
    if (projectId) setId(projectId);
  }, [projectId]);

  const project = id ? getProject(id) : null;
  const cs = id ? caseStudies[id] : null;

  return (
    <Dialog open={!!projectId} onClose={onClose} label={cs ? cs.title : "Case study"} variant="side">
      {project && cs && (
        <motion.div variants={stagger} initial="hidden" animate="show" className="px-5 sm:px-8 pt-5 pb-10 text-[14.5px]">
          <motion.div variants={item} className="flex items-center gap-2 text-sm text-muted pr-14">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: `rgb(var(--${project.domain}))` }} />
            {DOMAINS[project.domain].label}
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display mt-3 text-[clamp(1.8rem,3.6vw,2.5rem)] leading-[0.95] tracking-[-0.03em]"
            style={{ fontVariationSettings: '"wdth" 108, "wght" 820' }}
          >
            {project.title}
          </motion.h2>
          <motion.p variants={item} className="mt-2 text-[14.5px] font-medium" style={{ color: `rgb(var(--${project.domain}))` }}>
            {cs.category}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("whoosh")}
              className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-ink text-bg font-semibold text-[13px]"
            >
              Open live project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("pop")}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-line/20 font-semibold text-[13px] hover:border-ink transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Source on GitHub
            </a>
            {project.framerUrl && (
              <a
                href={project.framerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("pop")}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-line/20 font-semibold text-[13px] hover:border-ink transition-colors"
              >
                <FramerIcon className="w-4 h-4" />
                Framer profile
              </a>
            )}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 rounded-2xl p-3 sm:p-4"
            style={{ background: `rgb(var(--${project.domain}))` }}
          >
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectVisual project={project} sizes="(max-width: 768px) 100vw, 620px" />
            </motion.div>
          </motion.div>

          <motion.p variants={item} className="mt-6 leading-relaxed text-ink/85">
            {cs.overview}
          </motion.p>

          <motion.dl variants={item} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden bg-line/10 border border-line/10">
            <div className="bg-surface p-4">
              <dt className="text-sm text-muted">My role</dt>
              <dd className="mt-1 font-semibold leading-snug">{cs.role}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="text-sm text-muted">Impact</dt>
              <dd className="mt-1 text-[15px] leading-relaxed">{cs.impact}</dd>
            </div>
          </motion.dl>

          <motion.section variants={item} className="mt-7">
            <h3 className="flex items-center gap-2 text-[1.05rem] font-semibold">
              <AlertTriangle className="w-5 h-5 text-marigold" />
              Hard problems
            </h3>
            <ul className="mt-4 space-y-3">
              {cs.keyChallenges.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-marigold shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={item} className="mt-7">
            <h3 className="flex items-center gap-2 text-[1.05rem] font-semibold">
              <CheckCircle2 className="w-5 h-5 text-mint" />
              What shipped
            </h3>
            <ul className="mt-4 space-y-3">
              {cs.highlights.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-mint shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-1.5" aria-label="Stack">
            {cs.badges.map((b) => (
              <li key={b} className="px-2.5 py-1 rounded-md text-[12.5px] bg-sunken">
                {b}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </Dialog>
  );
}
