"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, RotateCcw, Command } from "lucide-react";

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
drwxr-xr-x 6 chinmay chinmay 4096 Nov 09 23:30 .
drwxr-xr-x 3 chinmay chinmay 4096 Nov 09 20:10 ..
-rw-r--r-- 1 chinmay chinmay  148 Nov 09 21:04 interests.txt
drwxr-xr-x 4 chinmay chinmay 4096 Nov 09 22:30 mern-projects
drwxr-xr-x 3 chinmay chinmay 4096 Nov 09 23:00 security-labs`,
    "cat interests.txt": `Full-Stack Development
Application Security
API Security
Linux`,
    "semgrep --version": "semgrep 1.98.0",
    help: `Available commands:
  whoami             - Display current session user
  uname -a           - Show kernel and system architecture
  pwd                - Print current working directory
  ls -la             - List detailed directory permissions
  cat interests.txt  - View engineering interests
  semgrep --version  - Check static analysis tool version
  clear              - Clear terminal display buffer
  help               - List available commands`
  };

  const defaultHistory = [
    { cmd: "whoami", output: "chinmay" },
    { cmd: "uname -a", output: "Linux developer 6.8.0 x86_64 GNU/Linux" },
    { cmd: "pwd", output: "/home/chinmay/projects" },
    { cmd: "ls -la", output: `total 24\ndrwxr-xr-x 6 chinmay chinmay 4096 Nov 09 23:30 .\ndrwxr-xr-x 3 chinmay chinmay 4096 Nov 09 20:10 ..\n-rw-r--r-- 1 chinmay chinmay  148 Nov 09 21:04 interests.txt\ndrwxr-xr-x 4 chinmay chinmay 4096 Nov 09 22:30 mern-projects\ndrwxr-xr-x 3 chinmay chinmay 4096 Nov 09 23:00 security-labs` },
    { cmd: "cat interests.txt", output: "Full-Stack Development\nApplication Security\nAPI Security\nLinux" },
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

    const output = commandDatabase[trimmed] || commandDatabase[trimmed.toLowerCase()] || 
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
    "cat interests.txt",
    "semgrep --version",
    "help",
    "clear"
  ];

  return (
    <section id="terminal" className="py-20 md:py-24 relative border-t border-white/[0.06] bg-[#04080D]/70">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TERMINAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Interactive Linux Terminal
            </h2>
          </div>

          <button
            onClick={resetTerminal}
            className="px-2.5 py-1 rounded bg-[#0D1824] hover:bg-[#142332] border border-white/[0.06] text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
            title="Reset terminal session"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>RESET</span>
          </button>
        </div>

        {/* Terminal Window Card */}
        <div className="rounded-2xl bg-[#060B12] border border-white/[0.09] shadow-2xl overflow-hidden backdrop-blur-xl glow-card">
          
          {/* Header Bar */}
          <div className="px-4 py-2.5 bg-[#081018] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                chinmay@appsec-workstation:~/projects (bash)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">BASH</span>
          </div>

          {/* Presets Bar */}
          <div className="px-3.5 py-2 bg-[#05090F] border-b border-white/[0.04] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
            {presetPills.map((preset) => (
              <button
                key={preset}
                onClick={() => executeCommand(preset)}
                className="px-2 py-0.5 rounded bg-[#0A121A] hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 border border-white/[0.06] hover:border-emerald-500/30 transition-all shrink-0 text-[11px]"
              >
                $ {preset}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs sm:text-sm min-h-[300px] max-h-[420px] overflow-y-auto space-y-3 cursor-text bg-[#04080D]/95"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1 group">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-emerald-400 font-semibold">chinmay@appsec-workstation:~/projects$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.cmd, idx);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-slate-300 transition-opacity"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="pl-3 border-l border-emerald-500/30 text-slate-300 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Prompt Form */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-semibold shrink-0">chinmay@appsec-workstation:~/projects$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type a command (e.g. whoami, ls -la, help)..."
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-600 caret-emerald-400"
                  autoFocus
                />
                <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-0.5" />
              </div>
            </form>

            <div ref={terminalEndRef} />
          </div>

        </div>

      </div>
    </section>
  );
}
