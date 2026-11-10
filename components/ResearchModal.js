"use client";

import { useState } from "react";
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";

export default function ResearchModal({ article, onClose }) {
  const [activeCodeTab, setActiveCodeTab] = useState("vulnerable");
  const [copiedCode, setCopiedCode] = useState(false);

  if (!article) return null;

  const currentSnippet = activeCodeTab === "vulnerable" 
    ? article.vulnerableSnippet 
    : article.secureSnippet;

  const handleCopyCode = () => {
    if (!currentSnippet) return;
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0E0E11] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
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

        {/* Interactive Code Comparison Lab */}
        {(article.vulnerableSnippet || article.secureSnippet) && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Interactive Code Lab
              </span>
              
              <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-lg">
                <button
                  onClick={() => setActiveCodeTab("vulnerable")}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors flex items-center gap-1 ${
                    activeCodeTab === "vulnerable"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>Vulnerable Code</span>
                </button>

                <button
                  onClick={() => setActiveCodeTab("secure")}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors flex items-center gap-1 ${
                    activeCodeTab === "secure"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Hardened Patch</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-xl bg-[#070709] border border-white/10 p-4 font-mono text-xs overflow-x-auto">
              <button
                onClick={handleCopyCode}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                title="Copy code snippet"
                aria-label="Copy code snippet"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className={`whitespace-pre-wrap leading-relaxed ${
                activeCodeTab === "vulnerable" ? "text-rose-200/90" : "text-emerald-200/90"
              }`}>
                {currentSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Mitigation & Fix */}
        {article.fix && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Remediation Strategy</span>
            </h4>
            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-emerald-500/15 font-sans">
              {article.fix}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Security Research Breakdown</span>
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
