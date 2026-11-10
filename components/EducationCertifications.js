"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from "lucide-react";
import { education, certifications } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function EducationCertifications() {
  return (
    <section id="credentials" className="py-16 md:py-24 relative border-t border-white/10">
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
              <span>CREDENTIALS // 08 // ACADEMICS &amp; CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education &amp; Certifications
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm">
            Formal engineering degree and verified technical skill assessments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Degree Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
                  EDUCATION
                </span>
                <h3 className="text-lg font-bold text-white font-mono">
                  {education.degree}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <p className="text-sm font-semibold text-zinc-200">
                {education.institution}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {education.location}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Calendar className="w-3 h-3" />
                  {education.period}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            {...cardHoverProps}
            className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md transition-colors glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
                  CERTIFICATIONS
                </span>
                <h3 className="text-lg font-bold text-white font-mono">
                  Skill Assessments
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-mono text-emerald-400 font-semibold mr-2">
                      {cert.title}
                    </span>
                    <span className="text-zinc-200">
                      {cert.name}
                    </span>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-emerald-400 transition-colors shrink-0 p-1 rounded focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    title="View Credential"
                    aria-label={`View ${cert.title} credential`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
