"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, Shield, Sparkles, Terminal, ArrowDown } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Experience() {
  const [activeStation, setActiveStation] = useState(null);

  const scrollToStation = (id) => {
    setActiveStation(id);
    const element = document.getElementById(`exp-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="experience" className="py-16 md:py-24 relative border-t border-white/10 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>EXPERIENCE // 07 // ENGINEERING ROADMAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              Work Experience &amp; Journey
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Milestone progression from client web development to AI RAG integrations and enterprise AppSec pipelines.
          </p>
        </motion.div>

        {/* Interactive Roadmap Progress Tracker Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md glass-card"
        >
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAREER FLIGHT PATH</span>
            </span>
            <span>3 Key Milestones Completed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {experiences.map((exp, idx) => {
              const isSelected = activeStation === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => scrollToStation(exp.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                    isSelected || exp.isCurrent
                      ? "bg-white/[0.05] border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                      : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      0{3 - idx} // {exp.phase}
                    </span>
                    {exp.isCurrent ? (
                      <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-zinc-500">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-white truncate">
                    {exp.company}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-sans mt-0.5 truncate">
                    {exp.role}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Animated Roadmap Main Vertical Track */}
        <div className="relative pl-8 sm:pl-12 max-w-4xl mx-auto">
          
          {/* Background Guide Line */}
          <div className="absolute left-[15px] sm:left-[21px] top-6 bottom-6 w-[2px] bg-white/10" />

          {/* Animated Gradient Roadmap Track */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-[15px] sm:left-[21px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-emerald-500/30 origin-top shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                id={`exp-${exp.id}`} 
                key={exp.id} 
                className="relative scroll-mt-32"
              >
                
                {/* Milestone Node Badge / Hex Station */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.12 }}
                  className={`absolute -left-[32px] sm:-left-[44px] top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0A0A0B] border-2 flex items-center justify-center z-20 shadow-xl ${
                    exp.isCurrent
                      ? "border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                      : "border-white/20 text-zinc-300 hover:border-emerald-400/60"
                  }`}
                >
                  {exp.isCurrent ? (
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 relative z-10" />
                    </div>
                  ) : (
                    <span className="font-mono text-xs font-bold text-zinc-300">
                      0{3 - index}
                    </span>
                  )}
                </motion.div>

                {/* Milestone Roadmap Card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  {...cardHoverProps}
                  className={`rounded-2xl border p-6 sm:p-7 backdrop-blur-md transition-all duration-300 glass-card relative group ${
                    exp.isCurrent
                      ? "bg-white/[0.04] border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-500/5"
                      : "bg-white/[0.03] border-white/10 hover:border-emerald-500/40"
                  }`}
                >
                  
                  {/* Card Header: Phase & Date Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {exp.phase}
                      </span>

                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-[#0A0A0B] shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0B] animate-pulse" />
                          <span>CURRENT MISSION</span>
                        </span>
                      )}

                      {exp.mission && (
                        <span className="text-[11px] font-mono text-zinc-400 hidden md:inline">
                          // {exp.mission}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role & Company Spotlight */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono group-hover:text-emerald-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-2 font-mono flex-wrap">
                      <span>{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Mission Technologies Chips */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-1">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300 group-hover:border-emerald-500/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Milestone Achievements & Bullets */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
