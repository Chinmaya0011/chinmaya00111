"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, Github, Linkedin, Search, Mail, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { buttonMotionProps } from "@/lib/motion";

const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

export default function Navbar() {
  const pathname = usePathname() || "/";
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          if (window.scrollY < 200) setActiveSection("home");
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Zero-reflow IntersectionObserver for active section tracking
    const sections = ["about", "expertise", "services", "projects", "terminal", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Expertise", href: "#expertise", id: "expertise" },
    { label: "Services", href: "/services", id: "services" },
    { label: "Work", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Blog", href: "/blogs", id: "blogs" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 px-4 sm:px-6 ${
          scrolled
            ? "bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E5E0] shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">

          {/* Brand: Portrait Avatar + Chinmaya Kumar Mishra */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#3B5BFF] rounded-lg p-0.5"
            title="Chinmaya Kumar Mishra - Homepage"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E7E5E0] shadow-xs group-hover:scale-105 group-hover:border-[#3B5BFF]/60 transition-all flex-shrink-0 bg-[#FAF9F6]">
              <img
                src="/chinmaya.png"
                alt="Chinmaya Kumar Mishra"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold text-[#171717] tracking-tight group-hover:text-[#3B5BFF] transition-colors leading-tight">
                Chinmaya Kumar Mishra
              </span>
              <span className="font-mono text-[10px] text-[#666666] tracking-wider uppercase">
                AI AppSec · Full-Stack
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#E7E5E0] shadow-xs">
            {navLinks.map((link) => {
              const isExternalOrPath = link.href.startsWith("/");
              const resolvedHref = !isExternalOrPath && pathname !== "/" ? `/${link.href}` : link.href;
              const isActive =
                (link.id === "blogs" && pathname.startsWith("/blogs")) ||
                (link.id === "services" && pathname.startsWith("/services")) ||
                (pathname === "/" && activeSection === link.id);

              return (
                <a
                  key={link.href}
                  href={resolvedHref}
                  className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-[#3B5BFF] font-semibold"
                      : "text-[#666666] hover:text-[#171717]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="editorial-nav-pill"
                      className="absolute inset-0 rounded-full bg-[#3B5BFF]/10 border border-[#3B5BFF]/25 -z-10"
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
            <motion.button
              {...buttonMotionProps}
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-xs font-mono text-[#666666] hover:text-[#171717] transition-all shadow-xs"
              title="Search commands and sections (⌘K or Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#3B5BFF]" />
              <span className="text-[10px] text-[#666666] font-medium bg-[#F3F2EE] px-1 py-0.5 rounded">⌘K</span>
            </motion.button>

            {/* Social Links */}
            <div className="flex items-center gap-1 border-r border-[#E7E5E0] pr-2 mr-0.5">
              <motion.a
                {...buttonMotionProps}
                href="https://github.com/chinmaya0011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#171717] transition-all shadow-xs"
                aria-label="GitHub Profile"
                title="GitHub: chinmaya0011"
              >
                <Github className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                {...buttonMotionProps}
                href="https://www.linkedin.com/in/chinmaya00111/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F3F2EE] border border-[#E7E5E0] text-[#666666] hover:text-[#3B5BFF] transition-all shadow-xs"
                aria-label="LinkedIn Profile"
                title="LinkedIn: chinmaya00111"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Resume Button */}
            <motion.button
              {...buttonMotionProps}
              onClick={() => setResumeModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/40 text-[#171717] hover:text-[#3B5BFF] text-xs font-mono font-medium transition-colors shadow-xs flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-[#3B5BFF]" />
              <span>Resume</span>
            </motion.button>

            {/* Contact / Inquire CTA */}
            <motion.a
              {...buttonMotionProps}
              href={pathname === "/services" ? "#inquiry" : "/#contact"}
              className="px-3.5 py-1.5 rounded-lg bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white text-xs font-mono font-medium transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>{pathname === "/services" ? "Inquire" : "Contact"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#666666] hover:text-[#171717] shadow-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#3B5BFF]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#171717] shadow-xs"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#3B5BFF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden absolute top-full left-0 right-0 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E5E0] shadow-xl px-4 py-4"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isExternalOrPath = link.href.startsWith("/");
                  const resolvedHref = !isExternalOrPath && pathname !== "/" ? `/${link.href}` : link.href;
                  const isActive =
                    (link.id === "blogs" && pathname.startsWith("/blogs")) ||
                    (link.id === "services" && pathname.startsWith("/services")) ||
                    (pathname === "/" && activeSection === link.id);

                  return (
                    <a
                      key={link.href}
                      href={resolvedHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-white text-[#3B5BFF] font-semibold border border-[#3B5BFF]/30 shadow-xs"
                          : "text-[#171717] hover:bg-white hover:text-[#3B5BFF]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-[#3B5BFF]">→</span>
                    </a>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-[#E7E5E0] flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
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
                        className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#3B5BFF]"
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
                      className="px-3 py-2 rounded-lg bg-white border border-[#E7E5E0] text-[#171717] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#3B5BFF]" />
                      <span>Resume</span>
                    </button>
                  </div>

                  <a
                    href={pathname === "/services" ? "#inquiry" : "/#contact"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-lg bg-[#3B5BFF] text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{pathname === "/services" ? "Start a Project" : "Get in Touch"}</span>
                  </a>
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
