"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  FileDown, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { fadeInUp, staggerContainer, buttonMotionProps, easeOutQuad } from "@/lib/motion";
import ResumeModal from "./ResumeModal";

// Stat Counter Component
function StatCounter({ targetValue, suffix = "", detail, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericTarget = parseInt(targetValue, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / (numericTarget || 1)), 30);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericTarget) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return (
    <div ref={ref} className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E7E5E0] shadow-sm">
      <div className="text-[11px] text-[#666666] font-mono font-medium uppercase tracking-wider">{label}</div>
      <div className="text-[#171717] font-bold text-xl sm:text-2xl font-mono mt-0.5">
        {count}{targetValue.includes("+") ? "+" : ""} {suffix}
      </div>
      <div className="text-[11px] text-[#365CF5] font-mono truncate mt-0.5 font-medium">
        {detail}
      </div>
    </div>
  );
}

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (7 cols): Editorial Typography & Introduction */}
            <motion.div
              variants={staggerContainer(0.08, 0.05)}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Availability & Location Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E5E0] text-xs font-mono text-[#171717] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-[#171717]">
                    {personalInfo.availability}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F2EE] border border-[#E7E5E0] text-xs font-mono text-[#666666]">
                  <MapPin className="w-3.5 h-3.5 text-[#365CF5]" />
                  <span>{personalInfo.location}</span>
                </div>
              </motion.div>

              {/* Name & Professional Title */}
              <motion.div variants={fadeInUp} className="mb-3">
                <span className="font-mono text-xs font-bold text-[#365CF5] tracking-widest uppercase block mb-1">
                  {personalInfo.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                  {personalInfo.name}
                </h2>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                variants={fadeInUp} 
                className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.12] mb-5"
              >
                {personalInfo.headline}
              </motion.h1>

              {/* Description */}
              <motion.p 
                variants={fadeInUp} 
                className="text-[#666666] text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-sans"
              >
                {personalInfo.heroIntro}
              </motion.p>

              {/* Actions & Links */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#365CF5] hover:bg-[#2548D9] text-white font-semibold text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setResumeModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] text-[#171717] font-semibold text-xs font-mono tracking-wider border border-[#E7E5E0] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#365CF5]" />
                  <span>Download Resume</span>
                </button>

                <div className="flex items-center gap-2 ml-0 sm:ml-2 pt-2 sm:pt-0">
                  <a
                    href={personalInfo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] transition-colors shadow-sm"
                    aria-label="GitHub Profile"
                    title="GitHub: chinmaya0011"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={personalInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#365CF5] transition-colors shadow-sm"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn: chinmaya00111"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href={personalInfo.links.email}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] transition-colors shadow-sm"
                    aria-label="Email Chinmaya"
                    title={personalInfo.email}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
                {personalInfo.stats.map((item, idx) => (
                  <StatCounter
                    key={idx}
                    targetValue={item.value}
                    label={item.label}
                    detail={item.detail}
                  />
                ))}
              </motion.div>

            </motion.div>

            {/* Right Column (5 cols): Professional Photograph Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutQuad }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md bg-white border border-[#E7E5E0] rounded-2xl p-4 shadow-sm">
                
                {/* Photo Top Header */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-3 border-b border-[#E7E5E0] font-mono text-[11px] text-[#666666]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
                    <span className="font-semibold text-[#171717]">ENGINEERING PROFILE</span>
                  </div>
                  <span>ODISHA, IN</span>
                </div>

                {/* Main Photo Frame */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-[#E7E5E0] bg-[#F3F2EE]">
                  <Image
                    src="/images/chinmaya.jpg"
                    alt="Chinmaya Kumar Mishra — Full-Stack Developer and Application Security Engineer"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    priority
                    className="object-cover object-top filter contrast-[1.02] hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Vignette at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E7E5E0] shadow-sm pointer-events-none">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-mono font-bold text-[#171717]">
                        Chinmaya Kumar Mishra
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#365CF5]" />
                    </div>
                    <p className="text-[11px] font-mono text-[#666666]">
                      Full-Stack Dev | AppSec Engineer
                    </p>
                  </div>
                </div>

                {/* Core Focus Tags */}
                <div className="flex items-center justify-between gap-1.5 pt-3 px-1 text-[10px] font-mono text-[#666666]">
                  <span className="px-2 py-0.5 rounded bg-[#F3F2EE] border border-[#E7E5E0] text-[#171717]">
                    React · Next.js · Node
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#F3F2EE] border border-[#E7E5E0] text-[#171717]">
                    OWASP &amp; API Security
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#365CF5]/10 border border-[#365CF5]/20 text-[#365CF5] font-semibold">
                    AI Integrations
                  </span>
                </div>

              </div>
            </motion.div>

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
