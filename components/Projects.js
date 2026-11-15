"use client";

import { motion } from "framer-motion";
import { 
  FolderGit2, 
  ExternalLink
} from "lucide-react";
import { projects } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
              <span>SELECTED WORK // 04</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
              Selected Engineering Work
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm">
            Application security tooling, AI repository integrations, and production full-stack systems.
          </p>
        </motion.div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={{ delay: idx * 0.08 }}
              {...cardHoverProps}
              className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 p-6 sm:p-7 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Project Number */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold">
                    <FolderGit2 className="w-4 h-4" />
                    <span>{proj.number}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#171717] font-sans tracking-tight mb-3">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Live Demo */}
              {proj.liveUrl && (
                <div className="pt-4 border-t border-[#E7E5E0]">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white text-xs font-mono font-medium tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs group"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
