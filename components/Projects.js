"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Maximize2,
  ShieldCheck,
  AlertCircle,
  Wrench
} from "lucide-react";
import { projects } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

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
              <span>FEATURED PROJECTS // 04</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
              Production Systems &amp; Developer Tools
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm">
            Full-stack web applications and security platforms engineered with security-first architectures.
          </p>
        </motion.div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={{ delay: idx * 0.08 }}
              {...cardHoverProps}
              className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Index & Details Button */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold">
                    <FolderGit2 className="w-4 h-4" />
                    <span>PROJECT 0{idx + 1}</span>
                  </div>

                  <button
                    onClick={() => setActiveProject(proj)}
                    className="text-xs font-mono text-[#666666] hover:text-[#365CF5] transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-[#F3F2EE] hover:bg-[#E7E5E0] focus:outline-none"
                    aria-label={`View full specification for ${proj.title}`}
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Specification</span>
                  </button>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-[#171717] font-sans tracking-tight mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-[#365CF5] font-medium mb-4">
                  {proj.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-5">
                  {proj.description}
                </p>

                {/* Structured Sections: Problem & Implementation */}
                <div className="space-y-3 mb-5 text-xs font-sans">
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-bold flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-3 h-3 text-[#E02E2E]" />
                      <span>The Problem</span>
                    </span>
                    <p className="text-[#666666] leading-relaxed">
                      {proj.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-bold flex items-center gap-1.5 mb-1">
                      <Wrench className="w-3 h-3 text-[#365CF5]" />
                      <span>Technical Implementation</span>
                    </span>
                    <p className="text-[#666666] leading-relaxed">
                      {proj.implementation}
                    </p>
                  </div>

                  {proj.securityConsiderations && (
                    <div className="p-3.5 rounded-xl bg-[#365CF5]/5 border border-[#365CF5]/20">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#365CF5] font-bold flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#365CF5]" />
                        <span>Security Considerations</span>
                      </span>
                      <p className="text-[#171717] leading-relaxed text-[11px]">
                        {proj.securityConsiderations}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((t) => (
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

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="pt-4 border-t border-[#E7E5E0] flex items-center gap-2.5">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#171717] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Github className="w-3.5 h-3.5 text-[#666666]" />
                  <span>Source Code</span>
                </a>

                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#171717] hover:bg-[#365CF5] text-white text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Specification Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
