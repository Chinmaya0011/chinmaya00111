"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, RotateCcw, ShieldCheck, Play, Sparkles } from "lucide-react";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

function TerminalOutputRenderer({ output }) {
  const lines = output.split("\n");

  return (
    <div className="pl-3 sm:pl-4 space-y-1 font-mono text-[11px] sm:text-xs leading-relaxed">
      {lines.map((line, idx) => {
        // Semgrep Scan checkmarks
        if (line.startsWith("[✓]")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 text-emerald-400">
              <span className="font-bold shrink-0">[✓]</span>
              <span className="text-zinc-200">{line.slice(3)}</span>
            </div>
          );
        }
        // Operations / Initializations
        if (line.startsWith("[+]")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 text-cyan-400">
              <span className="font-bold shrink-0">[+]</span>
              <span className="text-zinc-300">{line.slice(3)}</span>
            </div>
          );
        }
        // Vulnerabilities / Warnings
        if (
          line.startsWith("[!]") ||
          line.startsWith("[FLAW]") ||
          line.startsWith("[VULNERABILITY]") ||
          line.startsWith("[RISK]")
        ) {
          return (
            <div key={idx} className="flex items-start gap-1.5 text-rose-400 font-medium">
              <span className="font-bold shrink-0">⚠</span>
              <span className="text-rose-300">{line}</span>
            </div>
          );
        }
        // CTF Challenge Header
        if (line.startsWith("[CHALLENGE]")) {
          return (
            <div key={idx} className="text-amber-300 font-bold pt-1">
              {line}
            </div>
          );
        }
        // CTF Remediation / Fix
        if (line.startsWith("[REMEDIATION]") || line.startsWith("[FIX]")) {
          return (
            <div key={idx} className="text-emerald-300 font-semibold pt-1">
              {line}
            </div>
          );
        }
        // Final Scan Result Callout
        if (line.startsWith("[RESULT]")) {
          return (
            <div key={idx} className="p-2 sm:p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold my-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{line.slice(8)}</span>
            </div>
          );
        }
        // Dividers / Section Headers
        if (line.includes("━━━━━")) {
          return (
            <div key={idx} className="text-white/10 select-none text-[10px]">
              {line}
            </div>
          );
        }
        if (
          line.startsWith("PROFILE //") ||
          line.startsWith("ENGINEERING STACK:") ||
          line.startsWith("SHIPPED PRODUCTION PLATFORMS:") ||
          line.startsWith("RECRUITMENT & DIRECT CONTACT CHANNELS:") ||
          line.startsWith("Available Commands:")
        ) {
          return (
            <div key={idx} className="text-emerald-400 font-bold tracking-wider pt-1">
              {line}
            </div>
          );
        }
        // Standard Output Line
        return (
          <div key={idx} className="text-zinc-300">
            {line}
          </div>
        );
      })}
    </div>
  );
}

