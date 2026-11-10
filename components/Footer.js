"use client";

import { Shield, ArrowUp, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020508] border-t border-white/[0.06] py-12 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-2.5 text-white font-mono font-bold text-base mb-1.5">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide text-white">{personalInfo.brand}</span>
              <span className="text-slate-600">//</span>
              <span className="text-emerald-400 text-xs font-normal">FULL-STACK &amp; APPSEC</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
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

            <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-emerald-400" />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/40 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-emerald-400" />
            </button>
          </div>

        </div>

        {/* Bottom Integrity Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name} ({personalInfo.brand})
          </div>
          <div>
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </div>
        </div>

      </div>
    </footer>
  );
}
