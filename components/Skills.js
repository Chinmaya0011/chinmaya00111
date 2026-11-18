"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Code2, Server, CheckCircle2, Layers, Terminal } from "lucide-react";
import { expertiseAreas } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("all");

  const areaIcons = {
    appsec: ShieldCheck,
    fullstack: Code2,
    "ai-sec": Cpu,
    devops: Server
  };

  const filteredAreas = activeFilter === "all"
    ? expertiseAreas
    : expertiseAreas.filter((a) => a.id === activeFilter);

  return (
    <section id="expertise" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
      <div id="skills" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
              <span>EXPERTISE // 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight font-sans">
              Technical Expertise
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans mt-3">
              Four structured engineering domains bridging modern full-stack development, application security, and AI defenses.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeFilter === "all"
                  ? "bg-[#171717] text-white font-semibold shadow-xs"
                  : "text-[#666666] hover:text-[#171717]"
              }`}
            >
              All Domains
            </button>
            {expertiseAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveFilter(area.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeFilter === area.id
                    ? "bg-[#3B5BFF] text-white font-semibold shadow-xs"
                    : "text-[#666666] hover:text-[#171717]"
                }`}
              >
                {area.title.split(" ")[0]}
              </button>
            ))}
          </motion.div>
        </div>

        {/* 4 Focused Expertise Clusters Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAreas.map((area, idx) => {
              const Icon = areaIcons[area.id] || ShieldCheck;
              return (
                <motion.div
                  layout
                  key={area.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  {...cardHoverProps}
                  className="rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-7 sm:p-8 shadow-xs flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Card Header: Icon & Domain Index */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E5E0]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] border border-[#3B5BFF]/20 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#3B5BFF] uppercase tracking-wider block">
                            DOMAIN // {area.areaNumber}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#171717] tracking-tight font-sans">
                            {area.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-6">
                      {area.description}
                    </p>

                    {/* Verifiable Capabilities Checklist */}
                    <ul className="space-y-3 mb-6">
                      {area.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333333] font-sans leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#3B5BFF] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Relevant Technologies Pills */}
                  <div className="pt-4 border-t border-[#E7E5E0]">
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider block mb-2.5 font-medium">
                      Core Tooling &amp; Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717] hover:border-[#3B5BFF]/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
