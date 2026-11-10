"use client";

import { motion } from "framer-motion";
import { X, Github, ExternalLink, Code2, TrendingUp } from "lucide-react";
import { buttonMotionProps } from "@/lib/motion";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0E0E11] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
          <Code2 className="w-4 h-4" />
          <span>PROJECT SPECIFICATION</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white tracking-tight mb-5 font-mono">
          {project.title}
        </h3>

        {/* Problem */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
            Problem Statement
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {project.problem}
          </p>
        </div>

        {/* Built */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Built Architecture
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {project.built}
          </p>
        </div>

        {/* Impact */}
        <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 mb-5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Impact &amp; Results</span>
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {project.impact}
          </p>
        </div>

        {/* Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a
              {...buttonMotionProps}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-200 transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              {...buttonMotionProps}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Application</span>
            </motion.a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
