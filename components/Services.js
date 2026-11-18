"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  AlertCircle,
  Code2,
  Terminal,
  Lock
} from "lucide-react";
import { servicesData, clientExperience, servicesCta } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";

export default function Services() {
  const serviceIcons = {
    "web-app-dev": Globe,
    "android-dev": Smartphone,
    "app-security": ShieldCheck,
    "freelance-engineering": Briefcase
  };

  return (
    <section id="services" className="py-20 md:py-32 relative border-t border-[#E7E5E0] bg-transparent scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>SERVICES &amp; CONSULTING // 05</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-3 font-sans">
            Services &amp; Technical Consulting
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#3B5BFF] font-mono uppercase tracking-wider mb-3">
            Application Security · Secure Code Review · Full-Stack Development
          </p>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            I work with startups, businesses, and engineering teams to build modern digital products, perform authorized security assessments, and harden critical codebases. Available for contracts, part-time engagements, and consulting.
          </p>
        </motion.div>

        {/* 4 Professional Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {servicesData.map((item, idx) => {
            const Icon = serviceIcons[item.id] || Globe;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-7 sm:p-9 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Service Number & Icon */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E5E0]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] border border-[#3B5BFF]/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#3B5BFF] uppercase tracking-wider">
                        SERVICE // {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Scope of Deliverables */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold block mb-1">
                      Scope of Deliverables
                    </span>
                    {item.services.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#3B5BFF] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Disclaimer for AppSec */}
                  {item.disclaimer && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-sans flex items-start gap-2 mb-6 leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item.disclaimer}</span>
                    </div>
                  )}
                </div>

                {/* Technologies Pills & Contact Trigger */}
                <div className="pt-4 border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[11px] font-mono text-[#171717]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#3B5BFF] hover:underline"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Engagement Callout Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="rounded-3xl bg-[#171717] text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-2">
              COLLABORATION &amp; CONTRACTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-2 text-white">
              Have an engineering project or security audit need?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              Available for freelance engagements, security code assessments, and full-stack system architecture with flexible engagement models.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/services"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Dedicated Services Page</span>
              <ArrowRight className="w-4 h-4 text-[#06B6D4]" />
            </Link>
            <motion.a
              {...buttonMotionProps}
              href="/services#inquiry"
              className="px-6 py-3 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Discuss Engagement</span>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
