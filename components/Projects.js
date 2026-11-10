"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Maximize2,
  TrendingUp
} from "lucide-react";
import { projects } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>PROJECTS // 05 // PRODUCTION &amp; TOOLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Production web applications and security tools engineered with modern full-stack architectures.
          </p>
        </motion.div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={{ delay: idx * 0.08 }}
              {...cardHoverProps}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors flex flex-col justify-between glass-card group"
            >
              <div>
                {/* Header: index & details button */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                    <FolderGit2 className="w-4 h-4" />
                    <span>0{idx + 1}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveProject(proj)}
                    className="text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1 px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    aria-label={`View details for ${proj.title}`}
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Details</span>
                  </motion.button>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-mono tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>

                {/* Structured Sections: Problem & Built */}
                <div className="space-y-3 mb-5 text-xs sm:text-sm font-sans">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                      Problem
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      {proj.problem}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                      Built
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      {proj.built}
                    </p>
                  </div>
                </div>

                {/* Tag Row (Stack) */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-medium">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact (Placeholder Metric) */}
                <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Impact &amp; Metric</span>
                  </span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {proj.impact}
                  </p>
                </div>
              </div>

              {/* Action Buttons: GitHub + Live Demo */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <motion.a
                  {...buttonMotionProps}
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-emerald-500/40"
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  {...buttonMotionProps}
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
                  aria-label={`Open live demo of ${proj.title}`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
