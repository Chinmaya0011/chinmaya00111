"use client";

import { X, FileDown, ShieldCheck, ArrowDownToLine, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { buttonMotionProps } from "@/lib/motion";

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resume = {
    title: "Full-Stack Developer (MERN & AppSec)",
    focus: "MERN Stack (React, Next.js, Node.js, Express, MongoDB) & Application Security fundamentals",
    file: "/resumes/Chinmaya_AppSec_Resume.pdf",
    badge: "Official CV",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: ShieldCheck
  };

  const Icon = resume.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0E0E11] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
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
          <FileDown className="w-4 h-4" />
          <span>CURRICULUM VITAE // DIRECT DOWNLOAD</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 font-mono">
          Download Resume (CV.pdf)
        </h3>
        
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans">
          Full-Stack Developer (MERN & AppSec) curriculum vitae in standard PDF format.
        </p>

        {/* Single Resume Card */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-colors mb-6">
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-base font-bold text-white font-mono">
                  {resume.title}
                </h4>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${resume.badgeColor}`}>
                  {resume.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {resume.focus}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <motion.a
              {...buttonMotionProps}
              href={resume.file}
              download="Chinmaya_MERN_AppSec_Resume.pdf"
              className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0A0A0B] text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Download PDF</span>
            </motion.a>

            <motion.a
              {...buttonMotionProps}
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Preview</span>
            </motion.a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>FORMAT: PDF</span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
