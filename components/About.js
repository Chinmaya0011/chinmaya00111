"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Code2, ShieldCheck, Cpu } from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function About() {
  const pillarIcons = [Code2, ShieldCheck, Cpu];

  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
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
            <span>ABOUT ME // 01</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            {personalInfo.aboutHeading}
          </h2>
        </motion.div>

        {/* Narrative Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-8 space-y-4 text-base sm:text-lg text-[#666666] leading-relaxed font-sans"
          >
            {personalInfo.aboutBio.map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm space-y-4"
          >
            <div className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider pb-2 border-b border-[#E7E5E0]">
              Quick Facts
            </div>

            <div className="space-y-3 text-xs font-mono text-[#666666]">
              <div>
                <span className="text-[#171717] font-semibold block">IDENTITY</span>
                <span>Chinmaya Kumar Mishra (Chinmaya / Chinmay)</span>
              </div>

              <div>
                <span className="text-[#171717] font-semibold block">PRIMARY DOMAIN</span>
                <span>Full-Stack Development &amp; AppSec</span>
              </div>

              <div>
                <span className="text-[#171717] font-semibold block">LOCATION</span>
                <span>Odisha, India (Remote / Worldwide)</span>
              </div>

              <div>
                <span className="text-[#171717] font-semibold block">CURRENT WORK</span>
                <span>Full-Stack Developer @ Secure Code LLC</span>
              </div>

              <div>
                <span className="text-[#171717] font-semibold block">CORE TECHNOLOGIES</span>
                <span>React, Next.js, Node.js, Express, MongoDB, Semgrep</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personalInfo.aboutPillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx] || Code2;
            return (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#E7E5E0] flex items-center justify-center text-[#365CF5] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#171717] font-sans mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
