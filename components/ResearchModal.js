"use client";

import { X, BookOpen, Shield } from "lucide-react";

export default function ResearchModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#080E16] border border-white/[0.1] rounded-2xl shadow-2xl p-6 md:p-8"
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

        {/* Category Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 font-mono leading-snug">
          {article.title}
        </h3>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-[#04080E] border border-white/[0.06] mb-5">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-sans">
            &ldquo;{article.summary}&rdquo;
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2.5">
            Key Insights &amp; Concepts
          </h4>
          <div className="text-sm text-slate-300 leading-relaxed bg-[#050A10] p-4 rounded-xl border border-white/[0.05] font-sans">
            {article.content}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Chinmaya Kumar Mishra</span>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:underline"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
