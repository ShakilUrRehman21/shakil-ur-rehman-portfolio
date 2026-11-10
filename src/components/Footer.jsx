"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Footer({ playSound, isAreasCollapsed, onToggleAreas }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    playSound && playSound("pop");
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="relative z-30 w-full bg-[#000000] text-white py-14 sm:py-20 px-4 sm:px-6 md:px-16 selection:bg-neutral-800 selection:text-white border-t border-neutral-900 select-none">
      
      {/* Inverted Yellow Tab Attached to Footer Top (When Areas of Interest is Collapsed) */}
      {isAreasCollapsed && onToggleAreas && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-[2px] z-40">
          <button
            type="button"
            onClick={onToggleAreas}
            className="group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-1.5 sm:py-2 rounded-t-2xl bg-[#E5A823] hover:bg-[#F5B833] text-black font-mono text-xs sm:text-sm font-bold border-2 border-black border-b-0 shadow-md transition-all cursor-pointer select-none active:scale-95"
            title="Click to open Areas of Interest"
            aria-label="Open Areas of Interest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/70 group-hover:scale-125 transition-transform" />
            <span>Areas of Interest // Open</span>
            <span className="inline-block text-[10px]">▲</span>
          </button>
        </div>
      )}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Column: Bold Typography & Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
              Feel free to reach out!
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-neutral-200 mb-4 sm:mb-6 font-medium">
              I'm currently open to exploring new engineering opportunities.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
              <strong className="text-white font-semibold">P.S.</strong> You can drop a message here or connect directly via LinkedIn or GitHub!
            </p>
          </div>

          {/* Social Links on Bottom Left */}
          <div className="flex items-center gap-6 sm:gap-8 mt-8 sm:mt-12 pt-4 text-sm sm:text-base font-semibold text-white">
            <motion.a 
              href="mailto:rehmanshakil21@gmail.com" 
              whileHover={{ y: -2 }}
              className="hover:underline hover:text-emerald-400 transition-colors"
              onClick={() => playSound && playSound("pop")}
            >
              Email ↗
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/shakilurrehman21" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2 }}
              className="hover:underline hover:text-emerald-400 transition-colors"
              onClick={() => playSound && playSound("pop")}
            >
              LinkedIn ↗
            </motion.a>
            <motion.a 
              href="https://github.com/shakilurrehman21" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2 }}
              className="hover:underline hover:text-emerald-400 transition-colors"
              onClick={() => playSound && playSound("pop")}
            >
              GitHub ↗
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Your Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="w-full bg-[#18181B] border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-[#18181B] border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 resize-none transition-colors"
              ></textarea>
            </div>

            {/* Submit Button with Pop Animation */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSound && playSound("pop")}
              className="w-full py-3.5 rounded-2xl bg-[#27272A] hover:bg-white hover:text-black text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitted ? "Message Sent! ✨" : "Send Message →"}
            </motion.button>
          </form>

          {/* Copyright on Bottom Right */}
          <div className="flex justify-end mt-10 pt-4">
            <span className="text-xs sm:text-sm text-neutral-400 font-mono">
              © Shakil Ur Rehman • Built with Next.js & Framer Motion
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
