"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, 
  Server, 
  Database, 
  ShieldCheck, 
  Wrench, 
  Cpu,
  Layers
} from "lucide-react";
import { technicalSkills } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categoryIcons = {
    Frontend: Layout,
    Backend: Server,
    Database: Database,
    Security: ShieldCheck,
    Tools: Wrench,
    AI: Cpu
  };

  const filterOptions = ["All", "Frontend", "Backend", "Database", "Security", "Tools", "AI"];

  const filteredSkills = activeFilter === "All" 
    ? technicalSkills 
    : technicalSkills.filter((group) => group.category === activeFilter);

  return (
    <section id="expertise" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-8 text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
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
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 self-center md:self-end">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Domain Filter</span>
          </div>
        </motion.div>

        {/* Interactive Domain Filter Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all focus:outline-none focus:ring-1 focus:ring-emerald-400 ${
                  isActive
                    ? "text-[#0A0A0B] font-bold bg-emerald-500 shadow-lg shadow-emerald-500/20"
                    : "text-zinc-400 bg-white/[0.03] hover:text-white hover:bg-white/[0.06] border border-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Category Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((group, idx) => {
              const Icon = categoryIcons[group.category] || Wrench;
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
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

                    {group.description && (
                      <p className="text-xs text-zinc-400 font-sans mb-4 leading-relaxed">
                        {group.description}
                      </p>
                    )}

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 hover:text-white transition-colors text-xs font-mono text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
