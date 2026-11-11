"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Award, Trophy, ArrowUpRight, Code2 } from "lucide-react";
import { experience, education, certifications, achievements, skills } from "../data/resume";

function Block({ icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-surface border border-line/10 p-5"
    >
      <h3 className="flex items-center gap-2 text-[13px] font-semibold text-muted">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 overflow-x-clip">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="h-section">Experience</h2>
        <p className="mt-2.5 text-[15px] text-muted max-w-[52ch]">Two internships, a B.Tech in CSE, and the skills I use day to day.</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Timeline */}
          <ol ref={ref} className="lg:col-span-7 relative pl-9 self-start">
            <span aria-hidden="true" className="absolute left-[13px] top-1 bottom-1 w-[2px] rounded-full bg-line/10" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY, transformOrigin: "50% 0%" }}
              className="absolute left-[13px] top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-marigold via-cobalt to-mint"
            />
            {[...experience.map((e) => ({ ...e, kind: "job" })), { kind: "edu", ...education, color: "mint" }].map((e, i) => {
              const color = `rgb(var(--${e.color}))`;
              const Icon = e.kind === "edu" ? GraduationCap : Briefcase;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pb-10 last:pb-0"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                    className="absolute -left-9 top-0 w-7 h-7 rounded-full grid place-items-center ring-4 ring-bg"
                    style={{ background: color, color: e.color === "marigold" ? "#151935" : "#fff" }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.span>
                  <p className="text-[12.5px] font-semibold" style={{ color }}>
                    {e.when}
                  </p>
                  {e.kind === "job" ? (
                    <>
                      <h3 className="mt-0.5 text-[1.15rem] font-semibold leading-snug">{e.role}</h3>
                      <p className="text-[14px] text-muted">
                        {e.company}, {e.where}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-ink/85 max-w-[62ch]">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-2.5">
                            <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-0.5 text-[1.15rem] font-semibold leading-snug">{e.degree}</h3>
                      <p className="text-[14px] text-muted">{e.school}</p>
                      <p className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold" style={{ background: `rgb(var(--mint) / 0.12)`, color }}>
                        CGPA {e.cgpa} / 10
                      </p>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ol>

          {/* Side column */}
          <div className="lg:col-span-5 space-y-4">
            <Block icon={Code2} title="Skills">
              <dl className="space-y-3">
                {skills.map((g) => (
                  <div key={g.group}>
                    <dt className="text-[12.5px] font-semibold mb-1.5">{g.group}</dt>
                    <dd className="flex flex-wrap gap-1">
                      {g.items.map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{ y: -2 }}
                          className="px-2 py-0.5 rounded-md text-[12px]"
                          style={{ background: `rgb(var(--${g.color}) / 0.1)` }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block icon={Award} title="Certifications" delay={0.05}>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="text-[14px] leading-snug">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1 font-medium hover:text-cobalt transition-colors">
                      {c.name}
                      <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100" />
                    </a>
                    <span className="block text-[12.5px] text-muted">
                      {c.by}, {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={Trophy} title="Achievements" delay={0.1}>
              <ul className="space-y-2 text-[14px] leading-snug">
                {achievements.map((a) => (
                  <li key={a.text} className="flex gap-2.5">
                    <span className="mt-[7px] w-1 h-1 rounded-full shrink-0 bg-marigold" />
                    <span>
                      {a.url ? (
                        <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line/30 underline-offset-4 hover:decoration-ink">
                          {a.text}
                        </a>
                      ) : (
                        a.text
                      )}
                      {a.year && <span className="text-muted"> ({a.year})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}
