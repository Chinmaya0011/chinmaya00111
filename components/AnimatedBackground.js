"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Track mouse / pointer coordinates smoothly
    const handlePointerMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    // Particle nodes definition
    let particles = [];
    const initParticles = () => {
      const isMobile = width < 768;
      const count = isMobile ? 24 : 54;
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
          radius: Math.random() * 1.5 + 0.7,
          baseAlpha: Math.random() * 0.3 + 0.15,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          // Color variance: AppSec blue (#3B5BFF), Cyan (#06B6D4), soft Violet (#8B5CF6), Emerald (#10B981)
          color: i % 4 === 0 ? "59, 91, 255" : i % 4 === 1 ? "6, 182, 212" : i % 4 === 2 ? "139, 92, 246" : "16, 185, 129"
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Packets traveling along links
    const packets = [
      { from: 0, to: 1, progress: 0, speed: 0.007 },
      { from: 2, to: 3, progress: 0.35, speed: 0.005 },
      { from: 4, to: 5, progress: 0.7, speed: 0.006 },
    ];

    let tick = 0;

    const render = () => {
      if (!isVisible || motionQuery.matches) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // 1. Subtle interactive mouse spotlight if cursor is active
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        spotlight.addColorStop(0, "rgba(59, 91, 255, 0.06)");
        spotlight.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        spotlight.addColorStop(1, "rgba(250, 249, 246, 0)");
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw constellation nodes & links
      const maxDistance = width < 768 ? 100 : 140;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce gently at screen boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse proximity reaction (gentle magnetic evasion)
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            p1.x += (dx / dist) * force * 1.5;
            p1.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw connecting edges
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const edgeAlpha = (1 - dist / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(59, 91, 255, ${edgeAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Node glow
        const currentAlpha = p1.baseAlpha + Math.sin(tick * p1.pulseSpeed + p1.pulseOffset) * 0.12;
        ctx.fillStyle = `rgba(${p1.color}, ${Math.max(0.05, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw security data packets along links
      for (let k = 0; k < packets.length; k++) {
        const pkt = packets[k];
        if (pkt.from < particles.length && pkt.to < particles.length) {
          const pA = particles[pkt.from];
          const pB = particles[pkt.to];
          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            pkt.progress = 0;
            pkt.from = Math.floor(Math.random() * particles.length);
            pkt.to = (pkt.from + 1 + Math.floor(Math.random() * 4)) % particles.length;
          }
          const px = pA.x + (pB.x - pA.x) * pkt.progress;
          const py = pA.y + (pB.y - pA.y) * pkt.progress;

          ctx.fillStyle = "rgba(6, 182, 212, 0.75)";
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause when page is hidden to preserve battery and CPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Fluid Floating Aurora Mesh Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-Right Cobalt Aurora */}
        <div
          className={`absolute -top-32 right-[-10%] sm:right-[-5%] w-[520px] sm:w-[720px] h-[520px] sm:h-[720px] rounded-full bg-gradient-to-br from-[#3B5BFF]/14 via-[#60A5FA]/10 to-transparent blur-[120px] sm:blur-[140px] transform-gpu ${
            reducedMotion ? "" : "animate-aurora-slow"
          }`}
        />

        {/* Middle-Left Cyan / Teal Aurora */}
        <div
          className={`absolute top-[35%] left-[-15%] sm:left-[-8%] w-[420px] sm:w-[640px] h-[420px] sm:h-[640px] rounded-full bg-gradient-to-tr from-[#06B6D4]/10 via-[#3B5BFF]/8 to-transparent blur-[130px] sm:blur-[150px] transform-gpu ${
            reducedMotion ? "" : "animate-aurora-reverse"
          }`}
        />

        {/* Bottom-Right Violet / Purple Aurora */}
        <div
          className={`absolute bottom-[10%] right-[-10%] w-[460px] sm:w-[680px] h-[460px] sm:h-[680px] rounded-full bg-gradient-to-tl from-[#8B5CF6]/10 via-[#3B5BFF]/7 to-transparent blur-[130px] sm:blur-[150px] transform-gpu ${
            reducedMotion ? "" : "animate-aurora-slow"
          }`}
        />

        {/* Center Emerald Security Glow */}
        <div
          className={`absolute top-[68%] left-[25%] sm:left-[35%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-r from-[#10B981]/7 via-[#06B6D4]/6 to-transparent blur-[120px] transform-gpu ${
            reducedMotion ? "" : "animate-pulse-slow"
          }`}
        />
      </div>

      {/* 2. Architectural Tech Dot-Matrix & Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(#C4C2B8 1px, transparent 1px),
            linear-gradient(to right, rgba(231, 229, 224, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(231, 229, 224, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px, 144px 144px, 144px 144px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 50%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 50%, transparent 95%)",
        }}
      />

      {/* 3. Interactive Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
