"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Building2, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>CAREER // 04</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight font-sans">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-sans mt-3">
            Engineering application security tooling, AI product features, and production web applications.
          </p>
        </motion.div>

        {/* Illuminated Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E7E5E0] space-y-10 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline Illuminated Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-colors ${
                  exp.isCurrent
                    ? "border-[#3B5BFF] shadow-[0_0_12px_rgba(59,91,255,0.4)]"
                    : "border-[#D5D3CC]"
                }`}
              >
                {exp.isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF] animate-ping" />
                )}
              </div>

              {/* Experience Card */}
              <motion.div
                {...cardHoverProps}
                className={`rounded-3xl border p-6 sm:p-8 shadow-xs transition-all ${
                  exp.isCurrent
                    ? "bg-white border-[#3B5BFF]/35 hover:border-[#3B5BFF]"
                    : "bg-white border-[#E7E5E0] hover:border-[#D5D3CC]"
                }`}
              >
                {/* Header: Company, Role, Date, Location */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E7E5E0]">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                        {exp.company}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#171717] text-white flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>CURRENT</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-[#3B5BFF] mt-1 font-mono flex items-center gap-2 flex-wrap">
                      <span>{exp.role}</span>
                      <span className="text-[#D5D3CC]">•</span>
                      <span className="text-[#666666] font-normal flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#171717] bg-[#FAF9F6] px-3.5 py-1.5 rounded-xl border border-[#E7E5E0] self-start sm:self-auto shrink-0 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#3B5BFF]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#444444] font-sans leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Tech Tags */}
                {exp.tags && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-2">
                      Core Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
