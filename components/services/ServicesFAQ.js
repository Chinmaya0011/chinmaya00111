"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { fadeInUp, defaultViewport } from "@/lib/motion";

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What types of web applications do you develop?",
      a: "I develop modern, scalable web applications, business dashboards, customer portals, multi-tenant SaaS platforms, and internal management tools. My stack focuses on Next.js 15, React 19, Node.js, Express, TypeScript, MongoDB, and PostgreSQL with robust REST API architecture."
    },
    {
      q: "Do you work with startups and small businesses?",
      a: "Yes. I frequently partner with early-stage founders and small businesses who need either an MVP built from the ground up, existing systems modernized, or security audits conducted prior to fundraising, enterprise client onboarding, or launch."
    },
    {
      q: "Can you integrate payment gateways and AI APIs?",
      a: "Yes. I have implemented payment integrations (Stripe, Razorpay, Cashfree) with secure, idempotent webhook verification and order reconciliation. I also integrate AI capabilities (OpenAI API, Claude API, custom RAG vector search) with strict prompt hardening and context isolation to prevent injection attacks."
    },
    {
      q: "Do you provide Android application development?",
      a: "Yes. I build cross-platform Android mobile applications using React Native and Expo, paired with secure Node.js backend APIs. This includes user authentication, real-time push notifications, offline local caching, and secure token storage."
    },
    {
      q: "What is included in an application security assessment?",
      a: "An assessment evaluates vulnerabilities across your web frontends, backend APIs, and authentication flows against the OWASP Top 10 and API Top 10 (such as BOLA/IDOR, broken authorization, SQLi, and excessive data exposure). All assessments are executed strictly within an authorized scope and rules of engagement agreed in writing beforehand."
    },
    {
      q: "Do you provide a written penetration testing report?",
      a: "Yes. Every security engagement concludes with a comprehensive technical vulnerability report. It includes an executive summary for leadership, detailed reproduction steps with proof-of-concept evidence, CVSS severity classification, business impact assessment, practical code/config remediation guidance, and complimentary retesting after fixes are deployed."
    },
    {
      q: "Can you work with an existing application or codebase?",
      a: "Yes. I regularly conduct architectural audits, code reviews, and feature extensions on existing codebases. I begin by reviewing your repository structure, dependencies, data flow, and test coverage to ensure new enhancements integrate seamlessly without regressions."
    },
    {
      q: "Do you provide ongoing maintenance?",
      a: "Yes. Beyond project delivery, I offer ongoing maintenance retainers covering security dependency audits, bug fixes, server/container health monitoring, and iterative feature development on a flexible monthly arrangement."
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative border-t border-[#E7E5E0] scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-[#3B5BFF] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3B5BFF]" />
            <span>FREQUENTLY ASKED QUESTIONS // FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-4 font-sans">
            Questions &amp; Transparent Answers
          </h2>

          <p className="text-[#666666] text-base sm:text-lg leading-relaxed font-sans">
            Clear, honest answers about project scopes, technical capabilities, engagement models, and security testing authorizations.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={fadeInUp}
                transition={{ delay: idx * 0.04 }}
                className="rounded-2xl bg-white border border-[#E7E5E0] overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-[#FAF9F6] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-base sm:text-lg text-[#171717] tracking-tight">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-center shrink-0 text-[#666666] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#3B5BFF] border-[#3B5BFF]/30" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#666666] font-sans leading-relaxed border-t border-[#F3F2EE] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
