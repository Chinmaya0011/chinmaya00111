"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>EXPERIENCE // 07 // WORK HISTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Full-stack engineering, API development, and software integration across remote teams and client work.
          </p>
        </motion.div>

        {/* Vertical Timeline with Line Draw Animation */}
        <div className="relative pl-6 sm:pl-8 max-w-4xl mx-auto">
          
          {/* Animated Background Timeline Line */}
          <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[2px] bg-white/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-400 via-emerald-500/50 to-transparent origin-top"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline Dot Indicator */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="absolute -left-[30px] sm:-left-[38px] top-4 w-3.5 h-3.5 rounded-full bg-[#0A0A0B] border-2 border-emerald-400 flex items-center justify-center z-10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  {...cardHoverProps}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors glass-card"
                >
                  {/* Header Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-mono">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-2 font-mono">
                        <span>{exp.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 font-normal flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="space-y-2.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
