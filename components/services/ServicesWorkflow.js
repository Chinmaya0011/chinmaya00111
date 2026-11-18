"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Layers, 
  Cpu, 
  Rocket, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function ServicesWorkflow() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "Scope & Objectives",
      icon: Compass,
      color: "text-[#3B5BFF]",
      border: "border-[#3B5BFF]/30",
      bg: "bg-[#3B5BFF]/10",
      description:
        "Understand the business requirements, user goals, technical constraints, budget, and project scope before writing a line of code or testing an endpoint.",
      highlights: [
        "Requirement interviews & goals alignment",
        "Technical scope & constraints analysis",
        "Clear timeline and deliverable definitions"
      ]
    },
    {
      number: "02",
      title: "Planning & Architecture",
      subtitle: "System Design & Threat Model",
      icon: Layers,
      color: "text-[#06B6D4]",
      border: "border-[#06B6D4]/30",
      bg: "bg-[#06B6D4]/10",
      description:
        "Define the application architecture, technology stack, database schema, API contracts, and security boundaries upfront to prevent architectural debt.",
      highlights: [
        "Modular schema & API contracts design",
        "Trust boundary & auth model planning",
        "Tech stack selection suited for scale"
      ]
    },
    {
      number: "03",
      title: "Development & Testing",
      subtitle: "Iterative Build & Verification",
      icon: Cpu,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      bg: "bg-[#8B5CF6]/10",
      description:
        "Build features iteratively, integrate third-party APIs, write clean maintainable code, test critical user workflows, and validate defensive security controls.",
      highlights: [
        "Bi-weekly sprint progress & demos",
        "Automated unit & integration validation",
        "Security sanity checks & AST review"
      ]
    },
    {
      number: "04",
      title: "Delivery & Support",
      subtitle: "Production Launch & Handover",
      icon: Rocket,
      color: "text-emerald-600",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      description:
        "Deploy the application to production, provide clear technical documentation and environment configs, and discuss ongoing maintenance or security improvements.",
      highlights: [
        "Containerized zero-downtime deployment",
        "Complete technical documentation & handover",
        "Ongoing security patches & retainer options"
      ]
    }
  ];

  return (
    <section id="workflow" className="py-20 md:py-28 relative border-t border-[#E7E5E0] scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>HOW I WORK // SYSTEMATIC ENGINEERING PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4 font-sans">
            From Idea to Production. From Findings to Fixes.
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            A structured four-step methodology ensuring complete transparency, high code quality, and security considerations throughout the engagement lifecycle.
          </p>
        </motion.div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="p-7 rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E5E0]">
                    <span className="font-mono text-2xl font-black text-[#171717] tracking-tighter">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${step.bg} ${step.color} ${step.border} border flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#171717] font-sans tracking-tight mb-1">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#3B5BFF] font-semibold block mb-3 uppercase tracking-wider">
                    {step.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E5E0] space-y-2">
                  {step.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#555555] font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
