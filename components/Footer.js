"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { buttonMotionProps } from "@/lib/motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9F6]/90 backdrop-blur-md border-t border-[#E7E5E0] py-14 text-[#666666] relative z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E7E5E0]">

          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E7E5E0] shadow-xs flex-shrink-0 bg-[#FAF9F6]">
                <img
                  src="/chinmaya.png"
                  alt="Chinmaya Kumar Mishra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-sans font-extrabold text-base text-[#171717] tracking-tight">
                {personalInfo.name}
              </span>
              <span className="text-[#D5D3CC] font-mono">/</span>
              <span className="text-[#3B5BFF] text-xs font-mono font-semibold">
                AI APPSEC &amp; FULL-STACK
              </span>
            </div>
            <p className="text-xs text-[#666666] font-sans">
              Building software, investigating vulnerabilities, and engineering security. Based in Bhubaneswar, Odisha, India.
            </p>
          </div>

          {/* Nav Jumps & Socials */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs font-mono">
            <Link href="/services" className="text-[#3B5BFF] font-semibold hover:underline transition-colors">Services</Link>
            <Link href="/blogs" className="text-[#3B5BFF] font-semibold hover:underline transition-colors">Blog</Link>
            <Link href="/#about" className="hover:text-[#3B5BFF] transition-colors">About</Link>
            <Link href="/#expertise" className="hover:text-[#3B5BFF] transition-colors">Expertise</Link>
            <Link href="/#projects" className="hover:text-[#3B5BFF] transition-colors">Work</Link>
            <Link href="/#terminal" className="hover:text-[#3B5BFF] transition-colors">Terminal</Link>
            <Link href="/#experience" className="hover:text-[#3B5BFF] transition-colors">Experience</Link>
            <Link href="/security" className="hover:text-[#3B5BFF] transition-colors font-medium">Security</Link>
            <Link href="/privacy" className="hover:text-[#3B5BFF] transition-colors font-medium">Privacy</Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("openCookieConsent"));
                }
              }}
              className="hover:text-[#3B5BFF] transition-colors font-medium"
            >
              Cookies
            </button>
            <Link href="/#contact" className="hover:text-[#3B5BFF] transition-colors">Contact</Link>

            <div className="h-4 w-px bg-[#E7E5E0] hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#3B5BFF] transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#E7E5E0]"
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
                className="text-[#666666] hover:text-[#3B5BFF] transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#E7E5E0]"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.email}
                className="text-[#666666] hover:text-[#3B5BFF] transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#E7E5E0]"
                title="Email"
                aria-label="Email Chinmaya"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>

            <motion.button
              {...buttonMotionProps}
              onClick={scrollToTop}
              className="p-2 px-3 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-[#171717] hover:text-[#3B5BFF] transition-colors flex items-center gap-1.5 text-xs font-mono shadow-xs"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#3B5BFF]" />
            </motion.button>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#888888]">
          <p>© {new Date().getFullYear()} Chinmaya Kumar Mishra. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>TLS / DNSSEC Verified</span>
            </span>
            <span>•</span>
            <span>Next.js 15 &amp; React 19</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
