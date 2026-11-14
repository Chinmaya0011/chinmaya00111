"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Key, 
  Lock, 
  FileCode2, 
  ShieldCheck, 
  Cpu,
  CheckCircle2
} from "lucide-react";
import { appSecCapabilities } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function SecurityInterests() {
  const iconMap = {
    Globe: Globe,
    Key: Key,
    Lock: Lock,
    FileCode2: FileCode2,
    ShieldCheck: ShieldCheck,
    Cpu: Cpu
  };

  return (
    <section id="appsec" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
            <span>APPLICATION SECURITY // 03</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            Defensive Security Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
            Practical application security engineered into software architecture, API design, code pipelines, and AI systems.
          </p>
        </motion.div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appSecCapabilities.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.06 }}
                {...cardHoverProps}
                className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 p-6 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#E7E5E0] flex items-center justify-center text-[#365CF5]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#8E8C85]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#171717] font-sans tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E5E0] bg-[#FAF9F6] -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#365CF5] mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ENGINEERING PRACTICE</span>
                  </div>
                  <p className="text-[11px] text-[#171717] font-sans leading-relaxed">
                    {item.practice}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
