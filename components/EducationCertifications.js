"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";
import { education, certifications } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function EducationCertifications() {
  return (
    <section id="credentials" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
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
            <span>CREDENTIALS // 07 // ACADEMICS &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-sans">
            Education &amp; Verified Certifications
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans mt-1">
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
            className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/40 p-6 sm:p-7 shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#E7E5E0] flex items-center justify-center text-[#365CF5]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#365CF5] font-bold block">
                  FORMAL ACADEMICS
                </span>
                <h3 className="text-lg font-bold text-[#171717] font-sans">
                  {education.degree}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] space-y-2.5">
              <p className="text-sm font-semibold text-[#171717] font-sans">
                {education.institution}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666666]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#365CF5]" />
                  {education.location}
                </span>
                <span className="flex items-center gap-1 text-[#171717] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#365CF5]" />
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
            className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/40 p-6 sm:p-7 shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F3F2EE] border border-[#E7E5E0] flex items-center justify-center text-[#365CF5]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#365CF5] font-bold block">
                  VERIFIED ASSESSMENTS
                </span>
                <h3 className="text-lg font-bold text-[#171717] font-sans">
                  Technical Certifications
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-between gap-3 hover:border-[#D5D3CC] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-[#365CF5] uppercase font-bold">
                        {cert.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#171717] font-sans">
                      {cert.name}
                    </p>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white border border-[#E7E5E0] text-[#666666] hover:text-[#365CF5] hover:border-[#365CF5]/40 transition-colors shrink-0"
                      title="View verified credential"
                      aria-label={`View verified credential for ${cert.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
