"use client";

import { personalInfo } from "@/data/portfolioData";
import { Code2, ShieldCheck, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 relative border-t border-white/[0.06] bg-[#04080D]/60">
      
      {/* Background Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center sm:text-left">
        
        {/* Section Label */}
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3 justify-center sm:justify-start">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ABOUT ME</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-mono">
          {personalInfo.aboutHeading}
        </h2>

        {/* Concise Paragraph */}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans mb-8">
          {personalInfo.aboutText}
        </p>

        {/* Two Compact Focus Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#060C14] border border-white/[0.06] flex items-start gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Full-Stack Foundation</h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                MERN stack development, RESTful APIs, and responsive React/Next.js interfaces.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#060C14] border border-white/[0.06] flex items-start gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Security Exploration</h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                OWASP Top 10, API security testing, secure code review, and security labs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
