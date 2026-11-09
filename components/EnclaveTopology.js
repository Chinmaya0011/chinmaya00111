"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Activity, 
  Lock, 
  Cpu, 
  Server, 
  Key, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  Radio, 
  Layers, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";

export default function EnclaveTopology() {
  const nodesCatalog = [
    {
      id: "oauth",
      name: "OAuth 2.0 Auth Gate",
      category: "IDENTITY & TOKEN LIFECYCLE",
      protocol: "OAUTH 2.0 / PKCE",
      status: "VERIFIED",
      latency: "0.8ms",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      description: "Controls all incoming repository authorization handshakes. Enforces ephemeral installation access tokens with strict 1-hour TTL, mitigating long-lived PAT credential leakage risks.",
      technicalControls: [
        "Dynamic token rotation every 60 minutes",
        "Granular least-privilege scope negotiation",
        "Zero permanent access tokens cached"
      ],
      codeSample: `// Ephemeral token exchange with 1h TTL
const { token } = await authApp.getInstallationAccessToken({
  installationId,
  permissions: { contents: "read", pull_requests: "write" }
});`
    },
    {
      id: "github",
      name: "GitHub App Ingestion Engine",
      category: "SOURCE CONTROL INTEGRATION",
      protocol: "REST & GRAPHQL WEBHOOKS",
      status: "SCOPED",
      latency: "1.4ms",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      description: "Securely ingests repository trees and branches across public and private organizations. Isolates branch metadata before dispatching source trees into isolated analysis runtimes.",
      technicalControls: [
        "Cryptographic webhook payload verification",
        "Organization-level installation boundaries",
        "Branch diff isolation before scanning"
      ],
      codeSample: `// Webhook HMAC signature verification
const verified = crypto.timingSafeEqual(
  Buffer.from(signature),
  Buffer.from(hmacSHA256(payload, WEBHOOK_SECRET))
);`
    },
    {
      id: "semgrep",
      name: "Semgrep SAST Core Engine",
      category: "STATIC APPLICATION SECURITY",
      protocol: "ABSTRACT SYNTAX TREE (AST)",
      status: "ACTIVE",
      latency: "4.2ms",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      description: "The primary deterministic analysis gate. Evaluates parsed AST structures against custom OWASP Top 10 rule patterns, filtering high-confidence vulnerabilities before AI triage.",
      technicalControls: [
        "Zero probabilistic false positives on syntax flaws",
        "OWASP Top 10 ruleset (SQLi, SSRF, IDOR, XSS)",
        "Taint mode tracing from parameters to sinks"
      ],
      codeSample: `rules:
  - id: express-nosql-injection
    pattern: |
      $MODEL.findOne({ $FIELD: req.body.$PARAM })
    severity: ERROR`
    },
    {
      id: "ast",
      name: "AST Taint Analyzer",
      category: "DATA FLOW ANALYSIS",
      protocol: "SOURCE-TO-SINK GRAPH",
      status: "SCANNING",
      latency: "2.1ms",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      description: "Traces untrusted user inputs (HTTP body, query parameters, headers) through intermediate function calls and variables down to sensitive database or OS execution sinks.",
      technicalControls: [
        "Variable assignment & sanitizer tracking",
        "Contextual escaping verification",
        "Path traversal & command injection blocking"
      ],
      codeSample: `// Path traversal sink verification
const safePath = path.normalize(req.query.file);
if (!safePath.startsWith(BASE_DIR)) throw new SecurityError();`
    },
    {
      id: "llm",
      name: "LLM Triage & Remediation Engine",
      category: "AI SECURITY & RAG",
      protocol: "CONTEXT-BOUND EMBEDDINGS",
      status: "RAG READY",
      latency: "12ms",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      description: "Combines AST findings with repository contextual embeddings to triage exploitability, eliminate false positives, and formulate concrete patch diffs directly in pull requests.",
      technicalControls: [
        "AST context injection guardrails",
        "Constrained prompt templates for code fixes",
        "Strict hallucination filters on CVE citations"
      ],
      codeSample: `// Contextual remediation generation prompt
const patch = await ai.generatePatch({
  astFinding: finding.astContext,
  sourceContext: repo.getFunctionScope(finding.line),
  defenseGoal: "Sanitize parameter before DB query"
});`
    },
    {
      id: "db_guard",
      name: "Atomic DB Concurrency Guard",
      category: "STATE & CONCURRENCY DEFENSE",
      protocol: "MONGODB COMPOUND INDEXES",
      status: "ENFORCED",
      latency: "0.4ms",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      description: "Eliminates Time-of-Check to Time-of-Use (TOCTOU) race conditions in high-concurrency booking and transactional state changes using atomic database operators.",
      technicalControls: [
        "Unique compound indexes [tenantId, slotTimestamp]",
        "Single-operation findOneAndUpdate guards",
        "Zero application-level race windows"
      ],
      codeSample: `// Atomic conditional acquisition
const slot = await Slot.findOneAndUpdate(
  { _id: slotId, status: "AVAILABLE" },
  { $set: { status: "BOOKED", userId } },
  { new: true }
);`
    },
    {
      id: "webhook",
      name: "HMAC Webhook Sentry",
      category: "API & EVENT AUTHENTICATION",
      protocol: "SHA-256 TIMING-SAFE HMAC",
      status: "SIGN_OK",
      latency: "0.3ms",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      description: "Validates incoming webhook signatures from external payment gateways (Cashfree) and Git providers, rejecting forged events before queue ingestion.",
      technicalControls: [
        "Timing-safe equality comparisons",
        "Timestamp replay attack rejection (<5 min)",
        "Idempotency table preventing duplicate credits"
      ],
      codeSample: `// Timing-safe verification
const isValid = crypto.timingSafeEqual(
  Buffer.from(computedHash, "hex"),
  Buffer.from(headerSignature, "hex")
);`
    }
  ];

  const [activeNode, setActiveNode] = useState(nodesCatalog[0]);

  return (
    <section id="topology" className="py-24 md:py-32 relative border-t border-white/[0.06] bg-[#03070A]">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>TOPOLOGY // 03 // LIVE_ENCLAVE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Application Security Enclave
            </h2>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 bg-[#060C14] px-4 py-2 rounded-xl border border-white/[0.08] backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS_HEALTH: 100% NOMINAL // ALL ENCLAVES ACTIVE</span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Radar Canvas (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-3 sm:p-5 backdrop-blur-xl transition-all duration-300 shadow-2xl relative glow-card">
            
            {/* Canvas Enclosure */}
            <div className="relative rounded-2xl overflow-hidden bg-[#04080D] border border-white/[0.05]">
              <NetworkCanvas
                selectedNodeId={activeNode.id}
                onSelectNode={(node) => {
                  const found = nodesCatalog.find((n) => n.id === node.id);
                  if (found) setActiveNode(found);
                }}
              />
            </div>

            {/* Quick Node Selector Pills (Crucial for Mobile & Touch Screen Ergonomics!) */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2.5 px-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Radio className="w-3.5 h-3.5" />
                  <span>INTERACTIVE ENCLAVE SELECTOR:</span>
                </span>
                <span className="text-[10px] text-slate-500">TAP TO SWITCH TELEMETRY</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {nodesCatalog.map((node) => {
                  const isSelected = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold shadow-sm shadow-emerald-500/10"
                          : "bg-[#0A121A] text-slate-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                      <span>{node.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Real-Time Node Telemetry Inspector (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl bg-[#060C14] border border-white/[0.08] hover:border-emerald-500/35 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 shadow-2xl glow-card space-y-6"
              >
                {/* Node Inspector Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                      {activeNode.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">
                      {activeNode.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono border ${activeNode.badgeColor} shrink-0`}>
                    {activeNode.status}
                  </span>
                </div>

                {/* Protocol & Latency Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#04080D] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block">STANDARD PROTOCOL</span>
                    <span className="text-slate-200 font-semibold block mt-0.5 truncate">
                      {activeNode.protocol}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#04080D] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block">ENCLAVE LATENCY</span>
                    <span className="text-emerald-400 font-bold block mt-0.5">
                      {activeNode.latency}
                    </span>
                  </div>
                </div>

                {/* Defensive Role Description */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DEFENSIVE MECHANISM</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {activeNode.description}
                  </p>
                </div>

                {/* Architectural Security Controls */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ENFORCED SECURITY CONTROLS</span>
                  </span>
                  {activeNode.technicalControls.map((ctrl, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{ctrl}</span>
                    </div>
                  ))}
                </div>

                {/* Real Code Sample Snippet */}
                <div className="rounded-xl bg-[#04080E] border border-white/[0.05] p-3.5 overflow-hidden font-mono">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 mb-2 border-b border-white/[0.04]">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Code2 className="w-3 h-3 text-emerald-400" />
                      <span>AUDIT_SPEC_SNIPPET</span>
                    </span>
                    <span>READ_ONLY</span>
                  </div>
                  <pre className="text-[11px] text-emerald-400/90 overflow-x-auto leading-relaxed">
                    <code>{activeNode.codeSample}</code>
                  </pre>
                </div>

                {/* Footer Signature */}
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/[0.05]">
                  <span>NODE_ID: {activeNode.id.toUpperCase()}</span>
                  <span className="text-emerald-400/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ENCLAVE GUARD ACTIVE
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

