"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  CheckCircle2, 
  ArrowUpRight,
  MapPin,
  Clock
} from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { fadeInUp, defaultViewport, buttonMotionProps } from "@/lib/motion";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ 
    name: "", 
    email: "", 
    topic: "Full-Time Engineering Role", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating verified submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-2 text-[#365CF5] font-mono text-xs font-bold uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#365CF5]" />
            <span>CONTACT // 09 // GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight mb-3 font-sans">
            Let&apos;s build something secure.
          </h2>

          <p className="text-[#666666] text-sm sm:text-base leading-relaxed font-sans">
            Open to full-time full-stack engineering and application security roles, and high-impact technical collaborations. I typically respond within 24 hours.
          </p>
        </motion.div>

        {/* Split Layout: Info Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 transition-colors shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#365CF5]/10 border border-[#365CF5]/20 flex items-center justify-center text-[#365CF5] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#666666] uppercase block font-semibold tracking-wider">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={personalInfo.links.email}
                    className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#365CF5] font-mono transition-colors truncate block focus:outline-none focus:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <motion.button
                {...buttonMotionProps}
                onClick={handleCopyEmail}
                className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] text-[#666666] hover:text-[#365CF5] hover:border-[#365CF5]/40 transition-colors text-xs font-mono shrink-0 shadow-xs"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 transition-colors flex items-center justify-between group shadow-xs"
                aria-label="Open GitHub Profile in new tab"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-[#365CF5]" />
                  <span className="text-xs font-mono font-semibold text-[#171717] group-hover:text-[#365CF5] transition-colors">
                    GitHub
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#365CF5] transition-colors" />
              </motion.a>

              <motion.a
                {...buttonMotionProps}
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#365CF5]/50 transition-colors flex items-center justify-between group shadow-xs"
                aria-label="Open LinkedIn Profile in new tab"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#365CF5]" />
                  <span className="text-xs font-mono font-semibold text-[#171717] group-hover:text-[#365CF5] transition-colors">
                    LinkedIn
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#365CF5] transition-colors" />
              </motion.a>
            </div>

            {/* Location & Response Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E7E5E0] shadow-xs space-y-2 text-xs font-sans text-[#666666]">
              <div className="flex items-center gap-2 text-[#171717] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#365CF5]" />
                <span>Odisha, India · Available Worldwide (Remote)</span>
              </div>
              <div className="flex items-center gap-2 text-[#666666]">
                <Clock className="w-3.5 h-3.5 text-[#365CF5]" />
                <span>Fast response · Open for Full-Time Roles &amp; High-Impact Work</span>
              </div>
            </div>

            {/* Direct Mailto Fallback */}
            <div className="pt-1">
              <a 
                href={`mailto:${personalInfo.email}?subject=Technical%20Inquiry%20via%20Portfolio`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#365CF5] hover:underline"
              >
                <span>Prefer default email client? Open mailto link →</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-white border border-[#E7E5E0] p-6 sm:p-8 shadow-xs">
              
              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#171717] font-sans">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs text-[#666666] max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you for reaching out, Chinmaya will review your inquiry and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: "", email: "", topic: "Full-Time Engineering Role", message: "" });
                    }}
                    className="mt-3 text-xs font-mono text-[#365CF5] hover:underline font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-[#666666] uppercase mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#365CF5] focus:outline-none focus:ring-1 focus:ring-[#365CF5] text-xs text-[#171717] placeholder-[#888888] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-[#666666] uppercase mb-1.5 font-semibold">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#365CF5] focus:outline-none focus:ring-1 focus:ring-[#365CF5] text-xs text-[#171717] placeholder-[#888888] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-[11px] font-mono text-[#666666] uppercase mb-1.5 font-semibold">
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#365CF5] focus:outline-none focus:ring-1 focus:ring-[#365CF5] text-xs text-[#171717] transition-colors font-sans"
                    >
                      <option value="Full-Time Engineering Role">Full-Time Engineering / AppSec Role</option>
                      <option value="Application Security Assessment">Application Security / Code Review Assessment</option>
                      <option value="Custom Software Development">Custom Web Application / System Architecture</option>
                      <option value="Other Technical Inquiry">Other Technical Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-mono text-[#666666] uppercase mb-1.5 font-semibold">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share details regarding the role, architecture challenge, or project scope..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] focus:border-[#365CF5] focus:outline-none focus:ring-1 focus:ring-[#365CF5] text-xs text-[#171717] placeholder-[#888888] transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    {...buttonMotionProps}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-[#365CF5] hover:bg-[#2B4CD9] text-white font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Dispatching Message..." : "Send Technical Inquiry"}</span>
                  </motion.button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
