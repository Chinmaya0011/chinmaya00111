"use client";

import { X, FileDown, ShieldCheck, Cpu, Code2, ArrowDownToLine } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resumeVersions = [
    {
      title: "Full-Stack Developer (MERN & AppSec)",
      focus: "MERN Stack (React, Next.js, Node.js, Express, MongoDB) & Application Security fundamentals",
      file: "/resumes/Chinmaya_AppSec_Resume.pdf",
      badge: "Recommended",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: ShieldCheck
    },
    {
      title: "Full-Stack Web Developer",
      focus: "React, Next.js, Node.js, Express, MongoDB, RESTful APIs, and responsive web applications",
      file: "/resumes/Chinmaya_AI_FullStack_Resume.pdf",
      badge: "Full-Stack Core",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      icon: Code2
    },
    {
      title: "AI & Full-Stack Development",
      focus: "Full-stack development with LLM integration, OpenAI/Gemini APIs, and RAG concepts",
      file: "/resumes/Chinmaya_AI_AppSec_Resume.pdf",
      badge: "AI Integration",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: Cpu
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0E151E] border border-[#203040] rounded-2xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#141F2B] text-slate-400 hover:text-white border border-[#223344] transition-colors"
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
        
        <p className="text-xs text-slate-400 mb-6 leading-relaxed font-sans">
          Select the resume version tailored to the role you are hiring for. All files are in standard PDF format.
        </p>

        {/* Versions List */}
        <div className="space-y-3.5 mb-6">
          {resumeVersions.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090D12] border border-[#16222E] hover:border-emerald-500/30 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#111A24] border border-[#1E2E3E] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-bold text-white font-mono">
                        {res.title}
                      </h4>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono border ${res.badgeColor}`}>
                        {res.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {res.focus}
                    </p>
                  </div>
                </div>

                <a
                  href={res.file}
                  download
                  className="px-3.5 py-2 rounded-lg bg-[#121B24] hover:bg-emerald-500 text-slate-200 hover:text-[#090D11] border border-[#203040] hover:border-emerald-400 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 shrink-0 self-start sm:self-center"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#1C2A38] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>FORMAT: PDF</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
