"use client";

import { motion } from "framer-motion";
import { X, Github, ExternalLink, Code2, ShieldCheck, AlertCircle, Wrench } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-[#E7E5E0] rounded-2xl shadow-xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#FAF9F6] text-[#666666] hover:text-[#171717] border border-[#E7E5E0] transition-colors focus:outline-none focus:ring-1 focus:ring-[#365CF5]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold mb-2">
          <Code2 className="w-4 h-4" />
          <span>PROJECT SPECIFICATION</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-[#171717] tracking-tight mb-1 font-sans">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="text-xs font-mono text-[#365CF5] font-medium mb-5">
            {project.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Problem */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-bold flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#E02E2E]" />
            <span>Problem Statement</span>
          </span>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans">
            {project.problem}
          </p>
        </div>

        {/* Technical Implementation */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717] font-bold flex items-center gap-1.5 mb-1">
            <Wrench className="w-3.5 h-3.5 text-[#365CF5]" />
            <span>Technical Implementation</span>
          </span>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans">
            {project.implementation}
          </p>
        </div>

        {/* Security Considerations */}
        {project.securityConsiderations && (
          <div className="p-4 rounded-xl bg-[#365CF5]/5 border border-[#365CF5]/20 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#365CF5] font-bold flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#365CF5]" />
              <span>Security &amp; Architecture Considerations</span>
            </span>
            <p className="text-xs text-[#171717] font-sans leading-relaxed">
              {project.securityConsiderations}
            </p>
          </div>
        )}

        {/* Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-[#666666] mb-2 font-semibold">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E7E5E0] text-xs font-mono text-[#171717] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-[#666666]" />
              <span>GitHub</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#171717] hover:bg-[#365CF5] text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#666666] hover:text-[#171717] transition-colors font-mono"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
