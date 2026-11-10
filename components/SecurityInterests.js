"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Key, 
  FileCode2, 
  Cpu, 
  ShieldCheck 
} from "lucide-react";
import { securityInterests } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function SecurityInterests() {
  const iconMap = {
    "web-sec": Globe,
    "api-sec": Key,
    "secure-code": FileCode2,
    "ai-appsec": Cpu
  };

  return (
    <section id="interests" className="py-16 md:py-24 relative border-t border-white/10">
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
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>SECURITY // 04 // DEFENSIVE SPECIALIZATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Security Focus Areas
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Core security disciplines integrated directly into full-stack development and tooling.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {securityInterests.map((item, idx) => {
            const Icon = iconMap[item.id] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.06 }}
                {...cardHoverProps}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors flex flex-col justify-between glass-card group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-mono tracking-tight mb-2.5 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>0{idx + 1}</span>
                  <span className="text-emerald-400 font-medium">SPECIALIZATION</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
