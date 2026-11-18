"use client";

import { useState } from "react";
import { 
  X, 
  FileDown, 
  ShieldCheck, 
  ArrowDownToLine, 
  ExternalLink, 
  Layers,
  Sparkles,
  CheckCircle2,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeModal({ isOpen, onClose }) {
  const [selectedVariant, setSelectedVariant] = useState("appsec");

  if (!isOpen) return null;

  const variants = [
    {
      id: "appsec",
      label: "AppSec Focus",
      title: "Application Security & Pentesting",
      desc: "AST/SAST rule creation with Semgrep, OWASP Top 10, Burp Suite, API authorization & vulnerability analysis.",
      filename: "Chinmaya_AppSec_Resume.pdf",
      highlight: "RECOMMENDED FOR SECURITY ROLES"
    },
    {
      id: "ai-appsec",
      label: "AI & AppSec",
      title: "AI Security & Tooling",
      desc: "LLM-driven vulnerability triage, RAG guardrails, prompt hardening & automated security developer workflows.",
      filename: "Chinmaya_AI_AppSec_Resume.pdf",
      highlight: "RECOMMENDED FOR AI & PRODUCT SECURITY"
    },
    {
      id: "fullstack",
      label: "Full-Stack Dev",
      title: "Full-Stack Engineering",
      desc: "Next.js 15 App Router, React 19, Node.js, Express.js, MongoDB, RESTful APIs & containerized Docker deploys.",
      filename: "Chinmaya_AI_FullStack_Resume.pdf",
      highlight: "RECOMMENDED FOR FULL-STACK ROLES"
    }
  ];

  const activeVariant = variants.find((v) => v.id === selectedVariant) || variants[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white border border-[#E7E5E0] rounded-3xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#FAF9F6] text-[#666666] hover:text-[#171717] border border-[#E7E5E0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold mb-2">
          <FileDown className="w-4 h-4" />
          <span>CURRICULUM VITAE // DIRECT ACCESS</span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-[#171717] tracking-tight mb-2 font-sans">
          Download or Preview Resume
        </h3>

        <p className="text-xs text-[#666666] mb-6 leading-relaxed font-sans">
          Select your desired specialized CV profile to preview directly in your browser or download the PDF document.
        </p>

        {/* Profile Selector Pills */}
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold block mb-2">
            Select Curriculum Vitae Profile
          </span>
          <div className="grid grid-cols-3 gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v.id)}
                className={`py-2.5 px-2 rounded-xl border text-xs font-mono font-medium transition-all text-center ${
                  selectedVariant === v.id
                    ? "bg-[#3B5BFF]/10 border-[#3B5BFF] text-[#3B5BFF] font-bold shadow-xs"
                    : "bg-[#FAF9F6] border-[#E7E5E0] text-[#666666] hover:bg-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Profile Information Box */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] mb-6 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-sans font-bold text-[#171717]">
              {activeVariant.title}
            </span>
            <span className="text-[9px] font-mono font-bold text-[#3B5BFF] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#E7E5E0]">
              {activeVariant.highlight}
            </span>
          </div>
          <p className="text-xs text-[#666666] font-sans leading-relaxed">
            {activeVariant.desc}
          </p>
          <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-[#888888] border-t border-[#E7E5E0]">
            <span className="flex items-center gap-1 text-[#171717]">
              <FileText className="w-3.5 h-3.5 text-[#3B5BFF]" />
              <span>{activeVariant.filename}</span>
            </span>
            <span>•</span>
            <span>ATS-Friendly PDF</span>
          </div>
        </div>

        {/* Action Buttons: Preview & Download */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          {/* Direct Preview Button */}
          <a
            href={`/api/resume/preview?variant=${selectedVariant}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#E7E5E0] text-[#171717] text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs group"
          >
            <ExternalLink className="w-4 h-4 text-[#3B5BFF] transition-transform group-hover:scale-110" />
            <span>Preview in Browser</span>
          </a>

          {/* Direct Download Button */}
          <a
            href={`/api/resume/download?variant=${selectedVariant}`}
            className="flex-1 py-3 px-4 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs group"
          >
            <ArrowDownToLine className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            <span>Download PDF</span>
          </a>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between text-xs text-[#888888] font-mono">
          <span>Direct PDF Delivery</span>
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
