"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight, BookOpen } from "lucide-react";
import { securityResearch } from "@/data/portfolioData";
import ResearchModal from "./ResearchModal";

export default function SecurityResearch() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="research" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#04080D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>SECURITY RESEARCH // 06 // VULNERABILITY ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Security Research
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Technical breakdowns of application vulnerabilities, attack mechanics, and production mitigations.
          </p>
        </div>

        {/* 4 Research Cards with One-Line Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityResearch.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-2xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between glow-card group"
            >
              <div>
                {/* Category tag */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono mb-3 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                {/* One-Line Takeaway */}
                <div className="p-3.5 rounded-xl bg-[#03060A] border border-emerald-500/15 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    Key Takeaway
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {item.takeaway}
                  </p>
                </div>

                {/* Short overview */}
                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-5 line-clamp-2">
                  {item.summary}
                </p>
              </div>

              {/* Read Full Research button */}
              <div className="pt-3 border-t border-white/[0.05]">
                <button
                  onClick={() => setActiveArticle(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0A121A] hover:bg-emerald-500/15 text-slate-300 hover:text-emerald-400 border border-white/[0.06] hover:border-emerald-500/30 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  aria-label={`Read research on ${item.title}`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Research Modal */}
      <ResearchModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
}
