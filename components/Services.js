"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Phone,
  AlertCircle,
  Award
} from "lucide-react";
import { servicesData, clientExperience, servicesCta } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function Services() {
  const serviceIcons = {
    "web-app-dev": Globe,
    "android-dev": Smartphone,
    "app-security": ShieldCheck,
    "freelance-engineering": Briefcase
  };

  return (
    <section id="services" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
            <span>SERVICES &amp; CONSULTING // 03</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-3 font-sans">
            Services &amp; Technical Consulting
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#3B5BFF] font-mono uppercase tracking-wider mb-3">
            Engineering, Development &amp; Security Services
          </p>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            I work with startups, businesses, founders, and individuals to build modern digital products, improve application security, and solve practical engineering challenges. Available for freelance projects, part-time engagements, and technical collaborations.
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
                className="rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 p-6 sm:p-8 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Service Number & Icon */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E5E0]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3B5BFF]/10 text-[#3B5BFF] border border-[#3B5BFF]/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#3B5BFF] uppercase tracking-wider">
                        SERVICE {item.number}
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

                  {/* Services Checklist */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold block mb-1">
                      Scope of Deliverables
                    </span>
                    {item.services.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#3B5BFF] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Optional Disclaimer (e.g. for AppSec) */}
                  {item.disclaimer && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-[11px] font-sans flex items-start gap-2 mb-6 leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item.disclaimer}</span>
                    </div>
                  )}
                </div>

                {/* Technologies Pills */}
                <div className="pt-4 border-t border-[#E7E5E0]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-2">
                    Technologies &amp; Tools
                  </span>
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
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Experience Compact Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-mono text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Award className="w-3.5 h-3.5" />
              <span>DELIVERY TRACK RECORD</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight mb-2">
              {clientExperience.headline}
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed">
              {clientExperience.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-center min-w-[130px]">
              <div className="text-2xl font-bold font-mono text-[#171717]">20+</div>
              <div className="text-[10px] font-mono text-[#666666] uppercase mt-0.5">Completed Builds</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-center min-w-[130px]">
              <div className="text-2xl font-bold font-mono text-[#3B5BFF]">100%</div>
              <div className="text-[10px] font-mono text-[#666666] uppercase mt-0.5">End-to-End Delivery</div>
            </div>
          </div>
        </motion.div>

        {/* Contact and Call to Action Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-white border border-[#3B5BFF]/25 shadow-sm relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#3B5BFF]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* CTA Information */}
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B5BFF] block mb-1">
                START A COLLABORATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-sans tracking-tight mb-2">
                {servicesCta.heading}
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-6">
                {servicesCta.description}
              </p>

              {/* Direct Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666666]">
                <div className="flex items-center gap-1.5 text-[#171717]">
                  <Mail className="w-3.5 h-3.5 text-[#3B5BFF]" />
                  <span>{servicesCta.email}</span>
                </div>
                <span className="text-[#C8C6BE]">•</span>
                <div className="flex items-center gap-1.5 text-[#171717]">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{servicesCta.phone}</span>
                </div>
                <span className="text-[#C8C6BE]">•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#666666]" />
                  <span>{servicesCta.location}</span>
                </div>
              </div>
            </div>

            {/* 3 Functional Contact Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
              {/* WhatsApp Inquiry */}
              <a
                href={servicesCta.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>

              {/* Send an Email */}
              <a
                href={`mailto:${servicesCta.email}?subject=Project%20or%20Consulting%20Inquiry`}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] text-[#171717] border border-[#E7E5E0] font-medium text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#3B5BFF]" />
                <span>Send an Email</span>
              </a>

              {/* Discuss a Project (Scroll to Contact) */}
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#3B5BFF] text-white font-medium text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
