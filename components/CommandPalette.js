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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Layers,
  Briefcase
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
      name: "Explore Featured Projects",
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
        document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "research",
      name: "Read Security Vulnerability Research",
      category: "Navigation",
      icon: ShieldCheck,
      run: () => {
        document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "experience",
      name: "View Work Experience & Roles",
      category: "Navigation",
      icon: Briefcase,
      run: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "about",
      name: "About Philosophy & Story",
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
      name: "Open GitHub Profile",
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-[#0E0E11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands, sections, or actions..."
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-zinc-500 font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded bg-white/[0.04] text-zinc-400 hover:text-white transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-zinc-500">
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
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "text-zinc-300 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-zinc-400"}`} />
                    <span className="font-medium text-white">{action.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {action.category}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${isSelected ? "text-emerald-400" : "text-zinc-600"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-emerald-400 font-semibold">chinmaya00111</span>
        </div>
      </div>
    </div>
  );
}

