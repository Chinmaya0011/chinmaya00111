"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  X, 
  Terminal, 
  FolderGit2, 
  FileDown, 
  Mail, 
  Github, 
  Linkedin, 
  ArrowRight,
  ShieldCheck,
  User,
  Layers,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function CommandPalette({ isOpen, onClose, onOpenResume }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const actions = [
    {
      id: "projects",
      name: "Explore Featured Engineering Projects",
      category: "Navigation",
      icon: FolderGit2,
      run: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "terminal-scan",
      name: "Run Security SAST Scan in Terminal",
      category: "Interactive",
      icon: Terminal,
      run: () => {
        document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "resume",
      name: "Download Resume (Full-Stack & AppSec)",
      category: "Recruitment",
      icon: FileDown,
      run: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      }
    },
    {
      id: "skills",
      name: "View Technical Capabilities & Stack",
      category: "Navigation",
      icon: Layers,
      run: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "appsec",
      name: "Explore Application Security Capabilities",
      category: "Security",
      icon: ShieldCheck,
      run: () => {
        document.getElementById("appsec")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "research",
      name: "Read Security Vulnerability Deep-Dives",
      category: "Research",
      icon: ShieldCheck,
      run: () => {
        document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "experience",
      name: "View Work History & Roadmap",
      category: "Experience",
      icon: Briefcase,
      run: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "credentials",
      name: "View Academic Background & Certifications",
      category: "Academics",
      icon: GraduationCap,
      run: () => {
        document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "about",
      name: "About Philosophy & Engineering Pillars",
      category: "Navigation",
      icon: User,
      run: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "email",
      name: "Copy Direct Email Address",
      category: "Contact",
      icon: Mail,
      run: () => {
        navigator.clipboard.writeText(personalInfo.email);
        onClose();
      }
    },
    {
      id: "github",
      name: "Open GitHub Profile (@chinmaya0011)",
      category: "External",
      icon: Github,
      run: () => {
        window.open(personalInfo.links.github, "_blank", "noopener,noreferrer");
        onClose();
      }
    },
    {
      id: "linkedin",
      name: "Connect on LinkedIn",
      category: "External",
      icon: Linkedin,
      run: () => {
        window.open(personalInfo.links.linkedin, "_blank", "noopener,noreferrer");
        onClose();
      }
    }
  ];

  const filtered = actions.filter((act) => 
    act.name.toLowerCase().includes(search.toLowerCase()) ||
    act.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].run();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white border border-[#E7E5E0] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E7E5E0] gap-3 bg-white">
          <Search className="w-4 h-4 text-[#365CF5] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search sections, projects, or commands..."
            className="w-full bg-transparent border-none text-[#171717] text-sm focus:outline-none placeholder-[#888888] font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#FAF9F6] text-[#666666] hover:text-[#171717] border border-[#E7E5E0] transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1 bg-white">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#666666]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={action.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-xs font-mono ${
                    isSelected
                      ? "bg-[#365CF5]/10 text-[#365CF5] border border-[#365CF5]/25"
                      : "text-[#171717] hover:bg-[#FAF9F6] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#365CF5]" : "text-[#666666]"}`} />
                    <span className="font-semibold">{action.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#666666] uppercase tracking-wider">
                      {action.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-[#365CF5]" : "text-[#CCCCCC]"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#FAF9F6] border-t border-[#E7E5E0] flex items-center justify-between text-[10px] font-mono text-[#666666]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#365CF5] font-semibold">Chinmaya Kumar Mishra</span>
        </div>
      </div>
    </div>
  );
}
