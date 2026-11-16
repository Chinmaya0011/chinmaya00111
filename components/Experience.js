"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
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
            <span>EXPERIENCE // 05</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            Professional Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
            Engineering application security tooling, AI product features, and production web applications.
          </p>
        </motion.div>

        {/* Minimal Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={{ delay: index * 0.08 }}
              {...cardHoverProps}
              className={`rounded-2xl border p-6 sm:p-7 shadow-xs transition-all ${
                exp.isCurrent
                  ? "bg-white border-[#365CF5]/40"
                  : "bg-white border-[#E7E5E0] hover:border-[#D5D3CC]"
              }`}
            >
              {/* Header: Company, Role, Date, Location */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E7E5E0]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight">
                      {exp.company}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#171717] text-white flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>PRESENT</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#365CF5] mt-1 font-mono flex items-center gap-2 flex-wrap">
                    <span>{exp.role}</span>
                    <span className="text-[#D5D3CC]">•</span>
                    <span className="text-[#666666] font-normal flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#666666]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717] bg-[#FAF9F6] px-3 py-1 rounded-lg border border-[#E7E5E0] self-start sm:self-auto shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#365CF5]" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#444444] font-sans leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Tags */}
              {exp.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
