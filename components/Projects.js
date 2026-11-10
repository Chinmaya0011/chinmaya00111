"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Maximize2,
  TrendingUp,
  AlertCircle,
  Hammer
} from "lucide-react";
import { projects } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#03070A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>PROJECTS // 05 // PRODUCTION &amp; TOOLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Production web applications and security tools engineered with modern full-stack architectures.
          </p>
        </div>

        {/* 3 Projects Grid with Problem, Built, Stack, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between glow-card group"
            >
              <div>
                {/* Header: index & details button */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                    <FolderGit2 className="w-4 h-4" />
                    <span>0{idx + 1}</span>
                  </div>
                  <button
                    onClick={() => setActiveProject(proj)}
                    className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-emerald-400 px-2 py-0.5 rounded"
                    aria-label={`View details for ${proj.title}`}
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-mono tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>

                {/* Structured Sections: Problem & Built */}
                <div className="space-y-3 mb-5 text-xs sm:text-sm font-sans">
                  <div className="p-3 rounded-xl bg-[#03060A] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                      Problem
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {proj.problem}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#03060A] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                      Built
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {proj.built}
                    </p>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5 font-medium">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[#0A121A] border border-white/[0.06] text-[11px] font-mono text-slate-200"
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
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {proj.impact}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors focus:outline-none focus:underline"
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none focus:underline font-semibold"
                  aria-label={`Open live demo of ${proj.title}`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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
