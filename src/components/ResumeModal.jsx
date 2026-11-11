"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Dialog from "./Dialog";
import { contact, projects } from "../data/projects";
import { summary, experience, education, skills, openSource, certifications, achievements } from "../data/resume";
import { playSound } from "../lib/sound";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

const Dot = ({ c }) => <span className="mt-[8px] w-1 h-1 rounded-full shrink-0" style={{ background: `rgb(var(--${c}))` }} />;

function H({ children }) {
  return <h3 className="text-[12.5px] font-semibold text-muted mb-2.5">{children}</h3>;
}

export default function ResumeModal({ isOpen, onClose }) {
  const featured = ["repolens", "taskflow", "crashledger"].map((id) => projects.find((p) => p.id === id));

  return (
    <Dialog open={isOpen} onClose={onClose} label="Résumé" maxWidth="max-w-3xl">
      <motion.div variants={stagger} initial="hidden" animate="show" className="p-5 sm:p-8 text-[14px]">
        <motion.header variants={item} className="pb-5 border-b border-line/10 pr-12">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] leading-none tracking-[-0.03em]" style={{ fontVariationSettings: '"wdth" 108, "wght" 800' }}>
            {contact.name}
          </h2>
          <p className="mt-1.5 font-medium text-cobalt">Full Stack Developer</p>
          <p className="mt-2 text-[12.5px] text-muted flex flex-wrap gap-x-3 gap-y-1">
            <span>{contact.phone}</span>
            <a href={`mailto:${contact.email}`} className="underline underline-offset-4 hover:text-ink">{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">GitHub</a>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={contact.resumePdf} target="_blank" rel="noopener noreferrer" onClick={() => playSound("pop")} className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-ink text-bg font-semibold text-[13px]">
              Open PDF
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={contact.resumePdf} download onClick={() => playSound("pop")} className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-line/20 font-semibold text-[13px] hover:border-ink transition-colors">
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          </div>
        </motion.header>

        <motion.p variants={item} className="mt-5 leading-relaxed text-ink/85">
          {summary} Merged PRs in React, Next.js, and Spring Boot.
        </motion.p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="md:col-span-2 space-y-6">
            <motion.section variants={item}>
              <H>Experience</H>
              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e.company}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="font-semibold">
                        {e.role} <span className="font-normal text-muted">at {e.company}</span>
                      </p>
                      <span className="text-[12.5px] text-muted">{e.when}</span>
                    </div>
                    <ul className="mt-1.5 space-y-1 leading-relaxed text-ink/85">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <Dot c={e.color} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={item}>
              <H>Projects</H>
              <div className="space-y-4">
                {featured.map((p) => (
                  <div key={p.id}>
                    <p className="font-semibold">
                      {p.title} <span className="font-normal text-muted">– {p.subtitle}</span>
                    </p>
                    <p className="text-[12.5px] text-muted">{p.tags.join(", ")}</p>
                    <ul className="mt-1.5 space-y-1 leading-relaxed text-ink/85">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Dot c={p.domain} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={item}>
              <H>Open source</H>
              <ul className="space-y-1 leading-relaxed text-ink/85">
                {openSource.map((o) => (
                  <li key={o.repo} className="flex gap-2.5">
                    <Dot c={o.color} />
                    <span>
                      <strong className="font-semibold text-ink">{o.project}</strong> – {o.what}{" "}
                      {o.prs.map((pr, i) => (
                        <a key={pr.n} href={pr.url} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-2 hover:text-ink">
                          {i ? ", " : ""}#{pr.n}
                        </a>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <div className="space-y-6 md:border-l md:border-line/10 md:pl-6">
            <motion.section variants={item}>
              <H>Education</H>
              <p className="font-semibold leading-snug">{education.school}</p>
              <p className="text-[12.5px] text-muted mt-0.5">{education.degree}</p>
              <p className="text-[12.5px] font-semibold text-mint mt-0.5">
                CGPA {education.cgpa}, {education.when}
              </p>
            </motion.section>

            <motion.section variants={item}>
              <H>Technical skills</H>
              <div className="space-y-2.5">
                {skills.map((g) => (
                  <div key={g.group}>
                    <p className="text-[12.5px] font-semibold mb-1">{g.group}</p>
                    <p className="text-[12.5px] text-ink/80 leading-relaxed">{g.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={item}>
              <H>Certifications</H>
              <ul className="space-y-1.5 text-[12.5px] leading-snug">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-cobalt">
                      {c.name}
                    </a>
                    <span className="text-muted">, {c.by} ({c.year})</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={item}>
              <H>Achievements</H>
              <ul className="space-y-1.5 text-[12.5px] leading-snug">
                {achievements.map((a) => (
                  <li key={a.text}>
                    {a.text}
                    {a.year ? ` (${a.year})` : ""}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
}
