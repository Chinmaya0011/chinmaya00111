"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  FileDown, 
  Code2, 
  ShieldCheck, 
  Terminal
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { fadeInUp, staggerContainer, buttonMotionProps, easeOutQuad } from "@/lib/motion";
import ResumeModal from "./ResumeModal";

// Interactive Count-Up component for numerical stats
function StatCounter({ targetValue, suffix = "", detail, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  // Parse integer from values like "4+", "20+", "3"
  const numericTarget = parseInt(targetValue, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const stepTime = Math.max(Math.floor(duration / (numericTarget || 1)), 25);

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
    <div ref={ref} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 glass-card">
      <div className="text-[11px] text-zinc-400 uppercase font-mono font-medium">{label}</div>
      <div className="text-white font-bold text-lg sm:text-xl font-mono mt-0.5">
        {count}{targetValue.includes("+") ? "+" : ""} {suffix}
      </div>
      <div className="text-[11px] text-emerald-400/90 font-mono truncate mt-0.5">
        {detail}
      </div>
    </div>
  );
}

// Typing Headline Effect with blinking cursor
function TypingHeadline({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] min-h-[72px] sm:min-h-[110px]">
      {displayedText}
      <span className={`inline-block w-2.5 h-8 sm:h-10 ml-1.5 align-middle bg-emerald-400 ${isDone ? "animate-pulse" : ""}`} />
    </h1>
  );
}

export default function Hero() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        
        {/* Faint Grid Background & Radial Gradient Glow behind Hero */}
        <div className="absolute inset-0 bg-grid-faint opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-emerald-500/[0.06] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Staggered Page Load Animation */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Tag */}
              <motion.div variants={fadeInUp} className="mb-4">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400 text-xs font-mono">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden border border-emerald-400/40 shrink-0">
                    <Image
                      src="/images/chinmaya.jpg"
                      alt="Chinmaya Kumar Mishra"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wider uppercase font-semibold">
                    {personalInfo.tag}
                  </span>
                </div>
              </motion.div>

              {/* Headline with Typing Effect */}
              <motion.div variants={fadeInUp} className="mb-4 w-full">
                <TypingHeadline text={personalInfo.headline} />
              </motion.div>

              {/* Subtext */}
              <motion.p variants={fadeInUp} className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-sans">
                {personalInfo.heroIntro}
              </motion.p>

              {/* Buttons: View Projects, Download CV */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-8">
                <motion.a
                  {...buttonMotionProps}
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0A0A0B] font-bold text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>

                <motion.button
                  {...buttonMotionProps}
                  onClick={() => setResumeModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 font-semibold text-xs font-mono tracking-wider border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download CV</span>
                </motion.button>
              </motion.div>

              {/* Stats: Count-up animation when in view */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 w-full max-w-lg pt-6 border-t border-white/10 text-xs">
                {personalInfo.heroStats.map((item, idx) => (
                  <StatCounter
                    key={idx}
                    targetValue={item.value}
                    label={item.label}
                    detail={item.detail}
                  />
                ))}
              </motion.div>

            </motion.div>

            {/* Right Column (5 cols): Interactive Code/Terminal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeOutQuad }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 backdrop-blur-md glass-card hover:border-emerald-500/35 transition-all">
                
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-zinc-400">
                      security-pipeline.js
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    SECURE ARCHITECTURE
                  </span>
                </div>

                <div className="rounded-xl bg-[#070709] p-3.5 border border-white/5 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto space-y-1 mb-4">
                  <div className="text-zinc-500">// Enforce strict authorization &amp; input sanitization</div>
                  <div><span className="text-purple-400">router</span>.<span className="text-blue-400">post</span>(<span className="text-emerald-400">&quot;/api/scan&quot;</span>, <span className="text-cyan-400">verifyAuth</span>, <span className="text-yellow-400">async</span> (req, res) =&gt; &#123;</div>
                  <div className="pl-4 text-zinc-500">// Verify repository tenant boundary</div>
                  <div className="pl-4"><span className="text-yellow-400">const</span> repo = <span className="text-yellow-400">await</span> Repos.<span className="text-blue-400">findOne</span>(&#123; _id: req.body.id, orgId: req.user.orgId &#125;);</div>
                  <div className="pl-4"><span className="text-purple-400">if</span> (!repo) <span className="text-purple-400">return</span> res.<span className="text-blue-400">status</span>(<span className="text-amber-400">403</span>).<span className="text-blue-400">json</span>(&#123; error: <span className="text-rose-400">&quot;BOLA Denied&quot;</span> &#125;);</div>
                  <div className="pl-4"><span className="text-yellow-400">await</span> semgrepPipeline.<span className="text-blue-400">trigger</span>(repo);</div>
                  <div className="pl-4">res.<span className="text-blue-400">json</span>(&#123; status: <span className="text-emerald-400">&quot;scanning&quot;</span> &#125;);</div>
                  <div>&#125;);</div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MERN Stack Production</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Secure by Design</span>
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
