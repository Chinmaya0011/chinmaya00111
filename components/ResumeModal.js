"use client";

import { X, FileDown, ShieldCheck, ArrowDownToLine, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { buttonMotionProps } from "@/lib/motion";

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resume = {
    title: "Full-Stack Developer (MERN & AppSec)",
    focus: "MERN Stack (React, Next.js, Node.js, Express, MongoDB) & Application Security (OWASP Top 10, API Security, SAST)",
    file: "/resumes/Chinmaya_AppSec_Resume.pdf",
    badge: "Official CV",
    badgeColor: "bg-[#365CF5]/10 text-[#365CF5] border-[#365CF5]/25",
    icon: ShieldCheck
  };

  const Icon = resume.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white border border-[#E7E5E0] rounded-2xl shadow-2xl p-6 md:p-8"
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
          <FileDown className="w-4 h-4" />
          <span>CURRICULUM VITAE // DIRECT DOWNLOAD</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-extrabold text-[#171717] tracking-tight mb-2 font-sans">
          Download Engineering CV
        </h3>
        
        <p className="text-xs text-[#666666] mb-6 leading-relaxed font-sans">
          Chinmaya Kumar Mishra — Full-Stack Developer &amp; Application Security Engineer curriculum vitae in standard PDF format.
        </p>

        {/* Single Resume Card */}
        <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] mb-6">
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5] shrink-0 mt-0.5">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-sm font-bold text-[#171717] font-mono">
                  {resume.title}
                </h4>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${resume.badgeColor}`}>
                  {resume.badge}
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed font-sans">
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
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#365CF5] hover:bg-[#2B4CD9] text-white text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Download PDF</span>
            </motion.a>

            <motion.a
              {...buttonMotionProps}
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-50 border border-[#E7E5E0] text-[#171717] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              <span>Preview</span>
            </motion.a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between text-xs text-[#666666] font-mono">
          <span>FORMAT: PDF (Verified)</span>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#171717] transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
