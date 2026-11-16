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
      const count = isMobile ? 32 : 65;
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          radius: Math.random() * 1.6 + 0.8,
          baseAlpha: Math.random() * 0.35 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          // Color variance: AppSec blue (#3B5BFF), Cyan (#06B6D4), soft Violet (#8B5CF6)
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
    window.addEventListener("resize", resize);

    // Occasional data packet pulses traveling along links
    const packets = [
      { from: 0, to: 1, progress: 0, speed: 0.008 },
      { from: 2, to: 3, progress: 0.4, speed: 0.006 },
      { from: 4, to: 5, progress: 0.8, speed: 0.007 },
    ];

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // 1. Draw subtle interactive mouse spotlight if cursor is active
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          width < 768 ? 180 : 320
        );
        spotlight.addColorStop(0, "rgba(59, 91, 255, 0.08)");
        spotlight.addColorStop(0.5, "rgba(96, 165, 250, 0.035)");
        spotlight.addColorStop(1, "rgba(250, 249, 246, 0)");

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, width < 768 ? 180 : 320, 0, Math.PI * 2);
        ctx.fill();
      }

      const connectionDist = width < 768 ? 95 : 130;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseRadius = width < 768 ? 110 : 160;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // 2. Update and draw connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!motionQuery.matches) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Bounce smoothly on screen bounds
          if (p1.x < 0) { p1.x = 0; p1.vx *= -1; }
          else if (p1.x > width) { p1.x = width; p1.vx *= -1; }
          if (p1.y < 0) { p1.y = 0; p1.vy *= -1; }
          else if (p1.y > height) { p1.y = height; p1.vy *= -1; }
        }

        // Connect with other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / connectionDist) * 0.18;
            ctx.strokeStyle = `rgba(59, 91, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interactive mouse connection line
        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;

          if (mdistSq < mouseRadiusSq) {
            const mdist = Math.sqrt(mdistSq);
            const mAlpha = (1 - mdist / mouseRadius) * 0.28;
            ctx.strokeStyle = `rgba(59, 91, 255, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Subtle mouse repulsion/attraction physics
            if (!motionQuery.matches) {
              const force = (1 - mdist / mouseRadius) * 0.25;
              p1.x += (mdx / mdist) * force;
              p1.y += (mdy / mdist) * force;
            }
          }
        }

        // Draw particle node
        const pulse = Math.sin(tick * p1.pulseSpeed + p1.pulseOffset) * 0.2 + 0.8;
        const currentAlpha = p1.baseAlpha * pulse;

        // Subtle glow halo
        ctx.fillStyle = `rgba(${p1.color}, ${currentAlpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core bright node
        ctx.fillStyle = `rgba(${p1.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
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
