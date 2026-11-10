"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, RotateCcw } from "lucide-react";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

export default function InteractiveTerminal() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const commandDatabase = {
    whoami: "chinmay",
    "uname -a": "Linux developer 6.8.0 x86_64 GNU/Linux",
    pwd: "/home/chinmay/projects",
    "ls -la": `total 24
drwxr-xr-x 6 chinmay chinmay 4096 Nov 10 10:00 .
drwxr-xr-x 3 chinmay chinmay 4096 Nov 10 09:10 ..
-rw-r--r-- 1 chinmay chinmay  164 Nov 10 09:20 stack.txt
drwxr-xr-x 4 chinmay chinmay 4096 Nov 10 09:30 security-tools
drwxr-xr-x 3 chinmay chinmay 4096 Nov 10 09:45 mern-apps`,
    "cat stack.txt": `Full-Stack Development (React, Next.js, Node.js, MongoDB)
Application Security & Secure Code Review
API Security & OAuth 2.0 Integrations
Semgrep & Automated Pipeline Scanning`,
    "cat interests.txt": `Full-Stack Development (React, Next.js, Node.js, MongoDB)
Application Security & Secure Code Review
API Security & OAuth 2.0 Integrations
Semgrep & Automated Pipeline Scanning`,
    "semgrep --version": "semgrep 1.98.0 (rules: owasp-top-ten, r2c-security-audit)",
    help: `Available commands:
  whoami             - Display current user
  uname -a           - Show kernel and system architecture
  pwd                - Print working directory
  ls -la             - List files and permissions
  cat stack.txt      - View technical stack and security focus
  semgrep --version  - Check static analysis tool version
  clear              - Clear terminal output
  help               - List available commands`
  };

  const defaultHistory = [
    { cmd: "whoami", output: "chinmay" },
    { cmd: "uname -a", output: "Linux developer 6.8.0 x86_64 GNU/Linux" },
    { cmd: "cat stack.txt", output: "Full-Stack Development (React, Next.js, Node.js, MongoDB)\nApplication Security & Secure Code Review\nAPI Security & OAuth 2.0 Integrations\nSemgrep & Automated Pipeline Scanning" },
    { cmd: "semgrep --version", output: "semgrep 1.98.0 (rules: owasp-top-ten, r2c-security-audit)" }
  ];

  const [history, setHistory] = useState(defaultHistory);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
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
    "whoami",
    "uname -a",
    "pwd",
    "ls -la",
    "cat stack.txt",
    "semgrep --version",
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

            <div ref={terminalEndRef} />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
