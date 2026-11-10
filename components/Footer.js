"use client";

import { motion } from "framer-motion";
import { Shield, ArrowUp, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { buttonMotionProps } from "@/lib/motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 py-12 text-zinc-400 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-2.5 text-white font-mono font-bold text-base mb-1.5">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide text-white">{personalInfo.brand}</span>
              <span className="text-zinc-600">//</span>
              <span className="text-emerald-400 text-xs font-normal">FULL-STACK &amp; APPSEC</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Full-Stack Developer · Application Security
            </p>
          </div>

          {/* Nav Jumps & Socials */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#terminal" className="hover:text-emerald-400 transition-colors">Terminal</a>
            <a href="#expertise" className="hover:text-emerald-400 transition-colors">Expertise</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#research" className="hover:text-emerald-400 transition-colors">Research</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-emerald-400" />
              </motion.a>
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors p-1"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
              </motion.a>
            </div>

            <motion.button
              {...buttonMotionProps}
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-emerald-400" />
            </motion.button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name} ({personalInfo.brand})
          </div>
          <div>
            Built with Next.js &amp; Tailwind CSS · Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-zinc-300">⌘K</kbd> for commands
          </div>
        </div>

      </div>
    </footer>
  );
}
