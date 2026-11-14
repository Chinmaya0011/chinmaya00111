"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, 
  Server, 
  Database, 
  ShieldCheck, 
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
    "AI Security": Cpu
  };

  const filterOptions = ["All", "Frontend", "Backend", "Database", "Security", "AI Security"];

  const filteredSkills = activeFilter === "All" 
    ? technicalSkills 
    : technicalSkills.filter((group) => group.category === activeFilter);

  return (
    <section id="skills" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
              <span>TECHNICAL SKILLS // 02</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
              Engineering Stack &amp; Security Tooling
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1 max-w-xl">
              Technologies and security methodologies genuinely utilized in production development and vulnerability research.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#666666] bg-white border border-[#E7E5E0] px-3 py-1.5 rounded-lg shadow-sm self-start md:self-auto">
            <Layers className="w-3.5 h-3.5 text-[#365CF5]" />
            <span>Categorized Filter</span>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all focus:outline-none focus:ring-1 focus:ring-[#365CF5] ${
                  isActive
                    ? "text-white font-bold bg-[#171717] shadow-sm"
                    : "text-[#666666] bg-white hover:text-[#171717] hover:bg-[#F3F2EE] border border-[#E7E5E0] shadow-sm"
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
              const Icon = categoryIcons[group.category] || ShieldCheck;
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  {...cardHoverProps}
                  className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/40 p-6 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7E5E0]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F3F2EE] border border-[#E7E5E0] flex items-center justify-center text-[#365CF5]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-[#171717] font-sans">
                          {group.category}
                        </h3>
                      </div>

                      <span className="text-[10px] font-mono text-[#365CF5] bg-[#365CF5]/10 px-2 py-0.5 rounded border border-[#365CF5]/20 font-semibold">
                        {group.tag}
                      </span>
                    </div>

                    {group.description && (
                      <p className="text-xs text-[#666666] font-sans mb-4 leading-relaxed">
                        {group.description}
                      </p>
                    )}

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] hover:border-[#365CF5]/40 hover:text-[#171717] text-xs font-mono text-[#171717] transition-colors"
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
