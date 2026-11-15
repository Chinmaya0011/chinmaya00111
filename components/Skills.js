"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Code2, CheckCircle2 } from "lucide-react";
import { expertiseAreas } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Skills() {
  const areaIcons = {
    appsec: ShieldCheck,
    "ai-sec": Cpu,
    "software-eng": Code2
  };

  return (
    <section id="expertise" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6] scroll-mt-20">
      <div id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 scroll-mt-20">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
            <span>EXPERTISE // 02</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            Technical Expertise
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
            Three focused areas combining software engineering, application security, and AI systems.
          </p>
        </motion.div>

        {/* 3 Focused Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {expertiseAreas.map((area, idx) => {
            const Icon = areaIcons[area.id] || ShieldCheck;
            return (
              <motion.div
                key={area.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E5E0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#365CF5]">
                        AREA {area.areaNumber}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#171717] tracking-tight mb-4 font-sans">
                    {area.title}
                  </h3>

                  {/* Points list */}
                  <ul className="space-y-2.5 mb-6">
                    {area.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#365CF5] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Technologies */}
                <div className="pt-4 border-t border-[#E7E5E0]">
                  <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider block mb-2 font-medium">
                    Relevant Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {area.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
