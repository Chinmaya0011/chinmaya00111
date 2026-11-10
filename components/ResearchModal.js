"use client";

import { X, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ResearchModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#0E0E11] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
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

        {/* Category Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 font-mono leading-snug">
          {article.title}
        </h3>

        {/* Takeaway Card */}
        <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 mb-5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Core Takeaway
          </span>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans font-medium">
            {article.takeaway}
          </p>
        </div>

        {/* Root Cause Analysis */}
        <div className="mb-4">
          <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold mb-2">
            Vulnerability Root Cause
          </h4>
          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 font-sans">
            {article.summary}
          </div>
        </div>

        {/* Mitigation & Fix */}
        {article.fix && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Remediation</span>
            </h4>
            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-emerald-500/15 font-sans">
              {article.fix}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Security Research</span>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
