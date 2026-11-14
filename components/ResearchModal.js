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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-[#E7E5E0] rounded-2xl shadow-xl p-6 md:p-8"
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

        {/* Category Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#365CF5] mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span className="bg-[#365CF5]/10 px-2.5 py-0.5 rounded border border-[#365CF5]/20 font-semibold">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight mb-4 font-sans leading-snug">
          {article.title}
        </h3>

        {/* Takeaway Card */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] mb-5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#365CF5] font-bold block mb-1">
            Core Takeaway
          </span>
          <p className="text-xs sm:text-sm text-[#171717] leading-relaxed font-sans font-medium">
            {article.takeaway}
          </p>
        </div>

        {/* Root Cause Analysis */}
        <div className="mb-5">
          <h4 className="text-xs font-mono uppercase text-[#666666] font-semibold mb-2">
            Vulnerability Root Cause
          </h4>
          <div className="text-xs sm:text-sm text-[#171717] leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E0] font-sans">
            {article.summary}
          </div>
        </div>

        {/* Interactive Code Comparison Lab */}
        {(article.vulnerableSnippet || article.secureSnippet) && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#666666] font-semibold">
                Interactive Code Lab
              </span>
              
              <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F6] border border-[#E7E5E0] rounded-lg">
                <button
                  onClick={() => setActiveCodeTab("vulnerable")}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors flex items-center gap-1 ${
                    activeCodeTab === "vulnerable"
                      ? "bg-[#E02E2E]/10 text-[#E02E2E] border border-[#E02E2E]/30 font-bold"
                      : "text-[#666666] hover:text-[#171717]"
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-[#E02E2E]" />
                  <span>Vulnerable Pattern</span>
                </button>

                <button
                  onClick={() => setActiveCodeTab("secure")}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors flex items-center gap-1 ${
                    activeCodeTab === "secure"
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-bold"
                      : "text-[#666666] hover:text-[#171717]"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Hardened Production Fix</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-xl bg-[#171717] border border-[#E7E5E0] p-4 font-mono text-xs overflow-x-auto text-white shadow-inner">
              <button
                onClick={handleCopyCode}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Copy code snippet"
                aria-label="Copy code snippet"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className={`whitespace-pre-wrap leading-relaxed ${
                activeCodeTab === "vulnerable" ? "text-rose-300" : "text-emerald-300"
              }`}>
                {currentSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Mitigation & Fix */}
        {article.fix && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-[#365CF5] font-semibold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Remediation Strategy</span>
            </h4>
            <div className="text-xs sm:text-sm text-[#171717] leading-relaxed bg-[#365CF5]/5 p-4 rounded-xl border border-[#365CF5]/20 font-sans">
              {article.fix}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between text-xs font-mono text-[#666666]">
          <span>Security Research Breakdown</span>
          <button
            onClick={onClose}
            className="text-[#365CF5] hover:underline font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
