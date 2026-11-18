"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  FileText,
  Lock,
  Layers,
  Server,
  Code2,
  Terminal,
  Cpu,
  Check
} from "lucide-react";
import { fadeInUp, defaultViewport, cardHoverProps, buttonMotionProps } from "@/lib/motion";

export default function ServicesOverview({ onSelectService }) {
  const handleCtaClick = (serviceName) => {
    if (onSelectService) {
      onSelectService(serviceName);
    }
    const target = document.getElementById("inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services-overview" className="py-20 md:py-28 relative border-t border-[#E7E5E0] scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>PRIMARY SERVICE OFFERINGS // 03 CORE DISCIPLINES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4 font-sans">
            Engineered for Reliability. Hardened for Security.
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            Whether you need a full-stack product built from scratch, a mobile application for your customers, or an in-depth security assessment to identify vulnerabilities before adversaries do, each service is delivered with direct technical ownership.
          </p>
        </motion.div>

        {/* Service Cards Stack */}
        <div className="space-y-12 sm:space-y-16">

          {/* ========================================================================= */}
          {/* SERVICE 01: Full-Stack Web Application Development */}
          {/* ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#3B5BFF]/50 shadow-xs transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Heading, Overview, Stack, CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>SERVICE 01 // WEB APPLICATION DEVELOPMENT</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
                    Web Applications Built for Real Business Needs
                  </h3>

                  <p className="text-sm sm:text-base text-[#666666] font-sans leading-relaxed mb-6">
                    I develop modern, responsive and scalable web applications, dashboards, customer portals and SaaS platforms with reliable backend architecture.
                  </p>

                  {/* Technology Stack Pills */}
                  <div className="mb-8">
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider font-bold block mb-2.5">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "React.js",
                        "Next.js",
                        "Node.js",
                        "Express.js",
                        "TypeScript",
                        "MongoDB",
                        "PostgreSQL",
                        "REST APIs",
                        "Docker"
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-xs font-mono text-[#171717]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <motion.button
                    {...buttonMotionProps}
                    onClick={() => handleCtaClick("Web Application Development")}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3B5BFF] hover:bg-[#2A4CE8] text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Discuss a Web Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: What I Offer (12 Deliverables Grid) */}
              <div className="lg:col-span-7 bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E7E5E0]">
                <span className="text-xs font-mono text-[#171717] uppercase tracking-wider font-bold block mb-4">
                  What I Deliver
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Custom business web applications.",
                    "SaaS application development.",
                    "Admin dashboards and management panels.",
                    "Customer portals.",
                    "REST API development and integration.",
                    "Authentication and role-based access control.",
                    "Database architecture and optimization.",
                    "Payment gateway integrations.",
                    "Third-party API integrations.",
                    "AI-powered application features.",
                    "Deployment and production configuration.",
                    "Performance optimization."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#3B5BFF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* SERVICE 02: Android Application Development */}
          {/* ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#06B6D4]/50 shadow-xs transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#06B6D4] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span>SERVICE 02 // ANDROID APPLICATION DEVELOPMENT</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight font-sans mb-4">
                    Mobile Applications That Solve Real Problems
                  </h3>

                  <p className="text-sm sm:text-base text-[#666666] font-sans leading-relaxed mb-6">
                    I help businesses transform their ideas into practical mobile applications with modern interfaces, reliable backend integrations and secure API communication.
                  </p>

                  {/* Technology Stack */}
                  <div className="mb-8">
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider font-bold block mb-2.5">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "React Native",
                        "Expo",
                        "Android SDK",
                        "Node.js",
                        "REST APIs",
                        "AsyncStorage / Encrypted Storage",
                        "Push Notifications"
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-xs font-mono text-[#171717]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <motion.button
                    {...buttonMotionProps}
                    onClick={() => handleCtaClick("Android Application Development")}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891B2] text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Discuss a Mobile App</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: 10 Offerings */}
              <div className="lg:col-span-7 bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E7E5E0]">
                <span className="text-xs font-mono text-[#171717] uppercase tracking-wider font-bold block mb-4">
                  What I Deliver
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Custom Android application development.",
                    "Business and service applications.",
                    "Appointment and booking applications.",
                    "Authentication and user management.",
                    "REST API integrations.",
                    "Backend and database development.",
                    "Push notification integration.",
                    "Payment integrations.",
                    "Mobile application security considerations.",
                    "Testing and deployment assistance."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* SERVICE 03: Application Security & Authorized Penetration Testing */}
          {/* ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            {...cardHoverProps}
            className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#E7E5E0] hover:border-[#8B5CF6]/50 shadow-xs transition-all"
          >
            {/* Header Block */}
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2.5 text-[#8B5CF6] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>SERVICE 03 // APPLICATION SECURITY &amp; PENETRATION TESTING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight font-sans mb-3">
                Find Vulnerabilities Before Attackers Do
              </h3>

              <p className="text-sm sm:text-base text-[#666666] font-sans leading-relaxed">
                I help businesses identify security weaknesses in their web applications and APIs through authorized security assessments, systematic penetration testing, and practical remediation guidance.
              </p>
            </div>

            {/* 3 Core Testing Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Pillar 1: Web AppSec */}
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase tracking-wider mb-3 pb-2 border-b border-[#E7E5E0]">
                    <Globe className="w-4 h-4 text-[#3B5BFF]" />
                    <span>Web Application Security</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#555555] font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>OWASP Top 10 vulnerability assessment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>Authentication &amp; session security testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>Authorization &amp; access-control testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>SQL injection and XSS assessment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>CSRF &amp; security misconfiguration checks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3B5BFF] font-bold">•</span>
                      <span>File upload security assessment.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pillar 2: API Security Testing */}
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase tracking-wider mb-3 pb-2 border-b border-[#E7E5E0]">
                    <Server className="w-4 h-4 text-[#06B6D4]" />
                    <span>API Security Testing</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#555555] font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Broken Object Level Authorization (BOLA/IDOR).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Broken authentication flows.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Excessive data exposure in JSON payloads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Rate limiting &amp; abuse resistance testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Input validation &amp; injection testing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#06B6D4] font-bold">•</span>
                      <span>Business logic vulnerability assessment.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pillar 3: Secure Code Review */}
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase tracking-wider mb-3 pb-2 border-b border-[#E7E5E0]">
                    <Code2 className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Secure Code Review</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#555555] font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Source code security review.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Authentication &amp; authorization review.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Dependency &amp; configuration review.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Deterministic SAST rules with Semgrep.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Practical remediation code snippets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">•</span>
                      <span>Secure coding policy recommendations.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Tools, Deliverables & Authorization Notice */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 pt-6 border-t border-[#E7E5E0]">
              
              {/* Tools & Deliverables */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider font-bold block mb-2">
                    Security Tools &amp; Methods
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Burp Suite Professional",
                      "OWASP ZAP",
                      "Nmap",
                      "Semgrep SAST",
                      "Postman API Testing",
                      "Manual Security Testing"
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-xs font-mono text-[#171717]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider font-bold block mb-2">
                    Deliverables Included in Assessment
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#444444]">
                    {[
                      "Executive security summary for stakeholders.",
                      "Technical vulnerability report with CVSS severity.",
                      "Step-by-step reproduction proof-of-concept.",
                      "Business impact analysis for each finding.",
                      "Concrete remediation code & architecture recommendations.",
                      "Complimentary retesting of fixes where agreed."
                    ].map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Authorization & Ethics Notice Box */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>MANDATORY AUTHORIZATION NOTICE</span>
                  </div>
                  <p className="text-xs text-amber-950/90 font-sans leading-relaxed">
                    All penetration testing and security assessments must be conducted strictly with <strong>explicit written authorization</strong> from the application or system owner. Scope boundaries and testing rules of engagement are formally defined before testing commences.
                  </p>
                  <p className="text-[11px] text-amber-900/80 font-sans mt-2 italic">
                    I do not engage in unauthorized hacking, unrestricted probing, or make guaranteed "100% vulnerability-free" claims.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/20 text-[10px] font-mono text-amber-900 font-semibold">
                  <span>ENGAGEMENT STANDARD // OWASP &amp; PTES ALIGNED</span>
                </div>
              </div>

            </div>

            {/* Card CTA */}
            <div>
              <motion.button
                {...buttonMotionProps}
                onClick={() => handleCtaClick("Application Security Assessment")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Request Security Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
