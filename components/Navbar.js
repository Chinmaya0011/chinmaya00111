"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X, Terminal, FileDown, Github, Linkedin } from "lucide-react";
import ResumeModal from "./ResumeModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["about", "terminal", "expertise", "projects", "research", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Terminal", href: "#terminal", id: "terminal" },
    { label: "Expertise", href: "#expertise", id: "expertise" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Research", href: "#research", id: "research" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand: chinmaya00111 */}
          <a
            href="/"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#05090E]/85 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/40 transition-all group"
            title="chinmaya00111 - Homepage"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Shield className="w-3 h-3" />
            </div>
            <span className="font-mono text-xs font-bold text-white tracking-wider group-hover:text-emerald-400 transition-colors">
              chinmaya00111
            </span>
          </a>

          {/* Desktop Floating Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#05090E]/85 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-mono tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Pod */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Social Media Links */}
            <div className="flex items-center gap-1.5 border-r border-white/[0.08] pr-2.5 mr-0.5">
              <a
                href="https://github.com/chinmaya0011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#05090E]/80 hover:bg-[#0E1724] border border-white/[0.08] hover:border-emerald-500/40 text-slate-400 hover:text-white transition-all backdrop-blur-xl"
                aria-label="GitHub Profile"
                title="GitHub: chinmaya0011"
              >
                <Github className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/chinmaya00111/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#05090E]/80 hover:bg-[#0E1724] border border-white/[0.08] hover:border-emerald-500/40 text-slate-400 hover:text-cyan-400 transition-all backdrop-blur-xl"
                aria-label="LinkedIn Profile"
                title="LinkedIn: chinmaya00111"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#05090E]/80 border border-white/[0.08] hover:border-emerald-500/30 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-xl transition-all flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>CV.pdf</span>
            </button>

            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#03070A] font-semibold text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[#05090E]/90 border border-white/[0.08] text-slate-300 hover:text-white backdrop-blur-xl"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 max-w-6xl mx-auto p-5 rounded-2xl bg-[#060C14]/95 border border-white/[0.1] backdrop-blur-2xl shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-600">//</span>
                </a>
              ))}
              
              {/* Mobile Socials */}
              <div className="pt-3 mt-1 border-t border-white/[0.06] flex items-center justify-between px-2">
                <span className="text-[10px] text-slate-500 font-mono">SOCIALS:</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/chinmaya0011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400"
                  >
                    <Github className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/chinmaya00111/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 mt-1 border-t border-white/[0.06] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0B1420] border border-white/[0.08] text-slate-200 text-xs font-mono flex items-center justify-center gap-2 hover:border-emerald-500/40"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download CV.pdf</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-[#03070A] font-semibold text-xs font-mono text-center"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Resume Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
}
