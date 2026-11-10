"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Code2, ShieldCheck, MapPin } from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps } from "@/lib/motion";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ABOUT</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left / Profile Image Card (5 cols on lg) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Emerald ambient blur glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-emerald-500/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

              {/* Glass Card Container */}
              <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-emerald-500/40 p-3 sm:p-3.5 backdrop-blur-md transition-all duration-300 shadow-2xl glass-card">
                
                {/* Image Top Status Bar */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-2.5 font-mono text-[11px] text-zinc-400 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-zinc-200 font-semibold tracking-wider">DEV_PROFILE // 01</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>ODISHA, IN</span>
                  </span>
                </div>

                {/* Main Photo Frame */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0E0E11]">
                  <Image
                    src="/images/chinmaya.jpg"
                    alt="Chinmaya Kumar Mishra - Full-Stack Developer & AppSec"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    priority
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] group-hover:scale-[1.03] group-hover:contrast-[1.05] transition-all duration-500 ease-out"
                  />

                  {/* Subtle Gradient Vignette at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* In-photo Tag at Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10 pointer-events-none">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-mono font-bold text-white tracking-wide">
                        Chinmaya Kumar Mishra
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Full-Stack Dev · Application Security
                    </p>
                  </div>
                </div>

                {/* Tech Chips Below Photo */}
                <div className="flex items-center justify-between gap-1.5 pt-3 px-1 text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-zinc-300">
                    React · Next.js
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-zinc-300">
                    Node.js · MERN
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    AppSec Focus
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right / Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Heading */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-mono"
            >
              {personalInfo.aboutHeading}
            </motion.h2>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans mb-8 whitespace-pre-line space-y-3"
            >
              {personalInfo.aboutText}
            </motion.div>

            {/* Two Cards: Build & Secure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                {...cardHoverProps}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-3.5 text-left glass-card"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-emerald-400">
                    Build
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1 leading-relaxed">
                    {personalInfo.aboutPillars[0].description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                {...cardHoverProps}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-3.5 text-left glass-card"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-emerald-400">
                    Secure
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1 leading-relaxed">
                    {personalInfo.aboutPillars[1].description}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
