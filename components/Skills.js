"use client";

import { motion } from "framer-motion";
import { 
  Layout, 
  Server, 
  Database, 
  ShieldCheck, 
  Wrench, 
  Cpu 
} from "lucide-react";
import { technicalSkills } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Skills() {
  const categoryIcons = {
    Frontend: Layout,
    Backend: Server,
    Database: Database,
    Security: ShieldCheck,
    Tools: Wrench,
    AI: Cpu
  };

  return (
    <section id="expertise" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 text-center sm:text-left"
        >
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2 justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            Skills &amp; Technologies
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Core full-stack engineering stack, security tooling, and AI integration technologies.
          </p>
        </motion.div>

        {/* 6 Category Grid (2x3 or 3x2) with Tech Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalSkills.map((group, idx) => {
            const Icon = categoryIcons[group.category] || Wrench;
            return (
              <motion.div
                key={group.category}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.05 }}
                {...cardHoverProps}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md glass-card flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white font-mono">
                        {group.category}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                      {group.tag}
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
