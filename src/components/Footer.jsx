"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Copy, Check, Send } from "lucide-react";
import { useApp } from "./AppShell";
import Magnetic from "./Magnetic";
import { contact } from "../data/projects";

const LINKS = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "LeetCode", href: contact.leetcode },
  { label: "Framer", href: contact.framer },
];

function Field({ label, as = "input", ...props }) {
  const Tag = as;
  return (
    <label className="group block">
      <span className="block text-[13px] text-[#A3A9C9] mb-1.5">{label}</span>
      <Tag
        {...props}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-[14px] text-[#ECEEF8] placeholder-[#A3A9C9]/60 outline-none transition-[border-color,background-color,box-shadow] focus:border-[rgb(var(--marigold))] focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgb(var(--marigold)/0.15)] resize-none"
      />
    </label>
  );
}

function Wordmark() {
  const letters = "Shakil".split("");
  return (
    <div aria-hidden="true" className="select-none flex justify-center overflow-hidden pt-6 -mb-[0.18em]">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: "-12%", transition: { type: "spring", stiffness: 400, damping: 12 } }}
          className="font-display inline-block leading-[0.8] text-[clamp(5rem,19vw,22rem)] tracking-[-0.04em] text-transparent hover:text-[rgb(var(--marigold))] transition-colors duration-300"
          style={{ fontVariationSettings: '"wdth" 135, "wght" 900', WebkitTextStroke: "1.5px rgb(255 255 255 / 0.18)" }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

export default function Footer() {
  const { playSound, scrollTo } = useApp();
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      playSound("ok");
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  const submit = (e) => {
    e.preventDefault();
    if (!from || !message) return;
    playSound("whoosh");
    const subject = encodeURIComponent(`Hello from ${from}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${from}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" className="on-night relative bg-night text-[#ECEEF8] px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 overflow-hidden">
      <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.95] tracking-[-0.035em]"
            style={{ fontVariationSettings: '"wdth" 100, "wght" 820' }}
          >
            Feel free to
            <br />
            reach out
          </motion.h2>
          <p className="mt-4 text-[15px] text-[#A3A9C9] max-w-[40ch]">
            I'm currently open to exploring new engineering opportunities.
          </p>

          <div className="mt-8">
            <p className="text-[13px] text-[#A3A9C9] mb-1.5">Email me directly</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                onClick={() => playSound("pop")}
                className="group relative text-[clamp(1.1rem,2vw,1.4rem)] font-semibold break-all"
              >
                {contact.email}
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[rgb(var(--marigold))] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="relative inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full bg-white/[0.07] border border-white/10 text-[12.5px] hover:bg-white/[0.12] transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "y" : "n"}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[rgb(var(--mint))]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <p className="mt-2 text-[13px] text-[#A3A9C9]">{contact.phone}</p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("pop")}
                  className="group relative inline-flex overflow-hidden"
                >
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">{l.label} ↗</span>
                  <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-[rgb(var(--marigold))]">
                    {l.label} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <form onSubmit={submit} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3">
            <p className="text-[15px] font-semibold">Or leave a note</p>
            <Field label="Your email" type="email" required value={from} onChange={(e) => setFrom(e.target.value)} placeholder="recruiter@company.com" />
            <Field label="Message" as="textarea" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you working on?" />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="group w-full h-11 rounded-xl bg-[rgb(var(--marigold))] text-[#151935] font-semibold text-[14px] inline-flex items-center justify-center gap-2 overflow-hidden relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={sent ? "sent" : "idle"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  {sent ? "Opening your mail app" : "Send message"}
                  {!sent && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <p className="text-[12px] text-[#A3A9C9]">This opens your email app with the message filled in.</p>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] mt-14 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-[#A3A9C9]">
        <span>© {new Date().getFullYear()} Shakil Ur Rehman. Built with Next.js and Framer Motion.</span>
        <Magnetic>
          <button
            type="button"
            onClick={() => {
              playSound("whoosh");
              scrollTo(document.body);
            }}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-white/15 hover:bg-white hover:text-[#151935] transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </button>
        </Magnetic>
      </div>

      <div className="mt-8">
        <Wordmark />
      </div>
    </footer>
  );
}
