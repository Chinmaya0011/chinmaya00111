"use client";

import { motion } from "framer-motion";
import { 
  Layers, 
  ShieldCheck, 
  Wrench, 
  MessageSquare, 
  CheckCircle2,
  Lock,
  Zap,
  Code2
} from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function WhyWorkWithMe() {
  const pillars = [
    {
      id: "fullstack-ownership",
      title: "Full-Stack Ownership",
      icon: Layers,
      color: "text-[#3B5BFF]",
      border: "border-[#3B5BFF]/30",
      bg: "bg-[#3B5BFF]/10",
      description:
        "I understand the complete application lifecycle, from frontend interfaces to backend APIs and databases. You won't face disjointed handoffs between separate frontend, backend, or DevOps teams.",
      points: [
        "End-to-end component & API cohesion",
        "Consistent typing with TypeScript & schemas",
        "Single point of technical responsibility"
      ]
    },
    {
      id: "security-aware",
      title: "Security-Aware Development",
      icon: ShieldCheck,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      bg: "bg-[#8B5CF6]/10",
      description:
        "I consider authentication, authorization, validation, access control and common attack surfaces during development, building defensive guardrails into your architecture before deployment.",
      points: [
        "OWASP ASVS & Top 10 built into code",
        "BOLA/IDOR prevention at data layer",
        "Zero-trust credential & token handling"
      ]
    },
    {
      id: "practical-engineering",
      title: "Practical Engineering",
      icon: Wrench,
      color: "text-[#06B6D4]",
      border: "border-[#06B6D4]/30",
      bg: "bg-[#06B6D4]/10",
      description:
        "I focus on maintainable code, reliable integrations, performance and real business requirements. No over-engineered bloatware or unnecessary dependencies that inflate your cloud bill.",
      points: [
        "Clean, documented codebases",
        "Tested integrations & idempotent flows",
        "Cost-effective & containerized deploys"
      ]
    },
    {
      id: "direct-communication",
      title: "Direct Communication",
      icon: MessageSquare,
      color: "text-emerald-600",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      description:
        "Work directly with me throughout discovery, development, testing and delivery. No agency middlemen, account managers, or translation delays between you and the engineer building your product.",
      points: [
        "Direct access to your developer",
        "Rapid feedback cycles & updates",
        "Transparent timeline & progress tracking"
      ]
    }
  ];

  return (
    <section id="why-me" className="py-20 md:py-28 relative border-t border-[#E7E5E0] scroll-mt-20">
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
            <span>CORE PHILOSOPHY // 04 PILLARS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4 font-sans">
            Engineering With a Security-First Mindset
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            Most projects treat security as a delayed checklist item after production release. I design and build applications where security, performance, and maintainability are first-class architectural constraints.
          </p>
        </motion.div>

        {/* 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.08 }}
                {...cardHoverProps}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[#E7E5E0]">
                    <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.color} ${item.border} border flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-sans tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E5E0] space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#444444] font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#3B5BFF] shrink-0 mt-0.5" />
                      <span>{pt}</span>
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
