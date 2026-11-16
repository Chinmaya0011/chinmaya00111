"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileDown,
  Mail,
  Github,
  Linkedin,
  ShieldCheck,
  Cpu,
  Sparkles,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import dynamic from "next/dynamic";

const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Smooth 3D tilt tracking for the photo card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered reveal animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-transparent">

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Column (7 cols): Clean, minimal typography */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Badge: Available worldwide with pulsing green beacon */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E5E0] text-xs font-mono text-[#444444] shadow-xs">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-medium text-[#171717]">Available worldwide</span>
                  <span className="text-[#C8C6BE]">•</span>
                  <span className="text-[#666666] hidden sm:inline">Bhubaneswar, IN</span>
                </div>
              </motion.div>

              {/* Name & Role */}
              <motion.div variants={itemVariants} className="mb-4">
                <span className="text-sm sm:text-base font-semibold text-[#171717] tracking-tight block">
                  Chinmaya Kumar Mishra
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#3B5BFF] uppercase tracking-wider block mt-0.5">
                  AI Application Security Engineer
                </span>
              </motion.div>

              {/* Headline with animated gradient underline on "secure" */}
              <motion.h1
                variants={itemVariants}
                className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-extrabold text-[#171717] tracking-tight leading-[1.08] mb-5 font-sans"
              >
                I build{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10 text-[#171717]">secure</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 overflow-visible pointer-events-none"
                  >
                    <defs>
                      <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B5BFF" />
                        <stop offset="100%" stopColor="#60A5FA" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 2 12 Q 110 3 218 10"
                      stroke="url(#secureGradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                            pathLength: { delay: 0.55, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                            opacity: { delay: 0.55, duration: 0.2 }
                          }
                      }
                    />
                  </svg>
                </span>{" "}
                software.
              </motion.h1>

              {/* One-line subtext (max 12 words) */}
              <motion.p
                variants={itemVariants}
                className="text-[#666666] text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-lg font-sans"
              >
                Full-stack engineer finding and fixing vulnerabilities with AI.
              </motion.p>

              {/* 2 Buttons Only & 3 Small Icon Links */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
              >
                {/* Primary Button: View Work */}
                <motion.a
                  href="#projects"
                  whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: "0 10px 25px -4px rgba(59, 91, 255, 0.35)" }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3B5BFF] text-white font-medium text-xs sm:text-sm tracking-wide transition-colors shadow-xs hover:bg-[#2F4EE6] focus:outline-none focus:ring-2 focus:ring-[#3B5BFF] focus:ring-offset-2"
                >
                  <span>View Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.a>

                {/* Secondary Button: Resume */}
                <motion.button
                  onClick={() => setResumeModalOpen(true)}
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E7E5E0] text-[#171717] font-medium text-xs sm:text-sm tracking-wide transition-all shadow-xs hover:bg-[#F7F6F2] hover:border-[#D5D3CC] focus:outline-none focus:ring-2 focus:ring-[#3B5BFF] focus:ring-offset-2"
                >
                  <FileDown className="w-4 h-4 text-[#3B5BFF]" />
                  <span>Resume</span>
                </motion.button>

                {/* 3 Small Icon Links */}
                <div className="flex items-center gap-1.5 ml-0 sm:ml-3 pt-2 sm:pt-0">
                  <a
                    href={personalInfo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] hover:border-[#D5D3CC] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]"
                    aria-label="GitHub Profile"
                    title="GitHub: chinmaya0011"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={personalInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#3B5BFF] hover:border-[#3B5BFF]/30 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn: chinmaya00111"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href={personalInfo.links.email}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] hover:border-[#D5D3CC] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]"
                    aria-label="Send direct email"
                    title={personalInfo.email}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column (5 cols): Studio Card + 3 floating stat chips */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[340px] sm:max-w-[370px]"
                style={{ perspective: 1000 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* 3D tilt + gentle vertical float */}
                <motion.div
                  style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={
                    shouldReduceMotion
                      ? {}
                      : {
                        y: { duration: 6, ease: "easeInOut", repeat: Infinity }
                      }
                  }
                  className="relative will-change-transform"
                >
                  {/* Outer Bezel Card */}
                  <div className="relative aspect-[4/5] w-full rounded-[30px] p-2.5 sm:p-3 bg-white/90 backdrop-blur-md border border-[#E7E5E0] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.09)] transition-all">

                    {/* Inner Photo Container */}
                    <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#EDEDF2] to-[#DFDFE6]">
                      <Image
                        src="/chinmaya.png"
                        alt="Chinmaya Kumar Mishra — AI Application Security Engineer"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"
                        priority
                        className="object-cover object-top filter contrast-[1.03] saturate-[1.02]"
                      />

                      {/* Subtle Vignette at Base of Portrait */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                      {/* Studio Bottom Identifier Bar */}
                      <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[11px] font-mono font-bold text-[#171717] tracking-tight">
                            Chinmaya K. Mishra
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-medium text-[#3B5BFF]">
                          AppSec · AI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stat Chip 1: 2+ yrs experience (Top-Right) */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
                    transition={
                      shouldReduceMotion
                        ? {}
                        : {
                          duration: 3.6,
                          ease: "easeInOut",
                          repeat: Infinity
                        }
                    }
                    className="absolute -top-3.5 -right-3 sm:-right-5 z-20"
                  >
                    <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#E7E5E0] shadow-md flex items-center gap-2.5 hover:border-[#3B5BFF]/40 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-[#171717] whitespace-nowrap leading-tight">
                          2+ yrs experience
                        </span>
                        <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">
                          Full-Stack Dev
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stat Chip 2: MERN + AppSec (Bottom-Left) */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [4, -4, 4] }}
                    transition={
                      shouldReduceMotion
                        ? {}
                        : {
                          duration: 4.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: 0.3
                        }
                    }
                    className="absolute -bottom-3.5 -left-3 sm:-left-5 z-20"
                  >
                    <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#E7E5E0] shadow-md flex items-center gap-2.5 hover:border-emerald-500/40 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-[#171717] whitespace-nowrap leading-tight">
                          MERN + AppSec
                        </span>
                        <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">
                          Vulnerability Triage
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stat Chip 3: AI Security (Center-Right) */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
                    transition={
                      shouldReduceMotion
                        ? {}
                        : {
                          duration: 5.1,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: 0.7
                        }
                    }
                    className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 z-20"
                  >
                    <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#3B5BFF]/30 shadow-md flex items-center gap-2.5 hover:border-[#3B5BFF] transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center shrink-0">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-[#3B5BFF] whitespace-nowrap leading-tight">
                          AI Security
                        </span>
                        <span className="text-[9px] font-mono text-[#888888] uppercase tracking-wider">
                          LLM &amp; RAG Defense
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
}
