"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function NetworkCanvas({ onSelectNode, selectedNodeId }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Strategic AppSec Enclave Nodes
  const baseNodes = [
    { 
      id: "oauth", 
      label: "OAuth 2.0 Gate", 
      shortLabel: "OAuth Gate",
      desktop: { relX: 0.18, relY: 0.28 },
      mobile: { relX: 0.22, relY: 0.20 },
      type: "auth", 
      status: "VERIFIED",
      color: "#10B981",
      latency: "0.8ms",
      desc: "Least-privilege token exchange with 1-hour TTL & automated rotation."
    },
    { 
      id: "github", 
      label: "GitHub App Ingestion", 
      shortLabel: "GitHub App",
      desktop: { relX: 0.50, relY: 0.16 },
      mobile: { relX: 0.72, relY: 0.18 },
      type: "integration", 
      status: "SCOPED",
      color: "#34D399",
      latency: "1.4ms",
      desc: "Granular repository-level scoping via authenticated webhooks."
    },
    { 
      id: "semgrep", 
      label: "Semgrep SAST Core", 
      shortLabel: "Semgrep SAST",
      desktop: { relX: 0.82, relY: 0.30 },
      mobile: { relX: 0.78, relY: 0.40 },
      type: "engine", 
      status: "ACTIVE",
      color: "#06B6D4",
      latency: "4.2ms",
      desc: "Deterministic pattern-matching against OWASP Top 10 rulesets."
    },
    { 
      id: "ast", 
      label: "AST Taint Analyzer", 
      shortLabel: "AST Tracer",
      desktop: { relX: 0.32, relY: 0.54 },
      mobile: { relX: 0.24, relY: 0.45 },
      type: "engine", 
      status: "SCANNING",
      color: "#38BDF8",
      latency: "2.1ms",
      desc: "Data-flow tracing from untrusted HTTP inputs to database sinks."
    },
    { 
      id: "llm", 
      label: "LLM Triage Engine", 
      shortLabel: "AI Triage",
      desktop: { relX: 0.68, relY: 0.60 },
      mobile: { relX: 0.74, relY: 0.66 },
      type: "ai", 
      status: "RAG READY",
      color: "#A78BFA",
      latency: "12ms",
      desc: "Context-bound LLM embeddings generating verified remediation code."
    },
    { 
      id: "db_guard", 
      label: "Atomic DB Guard", 
      shortLabel: "DB Guard",
      desktop: { relX: 0.20, relY: 0.82 },
      mobile: { relX: 0.26, relY: 0.82 },
      type: "defense", 
      status: "ENFORCED",
      color: "#10B981",
      latency: "0.4ms",
      desc: "Compound indexes & atomic operators eliminating TOCTOU race conditions."
    },
    { 
      id: "webhook", 
      label: "HMAC Webhook Sentry", 
      shortLabel: "HMAC Sentry",
      desktop: { relX: 0.80, relY: 0.84 },
      mobile: { relX: 0.75, relY: 0.86 },
      type: "defense", 
      status: "SIGN_OK",
      color: "#059669",
      latency: "0.3ms",
      desc: "Cryptographic SHA-256 signature verification on incoming payloads."
    },
  ];

  const links = [
    [0, 1], // OAuth -> GitHub
    [1, 2], // GitHub -> Semgrep
    [1, 3], // GitHub -> AST
    [2, 4], // Semgrep -> LLM
    [3, 4], // AST -> LLM
    [0, 5], // OAuth -> DB Guard
    [4, 6], // LLM -> Webhook
    [3, 5], // AST -> DB Guard
    [2, 6], // Semgrep -> Webhook
  ];

  // Calculated node positions store
  const computedNodesRef = useRef([]);

  const handlePointer = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const hitThreshold = 35; // Generous tap/hover target for mobile & desktop
    let foundIndex = null;

    computedNodesRef.current.forEach((n, idx) => {
      const dist = Math.hypot(n.x - x, n.y - y);
      if (dist < hitThreshold) {
        foundIndex = idx;
      }
    });

    setHoveredNode(foundIndex);
    if (foundIndex !== null && onSelectNode) {
      onSelectNode(baseNodes[foundIndex]);
    }
  }, [onSelectNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const packets = links.map(([start, end], idx) => ({
      start,
      end,
      progress: (idx * 0.12) % 1,
      speed: 0.0035 + (idx % 3) * 0.0015,
    }));

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 560;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadius = Math.min(width, height) * 0.52;

      // Subtle Sweep Radar
      radarAngle += 0.009;
      const radarGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
      radarGrad.addColorStop(0, "rgba(16, 185, 129, 0.035)");
      radarGrad.addColorStop(0.7, "rgba(6, 182, 212, 0.015)");
      radarGrad.addColorStop(1, "transparent");

      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Concentric Radar Rings
      [0.32, 0.65, 0.95].forEach((factor) => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Compute Responsive Nodes
      const currentNodes = baseNodes.map((n, i) => {
        const coords = isMobile ? n.mobile : n.desktop;
        const floatX = Math.sin(radarAngle * 1.2 + i) * (isMobile ? 1.5 : 3);
        const floatY = Math.cos(radarAngle * 1.5 + i * 1.2) * (isMobile ? 1.5 : 3);
        return {
          ...n,
          x: coords.relX * width + floatX,
          y: coords.relY * height + floatY,
        };
      });
      computedNodesRef.current = currentNodes;

      // Draw Connection Vectors
      links.forEach(([sIdx, eIdx]) => {
        const s = currentNodes[sIdx];
        const e = currentNodes[eIdx];
        const isLinkedToActive = hoveredNode === sIdx || hoveredNode === eIdx;

        ctx.strokeStyle = isLinkedToActive 
          ? "rgba(16, 185, 129, 0.45)" 
          : "rgba(16, 185, 129, 0.12)";
        ctx.lineWidth = isLinkedToActive ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
      });

      // Draw High-Speed Data Packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const s = currentNodes[p.start];
        const e = currentNodes[p.end];
        const px = s.x + (e.x - s.x) * p.progress;
        const py = s.y + (e.y - s.y) * p.progress;

        ctx.fillStyle = "#34D399";
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = isMobile ? 4 : 8;
        ctx.beginPath();
        ctx.arc(px, py, isMobile ? 1.8 : 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Interactive Nodes
      currentNodes.forEach((node, i) => {
        const isHovered = hoveredNode === i || selectedNodeId === node.id;
        const radius = isMobile ? (isHovered ? 8 : 5.5) : (isHovered ? 10 : 7);

        // Outer Pulsing Glow
        if (isHovered) {
          ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Main Node Ring
        ctx.strokeStyle = isHovered ? "#34D399" : "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Core Center
        ctx.fillStyle = isHovered ? "#34D399" : "#0A131C";
        ctx.beginPath();
        ctx.arc(node.x, node.y, isMobile ? 3 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Responsive Text Labels
        const fontSize = isMobile ? "9px" : "11px";
        ctx.font = `600 ${fontSize} ui-monospace, SFMono-Regular, monospace`;
        ctx.fillStyle = isHovered ? "#FFFFFF" : "#94A3B8";
        ctx.textAlign = "center";
        
        const labelText = isMobile ? node.shortLabel : node.label;
        const labelOffsetY = isMobile ? (isHovered ? 17 : 14) : (isHovered ? 22 : 18);
        ctx.fillText(labelText, node.x, node.y + labelOffsetY);

        // Status Badge (hidden on tiny screens if not hovered)
        if (!isMobile || isHovered) {
          ctx.font = "500 8px ui-monospace, SFMono-Regular, monospace";
          ctx.fillStyle = isHovered ? "#34D399" : "rgba(16, 185, 129, 0.8)";
          ctx.fillText(`[${node.status}]`, node.x, node.y + labelOffsetY + (isMobile ? 10 : 12));
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode, selectedNodeId]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] touch-none select-none"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => handlePointer(e.clientX, e.clientY)}
        onMouseLeave={() => setHoveredNode(null)}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }}
        className="w-full h-full block rounded-2xl cursor-pointer"
      />

      {/* Floating HUD Badges */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#060C14]/85 border border-white/[0.08] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono text-slate-200 tracking-wider font-semibold">
          TOPOLOGY // LIVE_ENCLAVE
        </span>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-emerald-500/20 backdrop-blur-md">
        TAP_NODE_TO_INSPECT
      </div>

      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 border-t border-white/[0.06] pt-2 pointer-events-none">
        <span>NODES: 7 OPERATIONAL</span>
        <span className="text-emerald-400/90 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          ACTIVE DEFENSE-IN-DEPTH
        </span>
      </div>
    </div>
  );
}
