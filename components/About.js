"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Code2, ShieldCheck } from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center sm:text-left">
        
        {/* Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3 justify-center sm:justify-start"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ABOUT</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-mono"
        >
          {personalInfo.aboutHeading}
        </motion.h2>

        {/* Text */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans mb-8 max-w-4xl"
        >
          {personalInfo.aboutText}
        </motion.p>

        {/* Two Cards: Build & Secure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-3.5 text-left glass-card"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-emerald-400">
                Build
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1 leading-relaxed">
                {personalInfo.aboutPillars[0].description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-3.5 text-left glass-card"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-emerald-400">
                Secure
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1 leading-relaxed">
                {personalInfo.aboutPillars[1].description}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
