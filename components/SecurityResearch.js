"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { securityResearch } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";
import ResearchModal from "./ResearchModal";

export default function SecurityResearch() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="research" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SECURITY RESEARCH // 06 // VULNERABILITY ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Security Research
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Technical breakdowns of application vulnerabilities, attack mechanics, and production mitigations.
          </p>
        </motion.div>

        {/* 2x2 Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityResearch.map((item, idx) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={{ delay: idx * 0.08 }}
              {...cardHoverProps}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors flex flex-col justify-between glass-card group"
            >
              <div>
                {/* Category tag & interactive badge */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 hidden sm:inline">
                      Code Diff
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono mb-3 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                {/* One-Line Takeaway */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-emerald-500/20 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    Key Takeaway
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                    {item.takeaway}
                  </p>
                </div>

                {/* Short overview */}
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-5 line-clamp-2">
                  {item.summary}
                </p>
              </div>

              {/* Read Full Research button */}
              <div className="pt-3 border-t border-white/10">
                <motion.button
                  {...buttonMotionProps}
                  onClick={() => setActiveArticle(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 text-zinc-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2"
                  aria-label={`Read research on ${item.title}`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
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
