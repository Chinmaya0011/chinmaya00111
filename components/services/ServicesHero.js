"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Code2,
  Lock,
  Cpu
} from "lucide-react";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

export default function ServicesHero({ onSelectService }) {
  const capabilities = [
    {
      id: "fullstack",
      title: "Full-Stack Development",
      subtitle: "Next.js · React 19 · Node.js",
      icon: Layers,
      color: "text-[#3B5BFF]",
      bg: "bg-[#3B5BFF]/10",
      border: "border-[#3B5BFF]/30",
      status: "PRODUCTION-READY",
      serviceTarget: "Web Application Development"
    },
    {
      id: "android",
      title: "Android Applications",
      subtitle: "React Native · Expo · Mobile APIs",
      icon: Smartphone,
      color: "text-[#06B6D4]",
      bg: "bg-[#06B6D4]/10",
      border: "border-[#06B6D4]/30",
      status: "MOBILE-OPTIMIZED",
      serviceTarget: "Android Application Development"
    },
    {
      id: "appsec",
      title: "Application Security",
      subtitle: "Web & API Pentesting · Code Review",
      icon: ShieldCheck,
      color: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/10",
      border: "border-[#8B5CF6]/30",
      status: "AUTHORIZED ASSESSMENTS",
      serviceTarget: "Application Security Assessment"
    }
  ];

  const handleStartProject = (serviceName) => {
    if (onSelectService) {
      onSelectService(serviceName || "Web Application Development");
    }
    const target = document.getElementById("inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreServices = () => {
    const target = document.getElementById("services-overview");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Eyebrow Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#3B5BFF] animate-pulse" />
          <span>INDEPENDENT ENGINEERING SERVICES // 2026</span>
        </motion.div>

        {/* Main Headline & Supporting Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight font-sans leading-[1.12] mb-6">
              I Build Digital Products. <br />
              <span className="bg-gradient-to-r from-[#3B5BFF] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                I Secure What Matters.
              </span>
            </h1>

            <p className="text-[#666666] text-base sm:text-lg lg:text-xl font-sans leading-relaxed max-w-2xl mb-8">
              From modern web applications and Android experiences to authorized application security assessments, I help businesses build reliable, scalable and security-conscious digital products.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <motion.button
                {...buttonMotionProps}
                onClick={() => handleStartProject("Web Application Development")}
                className="px-6 py-3.5 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                {...buttonMotionProps}
                onClick={handleExploreServices}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#E7E5E0] text-[#171717] font-mono text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2"
              >
                <span>Explore Services</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Terminal Telemetry Workstation Widget */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-[#171717] text-white p-5 sm:p-6 shadow-2xl border border-zinc-800 font-mono relative overflow-hidden">
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B5BFF]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-zinc-500 ml-1">eng-workstation // telemetry</span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Workstation Telemetry Logs */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="text-[#3B5BFF] font-bold">›</span>
                  <div>
                    <span className="text-zinc-400 text-[10px] block font-semibold">CORE ARCHITECTURE</span>
                    <span className="text-white">Next.js 15, React 19, Node.js REST APIs</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="text-[#06B6D4] font-bold">›</span>
                  <div>
                    <span className="text-zinc-400 text-[10px] block font-semibold">MOBILE CAPABILITY</span>
                    <span className="text-white">React Native, Expo &amp; Cross-Platform Android</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="text-[#888888] font-bold">›</span>
                  <div>
                    <span className="text-zinc-400 text-[10px] block font-semibold">SECURITY AUDIT STANDARD</span>
                    <span className="text-emerald-400">OWASP ASVS / Top 10 / BOLA Mitigation</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-zinc-300">
                  <span className="text-[#8B5CF6] font-bold">›</span>
                  <div>
                    <span className="text-zinc-400 text-[10px] block font-semibold">CLIENT ENGAGEMENT MODEL</span>
                    <span className="text-white">Project-based, Sprint contracts &amp; Retainers</span>
                  </div>
                </div>
              </div>

              {/* Status Footer Tile */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3B5BFF]" />
                  <span>Inquiry Review SLA: &lt; 24h</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  AVAILABLE Q1/Q2 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Compact Capability Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleStartProject(item.serviceTarget)}
                className="p-5 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 shadow-xs hover:shadow-card transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} ${item.border} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-[#171717] font-sans group-hover:text-[#3B5BFF] transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#666666] font-sans truncate mb-1">
                    {item.subtitle}
                  </p>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-[#3B5BFF] uppercase block">
                    {item.status} →
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