export default function InteractiveTerminal() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const commandDatabase = {
    welcome: `Chinmaya OS v2.4 (Security & Full-Stack Workstation)
Type 'help' or click presets below to run security scans, query the stack, or inspect architecture.`,

    profile: `PROFILE // CHINMAYA KUMAR MISHRA (@chinmaya00111)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role:         Full-Stack Developer · Application Security Specialist
Experience:   4+ Years building production MERN & Next.js systems
Current:      Full-Stack Developer at Secure Code LLC (Texas, USA - Remote)
Stack:        React 19, Next.js 15, Node.js, Express, MongoDB, Semgrep SAST
Mission:      "Software fails where assumptions live. I engineer systems to eliminate both."
Availability: Open for Full-Time Full-Stack & AppSec Engineering roles.`,

    scan: `[+] Initializing Semgrep AST Static Analysis Engine v1.98.0...
[+] Loading security rulesets: [owasp-top-10, api-security, jwt-authz, r2c-audit]
[✓] Auditing authorization middleware..... PASSED (Strict tenant claim enforcement)
[✓] Inspecting database write queries..... PASSED (Atomic findOneAndUpdate operations)
[✓] Checking input sanitization boundaries PASSED (Zero SQL/NoSQL injection sinks)
[✓] Validating CORS & Security Headers.... PASSED (CSP, HSTS, frame-ancestors: 'none')
[✓] Reviewing LLM & Vector retrieval..... PASSED (Tenant pre-filtering in vector query)
[RESULT] 0 Vulnerabilities Detected. Repository posture: HARDENED (Grade A+).`,

    stack: `ENGINEERING STACK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend   │ React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
Backend    │ Node.js, Express.js, RESTful APIs, WebSockets, OAuth 2.0, GitHub Apps
Database   │ MongoDB, Mongoose, Atomic Transactions, Compound Indexing, Aggregations
Security   │ OWASP Top 10, API Security (BOLA/IDOR), Secure Code Review, Semgrep SAST
Tooling    │ Burp Suite, OWASP ZAP, Nmap, Postman, Git CLI, Linux Server Hardening
AI Systems │ OpenAI & Gemini APIs, Vector Retrieval (RAG), Prompt Injection Defense`,

    projects: `SHIPPED PRODUCTION PLATFORMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] GitHub Security Scanner
    Type:   Multi-Tenant Automated SAST & Vulnerability Triage Platform
    Stack:  Next.js 15, Node.js, Express, MongoDB, Semgrep SAST, OAuth 2.0
    Impact: Automated vulnerability detection across repos via GitHub App webhooks.

[2] AI GitHub Repository Assistant
    Type:   Context-Aware Codebase Intelligence & RAG Exploration Engine
    Stack:  Next.js, Node.js, Express, MongoDB, OpenAI API, RAG Vector Search
    Impact: Accelerated codebase comprehension with prompt injection defense.

[3] BookSaathi SaaS
    Type:   Real-Time Practice Management & Appointment Automation Suite
    Stack:  Next.js, Express.js, MongoDB, Socket.io, Gemini API, Tailwind CSS
    Impact: Atomic transaction scheduling preventing double-booking race conditions.`,

    ctf: `[CHALLENGE]: Identify the security flaw in this Express endpoint:
  app.get("/api/documents/:id", verifyToken, async (req, res) => {
    const doc = await Document.findById(req.params.id);
    res.json(doc);
  });

[VULNERABILITY]: Broken Object Level Authorization (BOLA / IDOR - OWASP API1:2023)
[RISK]: Any authenticated client can exfiltrate other tenants' documents by tampering with :id.
[REMEDIATION]: Enforce tenant ownership server-side from cryptographically signed session:
  const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });`,

    hire: `RECRUITMENT & DIRECT CONTACT CHANNELS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Candidate:    Chinmaya Kumar Mishra
Role:         Full-Stack Developer · Application Security Specialist
Direct Email: imchinu17@gmail.com
Phone:        +91 7077835119
Location:     Bhubaneswar, Odisha, India (Open to Remote & Relocation)
GitHub:       https://github.com/chinmaya0011
LinkedIn:     https://www.linkedin.com/in/chinmaya00111/
Resume:       Download CV (MERN & AppSec) via navbar button or 'CV' modal
Status:       Available for Full-Time Roles & High-Impact Contracts (Fast response).`,

    help: `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  profile       - Display candidate overview, philosophy & current role
  scan          - Run simulated Semgrep SAST security audit on production API
  stack         - List full-stack engineering stack, tools & AI capabilities
  projects      - Display shipped platforms, architectural specs & impact
  ctf           - Solve an interactive code-level vulnerability review challenge
  hire          - Show direct recruitment, contact channels & availability
  clear         - Clear terminal buffer
  help          - Display this command dictionary`,

    whoami: "chinmay (Full-Stack Engineer // Application Security Specialist)",
    "uname -a": "Linux developer 6.8.0-45-generic x86_64 GNU/Linux (Hardened Kernel)",
    pwd: "/home/chinmay/workspace/production-apps",
    "cat stack.txt": `React 19, Next.js 15, Node.js, Express, MongoDB, Semgrep SAST, OWASP Top 10, OpenAI/Gemini APIs`
  };

  const defaultHistory = [
    {
      cmd: "welcome",
      output: commandDatabase.welcome
    }
  ];

  const [history, setHistory] = useState(defaultHistory);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    const output =
      commandDatabase[trimmed] ||
      commandDatabase[trimmed.toLowerCase()] ||
      `bash: command not found: '${trimmed}'. Type 'help' for available commands.`;

    setHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setInputVal("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetTerminal = () => {
    setHistory(defaultHistory);
    setInputVal("");
  };

  const presetPills = [
    { cmd: "profile", label: "profile", highlight: false },
    { cmd: "scan", label: "scan", highlight: true, dot: "bg-emerald-400" },
    { cmd: "stack", label: "stack", highlight: false },
    { cmd: "projects", label: "projects", highlight: false },
    { cmd: "ctf", label: "ctf challenge", highlight: false, dot: "bg-amber-400" },
    { cmd: "hire", label: "hire info", highlight: true, dot: "bg-cyan-400" },
    { cmd: "help", label: "help", highlight: false },
    { cmd: "clear", label: "clear", highlight: false }
  ];

  return (
    <section id="terminal" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TERMINAL // 03 // LIVE WORKSTATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              Interactive Linux Terminal
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1 max-w-xl">
              Simulated bash environment. Click preset commands or type directly to run AST security scans, inspect production stack, or review architecture.
            </p>
          </div>

          <motion.button
            {...buttonMotionProps}
            onClick={resetTerminal}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto shrink-0"
            title="Reset terminal history"
            aria-label="Reset terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Buffer</span>
          </motion.button>
        </motion.div>

        {/* Preset Command Pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mr-1">
            <Play className="w-3 h-3 text-emerald-400" />
            <span>Presets:</span>
          </div>

          {presetPills.map((pill) => (
            <motion.button
              key={pill.cmd}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => executeCommand(pill.cmd)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                pill.highlight
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-sm"
                  : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20"
              }`}
              aria-label={`Run preset command ${pill.cmd}`}
            >
              {pill.dot && <span className={`w-1.5 h-1.5 rounded-full ${pill.dot}`} />}
              <span>$ {pill.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Terminal Window Card with Glass Styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="rounded-2xl bg-white/[0.02] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs glass-card"
        >
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-zinc-400 text-xs flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>chinmay@security-workstation:~</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:flex">
              <span className="flex items-center gap-1 text-emerald-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SHELL: ONLINE</span>
              </span>
              <span>bash 5.2</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-5 max-h-[420px] overflow-y-auto space-y-4 cursor-text text-zinc-200"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-white font-semibold">{item.cmd}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.output, idx);
                    }}
                    className="p-1 rounded text-zinc-500 hover:text-emerald-400 transition-colors"
                    title="Copy command output"
                    aria-label="Copy command output"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                
                {/* Formatted Terminal Output with Semantic Highlighting */}
                <TerminalOutputRenderer output={item.output} />
              </div>
            ))}

            {/* Active Command Input Line */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-2 border-t border-white/5">
              <label htmlFor="terminal-input" className="text-emerald-400 font-bold">
                $
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'scan', 'profile', 'stack', 'ctf'..."
                className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-zinc-600 text-xs font-mono"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
            </form>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
