"use client";

import { X, Github, ExternalLink, Code2 } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#080E16] border border-white/[0.1] rounded-2xl shadow-2xl p-6 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0C1520] text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
          <Code2 className="w-4 h-4" />
          <span>PROJECT OVERVIEW</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white tracking-tight mb-4 font-mono">
          {project.title}
        </h3>

        {/* Description */}
        <div className="p-4 rounded-xl bg-[#04080E] border border-white/[0.06] mb-6">
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded bg-[#0D1824] border border-white/[0.06] text-[11px] font-mono text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#0D1824] hover:bg-[#132233] border border-white/[0.08] text-xs font-mono text-slate-200 transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-xs font-mono text-emerald-400 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Application</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
