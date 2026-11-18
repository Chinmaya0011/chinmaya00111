"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { ShieldCheck, Terminal, MapPin, Sparkles, CheckCircle2, Cpu, Code2, Lock, ArrowUpRight } from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function About() {
  const highlights = [
    {
      title: "Secure Code Architecture",
      desc: "Tracing data flows and trust boundaries from input parameters down to database or OS execution sinks."
    },
    {
      title: "AST-Driven Scanning",
      desc: "Constructing deterministic static analysis rules with Semgrep to filter high-confidence vulnerabilities."
    },
    {
      title: "AI Security Systems",
      desc: "Investigating LLM prompt injections, insecure output handling, and RAG data leakage vectors."
    },
    {
      title: "Modern Web Engineering",
      desc: "Architecting production full-stack systems with React 19, Next.js 15, Node.js, and MongoDB."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>ABOUT // 01</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight font-sans">
            {personalInfo.aboutHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-sans mt-3">
            Developer by experience. Application security researcher by discipline and curiosity.
          </p>
        </motion.div>

        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column (7 cols): Narrative Biography & Philosophy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-5 text-base sm:text-lg text-[#444444] leading-relaxed font-sans"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-[#E7E5E0]">
              <div className="w-9 h-9 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#3B5BFF] uppercase tracking-wider block">
                  Core Engineering Philosophy
                </span>
                <span className="text-sm font-bold text-[#171717]">
                  Security is not an afterthought—it is system design.
                </span>
              </div>
            </div>

            {personalInfo.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="last:mb-0 text-[#444444] leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#666666] bg-[#FAF9F6] px-3.5 py-1.5 rounded-xl border border-[#E7E5E0]">
                <MapPin className="w-3.5 h-3.5 text-[#3B5BFF]" />
                <span>Bhubaneswar, Odisha, India</span>
              </div>

              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#3B5BFF] hover:underline"
              >
                <span>View Employment Track</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Specialization Highlights & Credentials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.12 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3B5BFF] font-bold block mb-3">
                KEY TECHNICAL FOCUS AREAS
              </span>

              <div className="space-y-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="pb-3 last:pb-0 border-b last:border-b-0 border-[#E7E5E0]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF]" />
                      <h3 className="text-sm font-bold text-[#171717] font-sans">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#666666] font-sans leading-relaxed pl-3.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Callout */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#171717] block">
                  2+
                </span>
                <span className="text-[11px] font-mono text-[#666666] uppercase tracking-wider mt-1 block">
                  Years Professional Experience
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#3B5BFF] block">
                  OWASP
                </span>
                <span className="text-[11px] font-mono text-[#666666] uppercase tracking-wider mt-1 block">
                  Deterministic SAST / Top 10
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
