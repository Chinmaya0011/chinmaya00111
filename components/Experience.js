"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#03070A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>EXPERIENCE // 07 // WORK HISTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Full-stack engineering, API development, and software integration across remote teams and client work.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#03070A] border-2 border-emerald-400 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-6 backdrop-blur-xl transition-all duration-300 glow-card">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-2 font-mono">
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-[#0A121A] px-3 py-1 rounded-lg border border-white/[0.08] self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullets (Max 2-3 concise bullets) */}
                <div className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
