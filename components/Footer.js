"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { buttonMotionProps } from "@/lib/motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E7E5E0] py-14 text-[#666666] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E7E5E0]">
          
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#365CF5] text-white font-mono font-bold text-xs flex items-center justify-center tracking-tight shadow-xs">
                CM
              </div>
              <span className="font-sans font-extrabold text-base text-[#171717] tracking-tight">
                {personalInfo.name}
              </span>
              <span className="text-[#E7E5E0] font-mono">/</span>
              <span className="text-[#365CF5] text-xs font-mono font-semibold">
                FULL-STACK &amp; APPSEC
              </span>
            </div>
            <p className="text-xs text-[#666666] font-sans">
              Engineering modern web applications &amp; defensive security architectures. Based in Odisha, India.
            </p>
          </div>

          {/* Nav Jumps & Socials */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
            <a href="#about" className="hover:text-[#365CF5] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#365CF5] transition-colors">Skills</a>
            <a href="#appsec" className="hover:text-[#365CF5] transition-colors">AppSec</a>
            <a href="#projects" className="hover:text-[#365CF5] transition-colors">Projects</a>
            <a href="#research" className="hover:text-[#365CF5] transition-colors">Research</a>
            <a href="#experience" className="hover:text-[#365CF5] transition-colors">Experience</a>
            <a href="#credentials" className="hover:text-[#365CF5] transition-colors">Academics</a>
            <a href="#terminal" className="hover:text-[#365CF5] transition-colors">Terminal</a>
            <a href="#contact" className="hover:text-[#365CF5] transition-colors">Contact</a>

            <div className="h-4 w-px bg-[#E7E5E0] hidden sm:block" />

            <div className="flex items-center gap-2">
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#365CF5] transition-colors p-1.5 rounded-md hover:bg-white border border-transparent hover:border-[#E7E5E0]"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#365CF5] transition-colors p-1.5 rounded-md hover:bg-white border border-transparent hover:border-[#E7E5E0]"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.email}
                className="text-[#666666] hover:text-[#365CF5] transition-colors p-1.5 rounded-md hover:bg-white border border-transparent hover:border-[#E7E5E0]"
                title="Email"
                aria-label="Email Chinmaya"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>

            <motion.button
              {...buttonMotionProps}
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white border border-[#E7E5E0] hover:border-[#365CF5]/40 text-[#666666] hover:text-[#365CF5] transition-colors flex items-center gap-1.5 text-xs font-mono shadow-xs"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#365CF5]" />
            </motion.button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#666666]">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Engineered in Odisha, India.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js, Tailwind CSS &amp; Framer Motion</span>
            <span className="text-[#E7E5E0]">•</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E7E5E0] text-[#171717] font-semibold text-[10px] shadow-xs">⌘K</kbd> for quick jump</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
