"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, Shield, Sparkles } from "lucide-react";
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
    <section id="experience" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
              <span>EXPERIENCE // 06 // WORK HISTORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
              Professional Work Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm">
            Full-stack engineering, API development, and software integration across remote teams and client deployments.
          </p>
        </motion.div>

        {/* Interactive Roadmap Tracker */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 p-4 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#666666]">
            <span className="flex items-center gap-1.5 text-[#365CF5] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ENGINEERING MILESTONES</span>
            </span>
            <span>3 Career Stations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {experiences.map((exp, idx) => {
              const isSelected = activeStation === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => scrollToStation(exp.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-[#365CF5] ${
                    isSelected || exp.isCurrent
                      ? "bg-[#FAF9F6] border-[#365CF5] shadow-sm"
                      : "bg-white border-[#E7E5E0] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#365CF5]">
                      0{3 - idx} // {exp.phase}
                    </span>
                    {exp.isCurrent ? (
                      <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-[#8E8C85]">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#171717] truncate">
                    {exp.company}
                  </div>
                  <div className="text-[11px] text-[#666666] font-sans mt-0.5 truncate">
                    {exp.role}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Vertical Track */}
        <div className="relative pl-8 sm:pl-12 max-w-4xl mx-auto">
          
          {/* Guide Line */}
          <div className="absolute left-[15px] sm:left-[21px] top-6 bottom-6 w-[2px] bg-[#E7E5E0]" />

          {/* Animated Gradient Track */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-[15px] sm:left-[21px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#365CF5] via-[#365CF5]/70 to-[#365CF5]/20 origin-top"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div 
                id={`exp-${exp.id}`} 
                key={exp.id} 
                className="relative scroll-mt-32"
              >
                
                {/* Milestone Badge Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.12 }}
                  className={`absolute -left-[32px] sm:-left-[44px] top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-2 flex items-center justify-center z-20 shadow-md ${
                    exp.isCurrent
                      ? "border-[#365CF5] text-[#365CF5]"
                      : "border-[#E7E5E0] text-[#666666]"
                  }`}
                >
                  {exp.isCurrent ? (
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#365CF5]" />
                  ) : (
                    <span className="font-mono text-xs font-bold text-[#171717]">
                      0{3 - index}
                    </span>
                  )}
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  {...cardHoverProps}
                  className={`rounded-2xl border p-6 sm:p-7 shadow-sm transition-all duration-200 ${
                    exp.isCurrent
                      ? "bg-white border-[#365CF5]/40"
                      : "bg-white border-[#E7E5E0] hover:border-[#D5D3CC]"
                  }`}
                >
                  
                  {/* Card Header: Phase & Date Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-4 border-b border-[#E7E5E0]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#365CF5]/10 text-[#365CF5] border border-[#365CF5]/20">
                        {exp.phase}
                      </span>

                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#171717] text-white flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>CURRENT MISSION</span>
                        </span>
                      )}

                      {exp.mission && (
                        <span className="text-xs font-mono text-[#666666] hidden md:inline">
                          // {exp.mission}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717] bg-[#FAF9F6] px-3 py-1 rounded-lg border border-[#E7E5E0] self-start sm:self-auto shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-[#365CF5]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role & Company Spotlight */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#365CF5] mt-1 flex items-center gap-2 font-mono flex-wrap">
                      <span>{exp.company}</span>
                      <span className="text-[#D5D3CC]">•</span>
                      <span className="text-[#666666] font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#666666]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Mission Technologies Chips */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullets */}
                  <div className="space-y-2.5 pt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#666666] leading-relaxed font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#365CF5] shrink-0 mt-0.5" />
                        <span className="text-[#171717]">{bullet}</span>
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
