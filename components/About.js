"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Shield, Terminal, ArrowUpRight } from "lucide-react";
import { fadeInUp, defaultViewport } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
            <span>ABOUT // 01</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            {personalInfo.aboutHeading}
          </h2>
        </motion.div>

        {/* Narrative Biography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-5 text-base sm:text-lg text-[#444444] leading-relaxed font-sans"
        >
          {personalInfo.aboutBio.map((paragraph, idx) => (
            <p key={idx} className="last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
