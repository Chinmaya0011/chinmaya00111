"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  FileDown, 
  Code2, 
  Lock,
  Github,
  Linkedin
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import ResumeModal from "./ResumeModal";

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[82vh] flex flex-col justify-center pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08121A] border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="tracking-wider uppercase font-semibold">
                  FULL-STACK DEVELOPER // APPSEC ENTHUSIAST
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-3">
                Building Software. <br />
                <span className="text-gradient-emerald">Learning to Secure It.</span>
              </h1>

              {/* Professional Title */}
              <p className="text-sm sm:text-base font-mono text-slate-300 mb-4 font-medium">
                {personalInfo.title}
              </p>

              {/* Concise Intro */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-sans">
                {personalInfo.heroIntro}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#03070A] font-semibold text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-[#081018] hover:bg-[#0D1824] text-slate-200 font-medium text-xs font-mono tracking-wider border border-white/[0.08] hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact Me</span>
                </a>

                <button
                  onClick={() => setResumeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* 3 Quick Clean Labels */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-5 border-t border-white/[0.06] text-xs font-mono">
                {personalInfo.heroStats.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#070D14]/80 border border-white/[0.06]">
                    <div className="text-[10px] text-slate-500 uppercase">{item.label}</div>
                    <div className="text-slate-200 font-bold mt-0.5">{item.value}</div>
                    <div className="text-[10px] text-emerald-400/90 truncate">{item.detail}</div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Right Column: Clean Workspace Snippet Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl bg-[#060C14] border border-white/[0.08] p-5 backdrop-blur-xl glow-card">
                
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      auth-check.js
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    MERN + APPSEC
                  </span>
                </div>

                <div className="rounded-xl bg-[#03060A] p-3.5 border border-white/[0.05] font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto space-y-1 mb-4">
                  <div className="text-slate-500">// Authorized API Endpoint</div>
                  <div><span className="text-purple-400">router</span>.<span className="text-blue-400">get</span>(<span className="text-emerald-400">&quot;/api/projects&quot;</span>, <span className="text-cyan-400">verifyAuth</span>, <span className="text-yellow-400">async</span> (req, res) =&gt; &#123;</div>
                  <div className="pl-4 text-slate-500">// Enforce user ownership</div>
                  <div className="pl-4"><span className="text-yellow-400">const</span> items = <span className="text-yellow-400">await</span> Project.<span className="text-blue-400">find</span>(&#123; userId: req.user.id &#125;);</div>
                  <div className="pl-4">res.<span className="text-blue-400">json</span>(&#123; success: <span className="text-amber-400">true</span>, items &#125;);</div>
                  <div>&#125;);</div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MERN Development</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Secure Coding</span>
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
