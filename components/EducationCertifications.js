"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";
import { education, certifications } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function EducationCertifications() {
  return (
    <section id="credentials" className="py-16 md:py-20 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
            <span>EDUCATION &amp; CERTIFICATIONS // 05</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight font-sans">
            Academic Background &amp; Verified Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Degree Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="rounded-2xl bg-white border border-[#E7E5E0] p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#365CF5] font-bold">
                EDUCATION
              </span>
            </div>

            <h3 className="text-base font-bold text-[#171717] font-sans mb-1">
              {education.degree}
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] font-sans mb-3">
              {education.institution}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#666666] pt-2 border-t border-[#E7E5E0]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#365CF5]" />
                {education.location}
              </span>
              <span className="flex items-center gap-1 text-[#171717] font-medium">
                <Calendar className="w-3 h-3 text-[#365CF5]" />
                {education.period}
              </span>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
            {...cardHoverProps}
            className="rounded-2xl bg-white border border-[#E7E5E0] p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5]">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#365CF5] font-bold">
                CERTIFICATIONS
              </span>
            </div>

            <div className="space-y-2.5">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#365CF5] uppercase font-bold block">
                      {cert.title}
                    </span>
                    <p className="text-xs font-semibold text-[#171717] font-sans">
                      {cert.name}
                    </p>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-white border border-[#E7E5E0] text-[#666666] hover:text-[#365CF5] transition-colors shrink-0"
                      title="View certificate"
                      aria-label={`View certificate for ${cert.name}`}
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
