"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ShieldAlert, Code2 } from "lucide-react";
import { securityResearch } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";
import ResearchModal from "./ResearchModal";

export default function SecurityResearch() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="research" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
              <span>SECURITY RESEARCH // 05 // TECHNICAL WRITING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
              Vulnerability Analysis &amp; Technical Notes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] font-sans max-w-sm">
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
              className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category tag & interactive badge */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#365CF5] bg-[#365CF5]/10 px-2.5 py-0.5 rounded border border-[#365CF5]/20 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#171717] bg-[#F3F2EE] px-2 py-0.5 rounded border border-[#E7E5E0] hidden sm:inline">
                      Code Diff Lab
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#8E8C85]">
                    NOTE 0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#171717] font-sans tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* One-Line Takeaway */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#365CF5] font-bold block mb-1">
                    Key Takeaway
                  </span>
                  <p className="text-xs sm:text-sm text-[#171717] font-sans leading-relaxed">
                    {item.takeaway}
                  </p>
                </div>

                {/* Short overview */}
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans mb-5 line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Read Full Research button */}
              <div className="pt-4 border-t border-[#E7E5E0]">
                <button
                  onClick={() => setActiveArticle(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#171717] text-[#171717] hover:text-white border border-[#E7E5E0] text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm"
                  aria-label={`Read research on ${item.title}`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Breakdown &amp; Code Diff</span>
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
