"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, RotateCcw } from "lucide-react";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

export default function InteractiveTerminal() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const commandDatabase = {
    whoami: "chinmay (Full-Stack Engineer // Application Security Specialist)",
    profile: `Candidate: Chinmaya Kumar Mishra (@chinmaya00111)
Domain: MERN Stack (React, Next.js, Node.js, Express, MongoDB) & Application Security
Philosophy: "Software fails where assumptions live. I engineer systems to eliminate both."
Experience: 4+ Years production full-stack engineering, 20+ client deployments.
Current Role: Full-Stack Developer at Secure Code LLC (GitHub Apps & SAST pipeline integrations).`,
    "uname -a": "Linux developer 6.8.0-45-generic x86_64 GNU/Linux (Hardened Kernel)",
    pwd: "/home/chinmay/workspace/production-apps",
    "ls -la": `total 32
drwxr-xr-x 7 chinmay chinmay 4096 Nov 10 19:30 .
drwxr-xr-x 4 chinmay chinmay 4096 Nov 10 09:10 ..
-rw-r--r-- 1 chinmay chinmay  220 Nov 10 19:25 stack.txt
drwxr-xr-x 5 chinmay chinmay 4096 Nov 10 18:30 github-security-scanner
drwxr-xr-x 4 chinmay chinmay 4096 Nov 10 18:45 ai-github-assistant
drwxr-xr-x 6 chinmay chinmay 4096 Nov 10 19:00 booksaathi-saas
-rw-r--r-- 1 chinmay chinmay  512 Nov 10 19:20 security-rules.semgrep`,
    stack: `ENGINEERING STACK:
- Frontend:  React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- Backend:   Node.js, Express.js, RESTful APIs, WebSockets, OAuth 2.0, GitHub Apps
- Database:  MongoDB, Mongoose, Atomic Operations, Compound Indexing, Aggregations
- Security:  OWASP Top 10, API Security (BOLA/IDOR), Secure Code Review, Semgrep SAST
- AI / RAG:  OpenAI & Gemini APIs, Vector Retrieval, Prompt Injection Guardrails`,
    "cat stack.txt": `ENGINEERING STACK:
- Frontend:  React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- Backend:   Node.js, Express.js, RESTful APIs, WebSockets, OAuth 2.0, GitHub Apps
- Database:  MongoDB, Mongoose, Atomic Operations, Compound Indexing, Aggregations
- Security:  OWASP Top 10, API Security (BOLA/IDOR), Secure Code Review, Semgrep SAST
- AI / RAG:  OpenAI & Gemini APIs, Vector Retrieval, Prompt Injection Guardrails`,
    scan: `[+] Initializing Semgrep rule engine (owasp-top-ten, r2c-security-audit)...
[✓] Auditing authorization middleware...... PASSED (JWT tenant boundary enforced)
[✓] Inspecting DB write queries............ PASSED (Atomic findOneAndUpdate)
[✓] Validating client parameters........... PASSED (Parameterized zero-injection)
[✓] Checking CORS & security headers....... PASSED (Strict CSP, HSTS, frame-ancestors 'none')
[RESULT] 0 High/Critical vulnerabilities found. Target hardened.`,
    projects: `SHIPPED PRODUCTION PLATFORMS:
[1] GitHub Security Scanner (Next.js 15, Semgrep SAST, OAuth 2.0, Express)
    → Multi-tenant automated vulnerability triage platform
[2] AI GitHub Repository Assistant (Next.js, OpenAI, RAG Vector Search)
    → Context-aware codebase intelligence with prompt injection guardrails
[3] BookSaathi SaaS (Next.js, Express, MongoDB, Socket.io, Gemini API)
    → Atomic transaction scheduling & practice management platform`,
    ctf: `[MINI-CTF CHALLENGE]: Identify the vulnerability in this endpoint:
  app.get("/api/invoice", async (req, res) => {
    const doc = await Invoice.findById(req.query.id);
    res.json(doc);
  });
[FLAW]: Broken Object Level Authorization (BOLA / IDOR).
[RISK]: Any authenticated client can exfiltrate other tenants' invoices by guessing IDs.
[FIX]:  Bind query to verified session claim: Invoice.findOne({ _id: req.query.id, tenantId: req.user.tenantId })`,
    hire: `RECRUITMENT & DIRECT CONTACT CHANNELS:
- Candidate: Chinmaya Kumar Mishra
- Role: Full-Stack Developer · Application Security Specialist
- Email: imchinu17@gmail.com
- Direct Phone: +91 7077835119
- LinkedIn: https://www.linkedin.com/in/chinmaya00111/
- GitHub: https://github.com/chinmaya0011
- Availability: Actively open to Full-Time & High-Impact Contract roles.`,
    "semgrep --version": "semgrep 1.98.0 (rules: owasp-top-ten, r2c-security-audit, nodejs-jwt-authz)",
    help: `Available commands:
  profile       - Display core bio, credentials & security philosophy
  scan          - Run simulated AST static code analysis on mock endpoint
  stack         - Print active full-stack & AppSec engineering stack
  projects      - List shipped production platforms and architecture specs
  ctf           - Play an interactive 1-question mini security code audit
  hire          - Direct contact & hiring channels
  whoami        - Display current user identity
  uname -a      - Show kernel and system architecture
  pwd           - Print working directory
  ls -la        - List files and permissions
  clear         - Clear terminal output
  help          - List available commands`
  };

  const defaultHistory = [
    { cmd: "whoami", output: "chinmay" },
    { cmd: "uname -a", output: "Linux developer 6.8.0 x86_64 GNU/Linux" },
    { cmd: "cat stack.txt", output: "Full-Stack Development (React, Next.js, Node.js, MongoDB)\nApplication Security & Secure Code Review\nAPI Security & OAuth 2.0 Integrations\nSemgrep & Automated Pipeline Scanning" },
    { cmd: "semgrep --version", output: "semgrep 1.98.0 (rules: owasp-top-ten, r2c-security-audit)" }
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
      `bash: command not found: ${trimmed}. Type 'help' for available commands.`;

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
    "profile",
    "scan",
    "stack",
    "projects",
    "ctf",
    "hire",
    "help",
    "clear"
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
          className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TERMINAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Interactive Linux Terminal
            </h2>
          </div>

          <motion.button
            {...buttonMotionProps}
            onClick={resetTerminal}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            title="Reset terminal history"
            aria-label="Reset terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </motion.button>
        </motion.div>

        {/* Preset Command Pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-1.5 mb-5"
        >
          <span className="text-[11px] font-mono text-zinc-500 mr-1 hidden sm:inline">Presets:</span>
          {presetPills.map((cmd) => (
            <motion.button
              key={cmd}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-[11px] font-mono text-zinc-300 hover:text-emerald-400 transition-colors"
              aria-label={`Run preset command ${cmd}`}
            >
              $ {cmd}
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
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
              bash 5.2
            </span>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-5 max-h-[380px] overflow-y-auto space-y-3 cursor-text text-zinc-200"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
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
                <pre className="text-zinc-400 pl-4 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Active Command Input Line */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-1">
              <label htmlFor="terminal-input" className="text-emerald-400 font-bold">
                $
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or command..."
                className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-zinc-600 text-xs"
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
