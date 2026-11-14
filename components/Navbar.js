"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, Github, Linkedin, Search } from "lucide-react";
import ResumeModal from "./ResumeModal";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "appsec", "projects", "research", "experience", "contact"];
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "AppSec", href: "#appsec", id: "appsec" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Research", href: "#research", id: "research" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3.5 px-4 sm:px-6 ${
          scrolled 
            ? "bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E5E0] shadow-sm" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand: CM Monogram + Chinmaya Kumar Mishra */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            title="Chinmaya Kumar Mishra - Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-[#171717] flex items-center justify-center text-white font-mono text-xs font-bold tracking-tight shadow-sm group-hover:scale-105 transition-transform">
              <span>C<span className="text-[#365CF5]">M</span></span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold text-[#171717] tracking-tight group-hover:text-[#365CF5] transition-colors leading-tight">
                Chinmaya Kumar Mishra
              </span>
              <span className="font-mono text-[10px] text-[#666666] tracking-wider uppercase">
                Full-Stack · AppSec
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#E7E5E0] shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-[#365CF5] font-semibold"
                      : "text-[#666666] hover:text-[#171717]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="editorial-nav-pill"
                      className="absolute inset-0 rounded-full bg-[#365CF5]/10 border border-[#365CF5]/20 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Pod */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Command Palette Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E5E0] hover:border-[#365CF5]/40 text-xs font-mono text-[#666666] hover:text-[#171717] transition-all shadow-sm"
              title="Search commands and sections (⌘K or Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#365CF5]" />
              <span className="text-[10px] text-[#666666] font-medium bg-[#F3F2EE] px-1 py-0.5 rounded">⌘K</span>
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-1 border-r border-[#E7E5E0] pr-2 mr-0.5">
              <a
                href="https://github.com/chinmaya0011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] transition-all shadow-sm"
                aria-label="GitHub Profile"
                title="GitHub: chinmaya0011"
              >
                <Github className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/chinmaya00111/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#365CF5] transition-all shadow-sm"
                aria-label="LinkedIn Profile"
                title="LinkedIn: chinmaya00111"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Download CV */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#171717] hover:bg-[#365CF5] text-white text-xs font-mono font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#666666] hover:text-[#171717] shadow-sm"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#365CF5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#171717] shadow-sm"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="sm:hidden absolute top-full left-0 right-0 bg-[#FAF9F6] border-b border-[#E7E5E0] shadow-xl px-4 py-4"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-mono text-[#171717] hover:bg-white hover:text-[#365CF5] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#365CF5]">→</span>
                  </a>
                ))}

                <div className="pt-3 mt-2 border-t border-[#E7E5E0] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/chinmaya0011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#666666]"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chinmaya00111/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#365CF5]"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setResumeModalOpen(true);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#171717] text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Quick Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
    </>
  );
}
